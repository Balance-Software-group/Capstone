const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {
  roomCode: {
    type: Sequelize.STRING
  }
})

module.exports = Game
