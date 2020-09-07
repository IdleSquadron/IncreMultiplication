var incrementer = 1;
var debug = false;
var multiplierGrowths = [];
const cllink = get('changelog-link'),
  clnlink = get('changelog-newest-link'),
  url = location.href;
let allElemsNumDisplay = getClass('number');

function loop() {
  //console.time('b');
  let time = Date.now(),
  elapsedTime = Math.max(1, time - game.time.lastTick) * dev.timeMult,
  elapsedSeconds = elapsedTime / 1000;
  game.time.lastTick = time;
  game.time.since.start += elapsedTime,
    game.time.since.multiplierPrestige += elapsedTime,
    game.time.since.product += elapsedTime;
  compute(elapsedSeconds);
  thingLoops(elapsedSeconds);
  render();
  if(dev.autobuyers &&
      game.number.current * 10
      < multiplierPrestigeRequirements[game.multiplierPrestiges]
     ) buyMultiplier();
  if(dev.autobuyers &&
     game.number.current >= multiplierPrestigeRequirements[game.multiplierPrestiges])
    multiplierPrestige();
  //console.timeEnd('b');
}
function thingLoops(s) {
  increment(incrementer * s);
}
function compute(s) {
  let makesure = false;
  game.time.msInterval = Number(get('msIntervalSlider').value);
  game.settings.autoSaveInterval = Number(get('autoSaveIntervalSlider').value);
  let multLength = game.multipliers.length;
  updateMultValues();
  for (let m = 0; m < multLength; m++)
    game.multipliers[m].boost += multiplierGrowths[m] * s;
    if(!game.time.records.product) game.time.records.product = Infinity;
  incrementer = Formula.numberGain();
  multMilestones.rate = 10 * 0.9 ** game.factorUpgsBought.includes('3, 2') * dev.multiplierPrestiges.rate;
  multMilestones.boost = 2 * 1.1 ** game.factorUpgsBought.includes('3, 1') * dev.multiplierPrestiges.boost;
  while(game.multipliers.length <= game.multiplierPrestiges) {
    game.multipliers.push({ amount: 0, boost: 1 });
    if(!makesure) makesure = true;
  }
  if(makesure) updateMultipliers();
}
function render() {//This means it will display the values to the HTML.
  get('number').innerHTML = notateValue(game.number.current);
  get('notation').innerHTML = game.settings.notation;
  //get('abbreviation').innerHTML = game.settings.abbreviations;
  get('msInterval').innerHTML = game.time.msInterval;
  get('autoSaveInterval').innerHTML =
    notateValue(game.settings.autoSaveInterval/times.second).toFixed(1);
  for(let n = 0; n < allElemsNumDisplay.length; n++)
    allElemsNumDisplay[n].innerHTML = notateValue(allElemsNumDisplay[n].dataset.value);
  get('growths').innerHTML = (game.settings.growths?'Multiplicative':'Additive');
  get('number/s').innerHTML = notateGrowth(game.number.current, incrementer);
  get('productButton').style.display = Formula.factoredPointGain() > 0 ? 'block' : 'none';
  get('productButtonContent-true').style.display = game.unlocks.products?'inline':'none';
  get('productButtonContent-false').style.display = !game.unlocks.products?'inline':'none';
  get('multiplierPrestiges').innerHTML = game.multiplierPrestiges;
  get('multiplierPrestigeRequirement').innerHTML = notateValue(
    multiplierPrestigeRequirements[game.multiplierPrestiges]);
  get('multiplierPrestigeBoost').innerHTML = notateValue(Formula.multPrestigeBoost());
  get('factoredPoints').innerHTML = '<b style="font-size:larger">' +
    notateValue(game.factoredPoints) +
    '</b> Factored Point' +
    (game.factoredPoints !== 1 ? 's' : '');
  updateMultStats();
  if (url.includes('glitch.me'))
    cllink.href = '/ChangeLog.html';
  else if (url.includes('github.io'))
    cllink.href = '/' + gameNameURL + '/ChangeLog.html';
  clnlink.href = cllink.href + '#newest';
  CSSFactorUpgs();
  updateStats();
  let allMilestoneRates = getClass('multMilestoneRate');
  for(let c = 0; c < allMilestoneRates.length; c++)
    allMilestoneRates[c].innerHTML = multMilestones.rate;
  get('multMilestoneBoost').innerHTML = multMilestones.boost;
  get('factoredPointGain').innerHTML = notateValue(Formula.factoredPointGain()) +
    ' Factored Point' +
    (Formula.factoredPointGain() !== 1 ? 's' : '');
  updateFP();
  get('factoredPointsBoost').innerHTML = notateValue(Formula.factoredPointsBoost());
  let allProductThings = getClass('onlyIfProduct');
  let x;
  for(x = 0; x < allProductThings.length; x++)
    allProductThings[x].style.display = (game.unlocks.products ? 'block' : 'none');
}
function updateMultipliers() {//Updates all Multiplier content.
  let multListHTML = '';
  for(let multListCount = 0;
    multListCount < game.multipliers.length;multListCount++
  ) {
    let n = multListCount + 1;
    multListHTML +=
      '<div class="inmultList"><button onclick="buyMultiplier(' +
      n +
      ')" class="normalButton ' +
      (multiplierCosts[multListCount] >= game.number.current
        ? "unbuyable"
        : "buyable") +
      '">Buy 1 for<br><b style="font-size:15px"><span id="mult' +
      n +
      'Cost"></span></b>' +
      "</button>" +
      "<p> Multiplier " +
      n +
      "</p>" +
      '<p>Amount: <span id="mult' +
      n +
      'Amount"></span> (x<span id="mult' + n + 'MilestoneBoost"></span>)<p>x<span id="mult' +
      n +
      'Boost"></span> (<span id="mult' +
      n +
      'Growth"></span>/s)</p></div>';
  }
  if(get('multiplierListMain').innerHTML !== multListHTML)
    get('multiplierListMain').innerHTML = multListHTML;
  updateMultStats();
}
function updateMultStats() {//Updates the stats of the Multiplier content.
  for(let m = 0; m < game.multipliers.length; m++) {
    let n = m + 1;
    get('mult' + n + 'Cost').innerHTML = notateValue(multiplierCosts[m]);
    get('mult' + n + 'Amount').innerHTML = game.multipliers[m].amount;
    get('mult' + n + 'MilestoneBoost').innerHTML = notateValue(Formula.multiplierMilestoneBoost(m));
    get('mult' + n + 'Boost').innerHTML = notateValue(game.multipliers[m].boost);
    get('mult' + n + 'Growth').innerHTML = '+' +
      notateGrowth(game.multipliers[m].boost, multiplierGrowths[m]);
  }
}let dontbother='Ea</span><span>s</span>t<span>e</span>r E</span>g';
function updateMultValues() {//Updates game.multipliers and related variables.
  let multLength = game.multipliers.length;
  let mG = [],
    mC = [],
    mTA = 0;
  for(let m = 0; m < multLength; m++) {
    mG.push(Formula.multGrowths(m));
    mC.push(Formula.multCosts(m));
    mTA += game.multipliers[m].amount;
  }
  multiplierGrowths = mG;
  multiplierCosts = mC;
  multipliers.total.amount = mTA;
}

function updateFP() {//Updates Factor Upgrades.
  //Make it store ['1, 3','2, 3'] then do for(thing) get(`FU${var}Current`).innerHTML=notateValue(Formula.FU[var]());
  //OR, do for(x in Formula.FU) then the thing above
  let FUid = ['13', '21', '22', '33', '42'];
  for(let x = 0; x < FUid.length; x++)
  get('FU' + FUid[x] + 'Current').innerHTML = notateValue(Formula.FU[FUid[x]]());
  /*get('FU21Current').innerHTML = notateValue(Formula.FU['21']());
  get('FU22Current').innerHTML = notateValue(Formula.FU['22']());
  get('FU33Current').innerHTML = notateValue(Formula.FU['33']());
  get('FU42Current').innerHTML = notateValue(Formula.FU['42']());*/
}