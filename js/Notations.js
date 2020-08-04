function notate(value, notation) {//"notation" parameter coming soon!
  if (value >= 1e6) {
    return (
      (value / 10 ** Math.floor(Math.log10(value))).toFixed(3) +
      "e" +
      Math.floor(Math.log10(value))
    );
  } else {
    let r = Math.max(10 ** (Math.floor(Math.log10(value)) - 2), 1);
    return Math.round(value * (1e3 / r)) / (1e3 / r);
  }
}
