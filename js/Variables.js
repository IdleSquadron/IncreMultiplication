//Player Stats
//Player Stats
//Player Stats
var game = {
  number: 0,
  multipliers: [{ amount: 0, boost: 1 }],
  multiplierPrestiges: 0,
  lastTick: Date.now()
};
/////////////
var multiplierPrestigeRequirements = [
  250,
  1000,
  5e4,
  7.5e6,
  1e10,
  1.25e14,
  1e19,
  2e24,
  1e30,
  Infinity
];
var incrementLoop = 0;
var multipliersMultipliers = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var multiplierCosts = [10, 100, 1e4, 1e6, 1e9, 1e12, 1e16, 1e20, 1e25, 1e30];
var mProductionMult = 0.01;
