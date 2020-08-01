function notate(value) {
  if (value >= 1e3) {
    return (
      Math.round((value / 10 ** Math.floor(Math.log10(value))) * 1e3) / 1e3 +
      "e" +
      Math.floor(Math.log10(value))
    );
  } else {
    return Math.floor(value * 1e3) / 1e3;
  }
}