const router = require('express').Router()
const {User, Game} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const username = req.body.username
    const gameCode = req.body.gameCode

    // creates a new user
    const user = await User.create({username})
    // finds or creates a game based on the gameCode
    const game = await Game.findOrCreate({
      where: {
        gameCode: gameCode
      }
    })
    // adds the created User to the Game throught the Player table
    const thisgame = await game[0].addUser(user)

    res.json(thisgame)
  } catch (err) {
    next(err)
  }
})
