function get(id) {
  return document.getElementById(id);
}
function getClass(c) {
  return document.getElementsByClassName(c);
}
function qSelector(s, all = true) {
  if (all) return document.querySelectorAll(s);
  else return document.querySelector(s);
}

function multiplyTogether() {//This function multiplies all of its passed arguments together.
  let n = 1;
  for (let x = 0; x < arguments.length; x++) {//Processes all of the arguments.
    if (isArray(arguments[x])) {
      n *= multiplyArrayTogether(arguments[x]);//For arrays.
    } else {
      n *= arguments[x];//Multiplies one-by-one.
    }
  }
  return n;//Finalises.
}
function multiplyArrayTogether(arr) {//This function behaves much like multiplyTogether(), except that only 1 argument can be passed, and it can only be an array. Also, it isn't recommended to directly call this function as multiplyTogether() already checks for arrays in its arguments to call this function.
  let n = 1;
  let st = performance.now();
  for (let x = 0; x < arr.length; x++)//Loops through the properties of the array.
    n *= arr[x];
  let en = performance.now();
  console.log(en-st);
  return n;
}

function multiplyObjArrayTogether(arr, location) {//Same as multiplyArrayTogether(arr), but it can take an object property inside each property of the array.
  var n = 1;
  for (let x = 0; x < arr.length; x++) {
    n *= arr[x][location];
  }
  return n;
}

const getLocalSaveStr = () => localStorage.getItem('IncreMultiplicationSave');
//Find if a variable is a typeof value.
const isString = n => typeof n === 'string';
const isNumber = n => typeof n === 'number' && isFinite(n) && !isNaN(n);
//                                          [elim Infinity and NaN cases]
const isArray = n => Array.isArray(n);
//               [not check 4 obj -> arr]
const isObject = n => n instanceof Object && !isArray(n) && n !== null;
//                                          [arrs=objs][elim null cases]