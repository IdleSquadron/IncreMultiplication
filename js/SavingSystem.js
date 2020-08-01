//let saveName = "MultiplyingIdleGameSave";
let saveThing = {
  number: 0,
  multipliers: { amount: [0], boost: [1] },
  multiplierPrestiges: 0,
  lastTick: Date.now()
};
const autoSave = setInterval(() => {
  save();
}, 1e3);

function getSave() {
  let c = JSON.parse(localStorage.getItem("MultiplyingIdleGameSave"));
  for (let n in c) {
    saveThing[n] = c[n];
  }
}
function setSave() {
  localStorage.setItem("MultiplyingIdleGameSave", JSON.stringify(game));
}
function reset() {
  game.number = 0;
  game.multipliers = [{ amount: 0, boost: 1 }];
  game.lastTick = Date.now();
}
function load() {
  reset();
  if (localStorage.getItem("MultiplyingIdleGameSave")) {
    getSave();
    game.number = saveThing.number;
    game.multipliers = saveThing.multipliers;
    game.multiplierPrestiges = saveThing.multiplierPrestiges;
    game.lastTick = saveThing.lastTick;
  }
  updateMultipliers();
}
function clipboard(txt) {}
function save() {
  setSave();
}
