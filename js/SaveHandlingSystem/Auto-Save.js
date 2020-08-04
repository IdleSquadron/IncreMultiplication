//let saveName = "MultiplyingIdleGameSave";
let save = {
  number: 0,
  multipliers: [{ amount: 0, boost: 1 }],
  multiplierPrestiges: 0,
  lastTick: Date.now()
};
const autoSave = setInterval(() => {
  //saveSave();
}, 1e3);

function getSave() {
  let c = JSON.parse(localStorage.getItem("MultiplyingIdleGameSave"));
  for (let n in c) {
    save[n] = c[n];
  }
}
function setSave() {
  localStorage.setItem("MultiplyingIdleGameSave", JSON.stringify(game));
}
function reset() {
  game.number = 0;
  game.multipliers = [{ amount: 0, boost: 1 }];
  game.multiplierPrestiges=0;
  game.lastTick = Date.now();
  tab(1);
  leaveResetPrompt();
  updateMultipliers();
}
function load(saveToLoad) {
  reset();
  if (saveToLoad) {
    getSave();
    game.number = save.number;
    game.multipliers = save.multipliers;
    game.multiplierPrestiges = save.multiplierPrestiges;
    game.lastTick = save.lastTick;
  }
  updateMultipliers();
}
function clipboard(txt) {}
function saveSave() {
  setSave();
  //get("exportSaveData").value = localStorage.getItem("MultiplyingIdleGameSave");
}
