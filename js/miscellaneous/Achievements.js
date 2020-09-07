`"leaked hehehehe" ~ IdleSquadron`
let achievementList = [
  ['The first of many', 'Buy your first Multiplier.', ()=> multipliers.total.amount > 0],
  ['Does this work?', 'Perform a Multiplier Prestige.', ()=> game.multiplierPrestiges > 0],
  ['Double REDACTED', 'Have 2 Multipliers.', ()=> game.multipliers.reduce((count, thing) => count + (thing.amount > 0), 0)/*not sure if work but idc rn*/],
  ['Many Multipliers', 'Have a total of 50 Multiplier amounts.', ()=> multipliers.total.amount >= 50]
]
function getAchievement(row, column) {
  let parsedId = Number(`${row}${column}`);
  if(!game.achievements.includes(parsedId)) game.achievements.push(parsedId);
}