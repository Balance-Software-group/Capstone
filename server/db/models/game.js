const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {
  rounds: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
      max: 16
    }
  },
  winner: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  gameCode: {
    type: Sequelize.STRING
  }
})

// console.log('GAME prototype',Object.keys(Game))

module.exports = Game
