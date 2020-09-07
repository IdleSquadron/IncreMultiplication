//let saveName = "MultiplyingIdleGameSave";

getSave = () => JSON.parse(getLocalSaveStr());
function setSave() {
  localStorage.setItem('IncreMultiplicationSave', JSON.stringify(game));
}
function reset() {
  game.number.current = 0, game.number.total = 0, game.number.most = 0;
  game.multipliers = [{ amount: 0, boost: 1 }];
  game.multiplierPrestiges = 0;
  game.time.msInterval = 33;
  game.time.since.start = 0,
    game.time.since.multiplierPrestige = 0,
    game.time.since.product = 0;
  game.time.records.product = Infinity;
  game.factoredPoints = 0;
  game.factorUpgsBought = [];
  game.unlocks.products = false;
  tab(1), tab(3, 1), tab(4, 1);
  leaveResetPrompt();
  updateMultipliers();
}
function convertOldSave(save) {//Object
  if(isNumber(save.number)) {
    let num = save.number;
    save.number = {
      current: num,
      total: num,
      most: num
    };
  }
  if(!save.time)
    save.time = {
      lastTick: Date.now(),
      since: {
        start: 0,
        multiplierPrestige: 0,
        product: 0
      },
      records: {
        product: Infinity
      },
      msInterval: 33
    };
  if(save.lastTick) {
    save.time.lastTick = save.lastTick;
    delete save.lastTick;
  }
  if(!save.unlocks) save.unlocks = { products: false };
  if(!save.settings)
    save.settings = {
      notation: notations[0],
      growths: 0,
      abbreviations: abbreviationSettings[0],
      autoSaveInterval: 1e4
    };
  if(!save.factoredPoints) save.factoredPoints = 0;
  if(!save.factorUpgsBought) save.factorUpgsBought = [];
  return save;
}
function load(saveToLoad) {
  if(saveToLoad && !dev.disableSaves) {
    reset();
    let save = getSave();
    save = convertOldSave(save);
    console.log(save);
    applySave(save);
    updateMultipliers();
  }
}
function applySave(save) {
  for(let x in game) game[x] = save[x];
};
function saveSave() {
  setSave();
  //bannerPopup.add()
}