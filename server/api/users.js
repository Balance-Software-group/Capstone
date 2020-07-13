const router = require('express').Router()
const {User, Game, WordPrompt} = require('../db/models')

module.exports = router

//creates a new user, finds or creates a game for the user, assigns prompts to the new game
router.post('/', async (req, res, next) => {
  try {
    const username = req.body.username
    const gameCode = req.body.gameCode
    // creates a new user
    const user = await User.create({username})
    // looks for a game for user to join
    const game = await Game.findAll({
      where: {
        gameCode: gameCode
      },
      include: [User, WordPrompt]
    })

    //if there is no game, creates a game and assigns it shuffled prompts
    if (!game[0]) {
      const newGame = await Game.create({gameCode})
      newGame.addUser(user)

      const gamePrompts = await Game.createGamePrompts()
      await newGame.addWordPrompts(gamePrompts)

      const eagerLoadedGame = await Game.findByPk(newGame.id, {
        include: [User, WordPrompt]
      })

      res.json(eagerLoadedGame)
    } else {
      //adds user to the game if the game is already in existance
      game[0].addUser(user)

      res.json(game)
    }
  } catch (err) {
    next(err)
  }
})
