const router = require('express').Router()
const {User, Game, WordPrompt, Player} = require('../db/models')

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
      //issues with returning this added user below
      await game[0].addUser(user)
      const createdGame = game
      res.json(createdGame)
    }
  } catch (err) {
    next(err)
  }
})

//updates a users points on the player table and sends back the eager-loaded user
router.put('/', async (req, res, next) => {
  try {
    let {userId, points} = req.body
    //converting points into type integer
    points = parseInt(points, 10)

    //finding the player associated with the userId
    const player = await Player.findOne({
      where: {
        userId: userId
      }
    })

    //if the player exists, add to its existing points
    if (player) {
      await Player.update(
        {
          points: parseInt(player.points, 10) + points
        },
        {
          where: {
            userId: userId
          },
          returning: true,
          plain: true
        }
      )

      //find the user on the updated player, and send it back eager loaded
      const updatedUser = await User.findByPk(userId, {
        include: [
          {
            model: Game,
            as: Player,
            required: true
          }
        ]
      })

      res.json(updatedUser)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})
