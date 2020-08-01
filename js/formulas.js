const Formula = {
  multCosts: m =>
    10 ** (Math.round(m / 2 + 1) * Math.floor(m / 2 + 1)) *
    (Math.log10((m + 1) ** 1.3 * 2) + 1) **
      (1.05 ** (game.multipliers[m].amount ** 1.01) * 5 - 5),
  incrementer: () => multiplyTogether(
      multiplyObjArrayTogether(game.multipliers, "boost"),
      game.multiplierPrestiges + 1
    )
};