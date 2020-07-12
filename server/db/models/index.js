const User = require('./user')
const Game = require('./game')
const Player = require('./player')
const WordPrompt = require('./wordPrompt')

User.belongsToMany(Game, {through: Player})
Game.belongsToMany(User, {through: Player})

Game.belongsToMany(WordPrompt, {through: 'gamePrompt'})
WordPrompt.belongsToMany(Game, {through: 'gamePrompt'})

Game.createGamePrompts = async function() {
  const prompts = await WordPrompt.findAll()
  const shuffledPrompts = prompts.sort(() => Math.random() - 0.5)
  let thisGamePrompts = shuffledPrompts.slice(0, 16)

  return thisGamePrompts
}

module.exports = {
  User,
  Game,
  Player,
  WordPrompt
}
