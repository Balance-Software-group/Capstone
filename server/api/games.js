const router = require('express').Router()
const {User, Game, Player, WordPrompt} = require('../db/models')
// const Player = require('../db/models/player')
module.exports = router

//gets game and displays associated users and wordPrompts on 'users' & ' key
router.get('/', async (req, res, next) => {
  try {
    const game = await Game.findByPk(req.body.id, {
      //game has a 'users' and 'wordPrompts' field when returned
      include: [User, WordPrompt]
    })

    res.json(game)
  } catch (err) {
    next(err)
  }
})

//deletes game and all its users
router.delete('/', async (req, res, next) => {
  try {
    //find the game
    const game = await Game.findByPk(req.body.id, {
      include: [
        {
          model: User,
          as: Player,
          required: true
        }
      ]
    })

    const players = game.users
    // delete all users associated with the game
    await players.map(player =>
      User.destroy({
        where: {
          id: player.id
        }
      })
    )

    //the deletes the game itself
    await Game.destroy({
      where: {
        id: game.id
      }
    })

    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
