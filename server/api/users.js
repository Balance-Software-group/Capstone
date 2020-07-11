const router = require('express').Router()
const {User, Game, WordPrompt} = require('../db/models')

module.exports = router

//helper function to shuffle wordPrompts, and separate the first 16 (num of rounds per game)
function createGamePrompts(allPrompts) {
  let randomizedPrompts = allPrompts.sort(() => Math.random() - 0.5)
  let gamePrompts = randomizedPrompts.slice(0, 16)
  return gamePrompts
}

//creates a new user, finds or creates a game for the user, assigns prompts to the new game
router.post('/', async (req, res, next) => {
  try {
    const username = req.body.username
    const gameCode = req.body.gameCode
    // creates a new user
    const user = await User.create({username})
    // looks for a game for user to join
    const game = await Game.findOne({
      where: {
        gameCode: gameCode
      }
    })

    //if there is no game, creates a game and assigns it shuffled prompts
    if (!game) {
      const newGame = await Game.create({gameCode})
      newGame.addUser(user)

      const prompts = await WordPrompt.findAll()
      const thisGamesPrompts = createGamePrompts(prompts)
      newGame.addWordPrompts(thisGamesPrompts)
      res.json(newGame)
    } else {
      //adds user to the game if the game is already in existance
      game.addUser(user)
      res.json(game)
    }
  } catch (err) {
    next(err)
  }
})
