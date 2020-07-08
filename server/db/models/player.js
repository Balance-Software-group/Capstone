const Sequelize = require('sequelize')
const db = require('../db')

const Player = db.define('player', {
  points: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Player
