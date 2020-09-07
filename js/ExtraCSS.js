function CSSFactorUpgs() {
  let allFactorUpgrades = document.querySelectorAll('.factorUpgradeButton');
  let upgID = '';
  let row, col;
  for (let x = 0; x < allFactorUpgrades.length; x++) {
    let y = x+1;
    row = Math.floor(x / 4) + 1;
    col = x % 4 + 1;
    upgID = `${row}, ${col}`;
    if(debug) console.log(x, upgID);
    allFactorUpgrades[x].className = `factorUpgradeButton ${game.factorUpgsBought.includes(upgID) ? 'bought' : 'unbought'} ${(game.factoredPoints >= factorUpgradeCosts[row - 1][col - 1] && !(game.factorUpgsBought.includes(upgID))) ? 'buyable ' : ''}normal`;
  }
  if (game.factorUpgsBought.includes('FactoredPoints')) {
    get('factored-points-factor-upg-false').style.display = 'none';
    get('factored-points-factor-upg-true').style.display = 'inline';
  } else {
    get('factored-points-factor-upg-true').style.display = 'none';
    get('factored-points-factor-upg-false').style.display = 'block';
  }
}
/*bannerPopup = {
  class: {
    info: {
      cName: 'info',
      style: 
      `
      background:lime;height:50px;width:100px;border:3px solid orange; border-radius:5px;text-align: center; font-weight: bold
      `},
  },
}
notify = function(type) {
  let list = get('bannerPopupList');
  list.innerHTML += 
   `<div class="${bannerPopup.class[type].cName}">
      Game Saved.
    </div>`;
}*/