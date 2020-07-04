const Sequelize = require('sequelize')
const db = require('../db')

const UserStats = db.define('userStats', {
  totalPoints: {
    type: Sequelize.INTEGER
  },
  totalTime: {
    type: Sequelize.INTEGER
  },
  win: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = UserStats
