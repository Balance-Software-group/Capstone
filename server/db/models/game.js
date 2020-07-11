const Sequelize = require('sequelize')
const db = require('../db')
const WordPrompt = require('./wordPrompt')

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

//helper function to shuffle Prompts + return 16 (num of rounds in a game)
function createGamePrompts(allPrompts) {
  let randomizedPrompts = allPrompts.sort(() => Math.random() - 0.5)
  let gamePrompts = randomizedPrompts.slice(0, 16)
  return gamePrompts
}

Game.createPrompts = async function(allPrompts) {
  let gamePrompts = createGamePrompts(allPrompts)
  const addedPrompts = await this.addWordPrompts(gamePrompts)
  return addedPrompts
}

module.exports = Game
