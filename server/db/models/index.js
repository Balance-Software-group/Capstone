const User = require('./user')
const Game = require('./game')
const Player = require('./player')
const WordPrompts = require('./wordPrompts')
const Room = require('./room')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
User.belongsToMany(Game, {through: Player})
Game.belongsToMany(User, {through: Player})

Game.belongsToMany(WordPrompts, {through: 'gamePrompts'})
WordPrompts.belongsToMany(Game, {through: 'gamePrompts'})

Game.hasOne(Room)
Room.belongsTo(Game)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  User,
  Game,
  Player,
  WordPrompts,
  Room
}
