const prestigeReset = {
  multiplierPrestige: function() {
    game.number.current = 0;
    let MPs = [];
    for(let x = -1; x < game.multiplierPrestiges; x++)
      MPs.push({ amount: 0,boost: 1 });
    game.multipliers = MPs;
    updateMultipliers();
  }
}
function multiplierPrestige() {
  if (game.number.current >= multiplierPrestigeRequirements[game.multiplierPrestiges]) {
    game.multiplierPrestiges++;
    prestigeReset.multiplierPrestige()
    game.time.since.multiplierPrestige = 0;
  }
}
function product() {
  if (Formula.factoredPointGain()) {
    let timeAtPrestige = Date.now();
    if(debug) console.log(Formula.factoredPointGain());
    game.factoredPoints += Formula.factoredPointGain();
    if(!game.unlocks.products) game.unlocks.products = true;
    game.time.records.product = Math.min(game.time.records.product, timeAtPrestige - game.time.since.product);
    game.time.since.product = 0;
    game.time.since.multiplierPrestige = 0;
    game.number.current = 0;
    game.multiplierPrestiges =
      (game.factorUpgsBought.includes('1, 4') ?
       (game.factorUpgsBought.includes('2, 4') ? 
        (game.factorUpgsBought.includes('3, 4') ?
          (game.factorUpgsBought.includes('4, 4') ?
          8
          : 6)
         : 4)
        : 2)
      : 0);
    game.multipliers = [{ amount: 0, boost: 1 }];
    updateMultipliers();
  }
  if(debug) console.log(Formula.factoredPointGain());
}