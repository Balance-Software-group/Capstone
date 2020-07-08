const Sequelize = require('sequelize')
const db = require('../db')

const WordPrompts = db.define('wordPrompts', {
  name: {
    type: Sequelize.STRING
  }
})

module.exports = WordPrompts
