function updateStats() {
  let date = Date.now();
  let since = game.time.since;
  let records = game.time.records;
  get('timeSinceStart').innerHTML = notateTime(since.start);
  get('timeSinceMultiplierPrestige').innerHTML = notateTime(since.multiplierPrestige);
  get('timeSinceProduct').innerHTML = notateTime(since.product);
  get('timeRecordProduct').innerHTML = notateTime(records.product);
  get('totalNumber').innerHTML = notateValue(game.number.total);
  get('recordNumber').innerHTML = notateValue(game.number.most);
}