const User = require('./user')
const Game = require('./game')
const Player = require('./player')
const WordPrompt = require('./wordPrompt')

User.belongsToMany(Game, {through: Player})
Game.belongsToMany(User, {through: Player})

Game.belongsToMany(WordPrompt, {through: 'gamePrompt'})
WordPrompt.belongsToMany(Game, {through: 'gamePrompt'})

module.exports = {
  User,
  Game,
  Player,
  WordPrompt
}
