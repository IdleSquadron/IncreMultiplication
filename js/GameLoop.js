var incrementer = 1;
var debug = false;
//TIME-RELATED Variables (haha get it cuz IdleSquadron's PfP is a clock)
var elapsedTime = 0,
  elapsedSeconds = 0,
  time = Date.now(),
  debugTimeMult = 1;
//END of TIME-RELATED Variables
var multiplierGrowths = [];
var cllink = get("changelog-link"),
  url = location.href;
var gameLoop = setInterval(function() {
  loop();
}, 33);
function loop() {
  let time = Date.now();
  elapsedTime = Math.max(1, time - game.lastTick) * debugTimeMult;
  elapsedSeconds = elapsedTime / 1000;
  game.lastTick = time;
  updateVars(elapsedSeconds);
  thingLoops(elapsedSeconds);
  updateHTML();
  /*for (let m = 0; m < game.multipliers.length; m++) {
    while (multiplierCosts[m] < game.number) {
      if (multiplierCosts[m]) buyMultiplier(m + 1);
    }
  }*/
}
function thingLoops(s) {
  increment(incrementer * s);
}
var mG = [],
  mC = [];
function updateVars(s) {
  let multLength = game.multipliers.length;
  mG = [];
  mC = [];
  for (let m = 0; m < multLength; m++) {
    mG.push(game.multipliers[m].amount * mProductionMult);
    mC.push(Formula.multCosts(m));
  }
  multiplierGrowths = mG;
  multiplierCosts = mC;
  for (let m = 0; m < multLength; m++) {
    game.multipliers[m].boost += multiplierGrowths[m] * s;
  }
  incrementer = Formula.incrementer();
}
function updateHTML() {
  get("number").innerHTML = debug ? JSON.stringify(game) : notate(game.number);
  get("number/s").innerHTML = debug
    ? localStorage.getItem("MultiplyingIdleGameSave")
    : notate(incrementer);
  get("multiplierPrestiges").innerHTML = debug
    ? JSON.stringify(saveThing)
    : game.multiplierPrestiges;
  get("multiplierPrestigeRequirement").innerHTML = notate(
    multiplierPrestigeRequirements[game.multiplierPrestiges]
  );
  //updateMultipliers();
  updateMultStats();
  if (url.includes("glitch.me")) {
    cllink.href = "/ChangeLog.html";
  } else if (url.includes("idlesquadron.github.io")) {
    cllink.href = "/multiplying-idle-game/ChangeLog.html";
  }
}
function updateMultipliers() {
  let multListHTML = "";
  for (
    let multListCount = 0;
    multListCount < game.multipliers.length;
    multListCount++
  ) {
    let n = multListCount + 1;
    multListHTML +=
      '<div><button onclick="buyMultiplier(' +
      n +
      ')" class="normalButton ' +
      (multiplierCosts[multListCount] >= game.number
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
      'Amount"></span>' +
      '<p>x<span id="mult' +
      n +
      'Boost"></span> (+<span id="mult' +
      n +
      'Growth"></span>/s)</p></div>';
  }
  if (get("multiplierListMain").innerHTML !== multListHTML)
    get("multiplierListMain").innerHTML = multListHTML;
  updateMultStats();
}
function updateMultStats() {
  for (let m = 0; m < game.multipliers.length; m++) {
    let n = m + 1;
    get("mult" + n + "Cost").innerHTML = notate(multiplierCosts[m]);
    get("mult" + n + "Amount").innerHTML = game.multipliers[m].amount;
    get("mult" + n + "Boost").innerHTML = notate(game.multipliers[m].boost);
    get("mult" + n + "Growth").innerHTML = notate(multiplierGrowths[m]);
  }
}
