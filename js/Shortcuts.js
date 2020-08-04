function get(id) {
  return document.getElementById(id);
}
function getClass(c) {
  return document.getElementsByClassName(c);
}

function exchange(var1, var2) {
  var1 -= var2;
}

function multiplyTogether() {
  let n = 1;
  for (let x = 0; x < arguments.length; x++) {
    if (typeof arguments[x] === "object") {
      n *= multiplyArrayTogether(arguments[x]);
    } else {
      n *= arguments[x];
    }
  }
  return n;
}
function multiplyArrayTogether(arr) {
  var n = 1;

  for (let x = 0; x < arr.length; x++) {
    n *= arr[x];
  }
  return n;
}

function multiplyObjArrayTogether(arr, location) {
  var n = 1;
  for (let x = 0; x < arr.length; x++) {
    n *= arr[x][location];
  }
  return n;
}
