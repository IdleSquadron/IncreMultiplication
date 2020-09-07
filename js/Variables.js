/* Welcome to Variables.js!
This is a file mainly for storing and declaring the main
variables to be used by the other JavaScript files.
*/
const gameName = document.title, //If anyone mods this game, change this string to the mod game name.
      gameNameURL = 'IncreMultiplication';
const notations = ['Scientific', 'Engineering', 'Standard',
                   'Logarithmic', 'Alphabetic', 'Long Alphabetic'],
  abbreviationSettings = ['None', 'Min', 'Some', 'Max'],
  alphabet = 'abcdefghijklmnopqrstuvwxyz',
  times = { second: 1e3, minute: 6e4, hour: 3.6e6, day: 8.64e7 };
const defaultSettings = { notation: notations[0], updateInterval: 33, autoSaveInterval: 1e3 }; //Declared before 'game' because.
let dev = {
  autobuyers: false,
  timeMult: 1,
  disableSaves: false,
  multiplierPrestiges: {
    rate: 1,
    boost: 1
  }
};
/////////////
const multiplierPrestigeRequirements = [
  500,
  2500,
  1.25e6,
  7.5e11,
  1e17,
  3.333e25,
  1e30,
  1e37,
  1e43
];
const multipliers = {
  total: {
    amount: 0
  }
}

let currentTab, subtabOfTab = [null, null, null, null];
var multiplierCosts = [10, 100, 1e4, 1e6, 1e9, 1e12, 1e16, 1e20, 1e25, 1e30];
const mProductionMult = 0.01;
const factorUpgradeCosts = [
  [1, 2, 5, 10],
  [2, 4, 8, 50],
  [1, 7, 35, 200],
  [1, 5, 25, 1e3]
],
  specialFactorUpgCosts = [5];
const multMilestones = { rate: 10, boost: 2 };
//Player Stats
//Player Stats
var game = {
  number: {
    current: 0,
    total: 0,
    most: 0
  },
  multipliers: [],
  multiplierPrestiges: 0,
  time: {//Stores time data.
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
  },
  unlocks: {//Store data on if you have unlocked something or not.
    products: false
  },
  settings: {
    notation: notations[0],
    growths: 0,
    abbreviations: abbreviationSettings[1],
    autoSaveInterval: 5e3
  },
  factoredPoints: 0,
  factorUpgsBought: []
};
