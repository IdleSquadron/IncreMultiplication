function notateValue(value) {
  if (isString(value)) value = Number(value);
  if (isFinite(value)) {
    switch (game.settings.notation) {
      case notations[0]:
        if (value >= 1e6) {
          //This return statement is for scientific notation for numbers above 1,000,000.
          let m = (value / 10 ** Math.floor(Math.log10(value)));//Mantissa
          let e = Math.floor(Math.log10(value));//Exponent
          if(m.toFixed(3) >= 10) m /= 10, e++;
          else if(m.toFixed(3) < 1) m *= 10, e--;
          return m.toFixed(3) + 'e' + e;//Return val
        } else {
          //This is the code that will run for numbers passed that are less than 1,000,000.
          let rounder = Math.max(10 ** (Math.floor(Math.log10(value)) - 2), 1); //Manages rounding.
          return Math.floor(value * (1e3 / rounder)) / (1e3 / rounder); //Finalises and formats the number to return.
        }
        break;
      case notations[1]://Same as Scientific, but exponent is floored to nearest 3, and mantissa is changed to compensate.
        if(value >= 1e6) {
          return (Math.floor(value / 1e3 ** (Math.floor(Math.log10(value) / 3)) * 1e3) / 1e3)
            .toFixed(3) //Mantissa
            + 'e' +
            Math.floor(Math.log10(value) / 3) * 3; //Exponent
        } else {
          //Code that will run for numbers passed that are less than 1e6.
          let rounder = Math.max(10 ** (Math.floor(Math.log10(value)) - 2), 1); //Manages rounding.
          return Math.floor(value * (1e3 / rounder)) / (1e3 / rounder); //Finalises and formats the number to return.
        }
        break;
      case notations[2]:
        if(value >= 1e3) {
          let standard1 = ['','K','M','B','T','Qa','Qt','Sx','Sp','Oc','No'],
            standard2 = ['', 'U', 'D', 'T', 'Qa', 'Qt', 'Sx', 'Sp', 'O', 'N'],
            standard3 = ['','Dc','Vg','Tg','Qd','Qi','Se','St','Og','Nn'],
            standard4 = ['','Ce','Dn','Tc','Qe','Qu','Sc','Si','Oe','Ne'];
          if(value >= 1e33) {
            return (
              Math.round((value / 1e3 ** Math.floor(Math.log10(value) / 3)) * 1e3) /
                1e3 +
              ' ' +
              standard2[Math.floor(Math.log10(value) / 3 - 1) % 10] +
              standard3[Math.floor(Math.log10(value) / 30 - 0.1) % 10] +
              standard4[Math.floor(Math.log10(value) / 300 - 0.01) % 10]
            );
          } else {
            return Math.round((value / 1e3 ** Math.floor(Math.log10(value) / 3)) * 1e3) / 1e3
              + ' ' + standard1[Math.floor(Math.log10(value) / 3)];
          }
        } else {
          return Math.round(value * 1e3) / 1e3;
        }
        break;
      case notations[3]:
        if(value >= 1e3) return 'e' + (Math.floor(Math.log10(value)*1e3)/1e3).toFixed(3);
        else return Math.floor(value * 1e3) / 1e3;
        break;
      case notations[4]:
        return numberCharacters(value, alphabet);
        break;
      case notations[5]:
        return numberCharacters(value, alphabet + alphabet.toUpperCase());
    }
  } else return 'Infinity'; //Fixed display for infinite values. If this didn't exist, infinite values would look weird.
}

function numberCharacters(value, set) {
  const len = set.length;
  let p = [/*1, 27, 703, 18279, 475255*/];
  let n = 0;
  for(let x = 0; x < 10; x++) n = n * set.length + 1, p.push(n);
  let letterResult = '';
  let stop = false;
  let exp = Math.floor(Math.log10(value) / 3);
  let l = 0;
  while(exp >= p[++l]);
  if(l === 1) {
    letterResult = set[exp - 1];
    stop = true;
  }
  exp -= p[l - 1];
  while(l > 0 && !stop)
    letterResult += set[Math.floor(exp / len ** --l) % len];//Letters
    if (value >= 1e3)
    return Math.floor((value / 1e3 ** Math.floor(Math.log10(value) / 3))
    * 1e3) / 1e3 + ' ' + letterResult;
  else return Math.floor(value * 1e3) / 1e3;
}
const notateGrowth = (value, growth, format = true) =>
  game.settings.growths
    ? game.settings.notation === notations[3]
      ? value >= 1e3
        ? notateValue(Math.log10(growth + value) - Math.log10(value))
        : notateValue((growth / value) * 100) + '%'
      : notateValue((growth / value) * 100) + '%'
    : notateValue(growth);

////////////
function notateTime(time) { //The 'time' parameter should be in milliseconds, otherwise side effects can occur.
  let timeComponents = [
    ['second', times.second],
    ['minute', times.minute],
    ['hour', times.hour],
    ['day', times.day]
  ]; //[x][0] is the name, and [x][1] is the amount of milliseconds required for such to display.
  let tClen = timeComponents.length;
  let resStr = '';
  let res = [];
  //This for loop gets the components of the specified time.
  for(
    let x = 0;
    x < tClen && Math.max(1e3, time) >= timeComponents[x][1];
    x++
  ) {
    let round = !(time > timeComponents[1][1]) ? 1e3 : 1; //Rounds the seconds to 3 decimal places ONLY if the time is less than a minute.
    let val = Math.floor(
      notateValue(
        (time %
          (x + 1 >= tClen
            ? Infinity
            : timeComponents[x + 1][1])) /
          timeComponents[x][1]
      ) * round
    ) / round;
    if (val !== 0)
      res.push(val + ' ' + timeComponents[x][0] +
          (val !== 1 ? 's' : '')/* The code to the left manages plurals. */
      );
  }
  //End of for loop. Now, the following code will reverse that list in order for it to make sense, then apply it to the string that will be returned.
  res.reverse();
  //Applies the properties of the array to the main string, and formats it.
  for(let x = 0; x < res.length; x++) {
    resStr += res[x] + (x + 2 >= res.length ?
        x + 1 >= res.length
          ? ''
          : ' and ' //This line manages grammatical formatting.
        : ', ');
  }
  return resStr;
}
