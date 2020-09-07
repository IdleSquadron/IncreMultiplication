const prompts = {
  import: function() {
    let dont = document.querySelectorAll('#importpopup button');
    get('importpopup').style.visibility = 'visible';
    getAllButtons();
    for (let m = 0; m < dont.length; m++) {
      dont[m].disabled = false;
    }
  },
  reset: function() {
    let dont = document.querySelectorAll('#resetpopup button');
    get('resetpopup').style.visibility = 'visible';
    getAllButtons();
    for (let m = 0; m < dont.length; m++) {
      dont[m].disabled = false;
    }
  }
};
const erro = get('importError');
function ree(count) {
  erro.style.opacity = '' + (100 - count * 2) / 100;
}
function animateError() {
  let counter = 0;
  let ani = setInterval(function() {
    ree(counter);
    counter++;
    if (counter > 50) {
      clearInterval(ani);
    }
  }, 100);
}
function leaveImportPrompt() {
  getAllButtons(false);
  get('importpopup').style.visibility = 'hidden';
  get('import-input').value = '';
}
function leaveResetPrompt() {
  get('resetpopup').style.visibility = 'hidden';
  getAllButtons(false);
}
function getAllButtons(disable = true) {
  let allButtons = document.querySelectorAll('button');
  if(disable)
    for(let n = 0; n < allButtons.length; n++)
      allButtons[n].disabled = true;
  else
    for(let n = 0; n < allButtons.length; n++)
      allButtons[n].disabled = false;
}
function importS(save) {
  let errorx = 0;
  try {
    parseSave(save);
  } catch (err) {
    errorx = 1;
    animateError();
    get('import-input').value = '';
  }
  if(errorx < 1 && save) {
    loadImportedSave(parseSave(save));
    leaveImportPrompt();
  }
}
function loadImportedSave(saveToLoad) {
  reset();
  if(saveToLoad) {
    let savething = JSON.parse(saveToLoad);
    savething = convertOldSave(savething);
    //console.log(savething)
    applySave(savething);
  }
  updateMultipliers();
}
function exportS() {
  let copy = get('exportSaveData');
  get('exportSaveData').value = formSave(getLocalSaveStr());
  copy.select();
  copy.setSelectionRange(0, 9999999);
  document.execCommand('copy');
}
function formSave(save) {
  return btoa(/*changeUniOfStr(*/ btoa(save)); //);
}
function parseSave(save) {
  return atob(atob(save));
} 
/*More secure saves coming soon. vvvvvv
function changeUniOfStr(save, base = 10) {
  let result = '';
  for(let c = 0; c<save.length;c++/*HAHA LOLOL 'C++' REFERENCE*//*) {
    result = result.concat((save.charCodeAt(c)).toString(base)+';');
  }
  return result.slice(0,result.length-1);
}

function parseUniOfStr(save, base) {
  let sav = save.split(';');
  let result = '';
  for(let c = 0; c<sav.length;c++/*ANOTHER ONE*/ /*) {
    result.push(String.fromCharCode(sav[c]));
  }
  return result;
}*/