const router = require('express').Router()
const {User, Game} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const username = req.body.username
    const gameCode = req.body.gameCode

    const user = await User.create({username})

    const game = await Game.findOrCreate({
      where: {
        gameCode: gameCode
      }
    })

    const thisgame = await game[0].addUser(user)

    res.json(thisgame)
  } catch (err) {
    next(err)
  }
})
