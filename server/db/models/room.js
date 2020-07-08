const Sequelize = require('sequelize')
const db = require('../db')

const Room = db.define('room', {
  roomCode: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
})
//whiteboard?

module.exports = Room
