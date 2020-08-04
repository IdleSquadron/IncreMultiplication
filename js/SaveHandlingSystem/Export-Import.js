    for (let n = 0; n < allButtons.length; n++) {
      allButtons[n].disabled = true;
    }
  } else {
    for (let n = 0; n < allButtons.length; n++) {
      allButtons[n].disabled = false;
    }
  }
}
function importS(save) {
  let errorx = 0;
  try {
    parseSave(save);
  } catch (err) {
    errorx = 1;
    animateError();
    get("import-input").value = "";
  }
  if (errorx < 1 && save) {
    load(parseSave(save));
    leaveImportPrompt();
  }
}
function exportS() {
  let copy = get("exportSaveData");
  get("exportSaveData").value = formSave(
    localStorage.getItem("MultiplyingIdleGameSave")
  );
  copy.select();
  copy.setSelectionRange(0, 9999999);
  document.execCommand("copy");
}
function formSave(save) {
  return btoa(/*changeUniOfStr(*/ btoa(save)); //);
}
function parseSave(save) {
  return atob(atob(save));
} /*) {
    result = result.concat((save.charCodeAt(c)).toString(base)+";");
  }
  return result.slice(0,result.length-1);
}
function parseUniOfStr(save, base) {
  let sav = save.split(";");
  let result = "";
  for(let c = 0; c<sav.length;c++/*ANOTHER ONE*/ /*) {
    result.push(String.fromCharCode(sav[c]));
  }
  return result;
}*/
/*More secure saves coming soon. vvvvvv
function changeUniOfStr(save, base = 10) {
  let result = "";
  for(let c = 0; c<save.length;c++/*HAHA LOLOL "C++" REFERENCE*/
