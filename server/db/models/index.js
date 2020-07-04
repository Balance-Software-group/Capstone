const User = require('./user')
const UserStats = require('./userStats')
const Game = require('./game')
const Message = require('./message')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasMany(UserStats)
UserStats.belongsTo(User)
User.hasMany(Message)
Message.belongsTo(User)
Game.hasMany(UserStats)
UserStats.belongsTo(Game)
Game.hasMany(Message)
Message.belongsTo(Game)
Game.belongsToMany(User, {through: 'UserGame'})
User.belongsToMany(Game, {through: 'UserGame'})

const UserGame = db.model('UserGame')

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  UserStats,
  Game,
  Message,
  UserGame
}
