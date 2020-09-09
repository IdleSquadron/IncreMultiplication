const Formula = {
  multCosts: m => //'m' should be the Multiplier minus 1 to return its cost.
    10 ** (Math.round(m / 2 + 1) * Math.floor(m / 2 + 1)) *
    (Math.sqrt(m + 2) + 1) **
      ((1.05-game.factorUpgsBought.includes('4, 3')/100) ** (game.multipliers[m].amount ** 
          (1.01+m/1000)) * 5 - 5),

  multGrowths: m => (game.multipliers[m].amount *
    Formula.multiplierMilestoneBoost(m) *
    Formula.factoredPointsBoost() *
    Formula.FU['13']() *
    ((m+1)/10+1) ** game.factorUpgsBought.includes('4, 1') *
    mProductionMult * Formula.FU['21']()),

  multPrestigeBoost: () => (!game.factorUpgsBought.includes('1, 1')
    ? game.multiplierPrestiges + 1
    : (!game.factorUpgsBought.includes('1, 2')
        ? (game.multiplierPrestiges+1) ** 2
        : 2 ** game.multiplierPrestiges)),

  multiplierMilestoneBoost: m => multMilestones.boost ** 
    Math.floor(game.multipliers[m].amount / multMilestones.rate),

  numberGain: () => (multiplyTogether(
      multiplyObjArrayTogether(game.multipliers, 'boost'),
      Formula.multPrestigeBoost(),
      Formula.FU['22'](),
      Formula.FU['33'](),
      Formula.FU['42']()
      )
    ) ** (1.05 ** game.factorUpgsBought.includes('2, 3')),

  factoredPointGain: () => Math.floor(Math.max(0, (Math.max(0,
    Math.sqrt(Math.log10(Math.max(100, game.number.current)) - 1) - 6)) ** 0.1) **
      Math.max(1, Math.log10(game.number.current ** 0.4))),
  
  factoredPointsBoost: () => Math.max(1, (Math.log10(Math.max(1, game.factoredPoints) ** Math.log10(Math.max(1, game.factoredPoints))))
    * game.factorUpgsBought.includes('FactoredPoints') + 1),
  FU: {
    '13': () => (game.multiplierPrestiges + 1) ** game.factorUpgsBought.includes('1, 3'),
    '21': () => (Math.sqrt((game.time.since.start)
      / times.day * dev.timeMult) + 1) **
      game.factorUpgsBought.includes('2, 1'),
    '22': () => (Math.max(1, game.factoredPoints + 1)) ** game.factorUpgsBought.includes('2, 2'),
    '33': () => (10 ** (multMilestones.boost * (10 / multMilestones.rate))) **
    game.factorUpgsBought.includes('3, 3'),
    '42': () => (multipliers.total.amount+1) ** game.factorUpgsBought.includes('4, 2'),
  },
};
