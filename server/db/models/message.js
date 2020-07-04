const Sequelize = require('sequelize')
const db = require('../db')

const Message = db.define('message', {
  content: {
    type: Sequelize.TEXT
  },
  author: {
    type: Sequelize.ENUM('detective', 'imposter', 'bot')
  },
  scriptPosition: {
    type: Sequelize.INTEGER
  }
})

module.exports = Message
