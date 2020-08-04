function multiplierPrestige() {
  if (game.number >= multiplierPrestigeRequirements[game.multiplierPrestiges]) {
    game.number = 0;
    game.multiplierPrestiges += 1;
    let MPs = [];
    for (let x = -1; x < game.multiplierPrestiges; x++) {
      MPs.push({amount:0,boost:1});
    }
    game.multipliers = MPs;//UNFINISHED
    updateMultipliers();
  }
}