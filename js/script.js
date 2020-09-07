'use strict';//Strict mode
/* Welcome to script.js!
This is one of the main JavaScript files, where fundamental functions are located in.
*/
const settings = {
  cycleNotation: function() {
    let currentNotation = notations.indexOf(game.settings.notation);
    game.settings.notation = notations[currentNotation + 1] || notations[0];
  },

  cycleGrowths: function() {
    game.settings.growths >= 1 ? game.settings.growths = 0 : game.settings.growths = 1;
  },

  cycleAbbreviation: function() {
    let currentAbbreviation = abbreviationSettings.indexOf(game.settings.abbreviations);
    game.settings.abbreviations = abbreviationSettings[currentAbbreviation+1] || abbreviationSettings[0];
  }
};

tab(1);
tab(3, 1);
tab(4, 1);
//Inits loading.
if(localStorage.getItem("MultiplyingIdleGameSave")) {
  localStorage.setItem(
    'IncreMultiplicationSave',
    localStorage.getItem("MultiplyingIdleGameSave"));
  load(localStorage.getItem("IncreMultiplicationSave"));
  localStorage.removeItem("MultiplyingIdleGameSave");
} else load(localStorage.getItem("IncreMultiplicationSave"));
updateMultipliers();
(function initEvents() {
  let allTabButtons = document.querySelectorAll('#options-row>button');
  for(let x = 0; x < allTabButtons.length; x++)
    allTabButtons[x].addEventListener('click', () => tab(x+1)); 
})();
//Makes the game show as soon as the document loads.
document.body.style.display = 'block';
//This setInterval initialises execution of the game loop per tick. Code is available in js/GameLoop.js.

(function gameLoop() {
  let sliderMin = Number(get('msIntervalSlider').min);//Prevents the game from breaking if refresh rate is set to the slider's min or less.
  let currentInterval = (game.time.msInterval < sliderMin ? sliderMin : game.time.msInterval);
  setTimeout(gameLoop, currentInterval); //Loop part
  loop(); //Makes game go BRRRR. This function is declared in 'js/GameLoop.js'.
})();//Self-Invoking is used to initialise the loop immediately.
/*Also, a setTimeout() loop is used instead of setInterval() since
the former is lot more flexible with changing intervals.*/
(function autoSave() {//Basically the function above but for auto-saving.
  let sliderMin = Number(get('autoSaveIntervalSlider').min),
    currentInterval = game.settings.autoSaveInterval < sliderMin
    ? sliderMin : game.settings.autoSaveInterval;
  setTimeout(autoSave, currentInterval);//Loop
  saveSave();//Makes savegame go BRRRR. This function is declared in 'js/SaveHandlingSystem/Auto-Save.js'.
})();

function increment(n = 1) {
  game.number.current += n, game.number.total += n;
  if(game.number.current > game.number.most) game.number.most = game.number.current;
}
function tab(t, st) {
  let tabs = document.querySelectorAll("#options-row > button").length;
  let tab_contents = document.getElementsByClassName("tab");
  if(t) {
    if(!st) {
      for (let x = 0; x < tab_contents.length; x++)
        tab_contents[x].style.display = "none";
      tab_contents[t-1].style.display = "inline-block";
      currentTab = t;
    } else {
      let subtabs_of_tab = document.querySelectorAll('#tab' + t + '>.subtab');
      let subtabsOfSelectedTab = [];
      for(let x = 0; x < subtabs_of_tab.length; x++)
        subtabs_of_tab[x].style.display = 'none';
      subtabs_of_tab[st-1].style.display = 'block';
      subtabOfTab[t-1] = st;
    };
  } else
    for (let x = 1; x < tabs.length + 1; x++)
      tabs[x].style.display = "none";
}

function buyMultiplier(n) {//Pass no 'n' argument to max all.
  if(n) {
  if(game.number.current >= multiplierCosts[n - 1]) {
    game.number.current -= multiplierCosts[n - 1];
    game.multipliers[n - 1].amount += 1;
    updateMultipliers();
  }
  } else {
    let counter = 0;
    for(let m = game.multipliers.length; m >= 0; m--) {
      while(game.number.current >= multiplierCosts[m]) {
        game.number.current -= multiplierCosts[m];
        game.multipliers[m].amount++, counter++;
        updateMultValues();
      }
    }
    let end = performance.now();
    updateMultipliers();
  }
}let why/**/='<span>f</span>o<span></span>u<span>n</span>d t</span>h';//
function buyFactoredUpgrade(row, column) {
  let x = row * 4 + column - 4;
  const m = x - 1;
  if(!column) {
    if(row === 'FactoredPoints') {
      if(
        game.factoredPoints >= specialFactorUpgCosts[0] &&
        !game.factorUpgsBought.includes('FactoredPoints')
      ) {
        game.factoredPoints -= specialFactorUpgCosts[0];
        game.factorUpgsBought.push('FactoredPoints');
        CSSFactorUpgs();
      }
    }
  } else {
    if(
      game.factoredPoints >= factorUpgradeCosts[row - 1][column - 1] &&
      !game.factorUpgsBought.includes(row + ', ' + column)
    ) {
      game.factoredPoints -= factorUpgradeCosts[row - 1][column - 1];
      game.factorUpgsBought.push(row + ', ' + column);
    }
  }
  CSSFactorUpgs();
}