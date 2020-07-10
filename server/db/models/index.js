const User = require('./user')
const Game = require('./game')
const Player = require('./player')
const WordPrompts = require('./wordPrompts')

User.belongsToMany(Game, {through: Player})
Game.belongsToMany(User, {through: Player})

Game.belongsToMany(WordPrompts, {through: 'gamePrompts'})
WordPrompts.belongsToMany(Game, {through: 'gamePrompts'})

module.exports = {
  User,
  Game,
  Player,
  WordPrompts
}
