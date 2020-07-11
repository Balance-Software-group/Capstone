const Sequelize = require('sequelize')
const db = require('../db')

const WordPrompt = db.define('wordPrompt', {
  name: {
    type: Sequelize.STRING
  }
})

module.exports = WordPrompt
