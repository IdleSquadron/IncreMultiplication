function multiplierPrestige() {
  if (game.number >= multiplierPrestigeRequirements[game.multiplierPrestiges]) {
    game.number = 0;
    game.multiplierPrestiges += 1;
    game.multipliers = [];
    for (let x = -1; x < game.multiplierPrestiges; x++) {
      game.multipliers.push({amount:0,boost:1});
    } //UNFINISHED
    updateMultipliers();
  }
}