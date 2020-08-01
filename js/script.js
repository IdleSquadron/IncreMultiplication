"use strict";
tab(1);
load();
updateMultipliers();
function increment(n = 1) {
  if (!n) n = 1;
  game.number += n;
  if (debug) console.log(`Incremented "game.number" by ${n}.`);
}
function tab(t) {
  for (let x = 1; x < 5 /*num should be tabs+1*/; x++) {
    get("tab" + x).style.display = "none";
  }
  get("tab" + t).style.display = "block";
}

function buyMultiplier(n) {
  if (game.number >= multiplierCosts[n - 1]) {
    game.number -= multiplierCosts[n - 1];
    game.multipliers[n - 1].amount += 1;
    updateMultipliers();
  } /* else {
    alert("no");
  }*/
}
/* Add achivements.
1) "haha google": Reach 1e100 (notate).
*/
