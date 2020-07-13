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

//troubleshooting: get works to update, but post gives a allowNull violation on the user.username
//and user object doesnt show the updated points on state
//also adding points requires parseInt, otherwise 0+ x = 0x instead of x
router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.body.id, {
      include: [
        {
          model: Game,
          as: Player,
          required: true
        }
      ]
    })
    // console.log(user)
    // let player = user.games[0].player
    // console.log(player)

    // if(player.points){
    //   console.log('HELLOOOO')
    //   player.points +=req.body.points
    // }
    //res.json(user)

    // if(user){
    //   const [numAffectedRows, affectedRows] = await Player.update({
    //     points: this.points+=req.body.points
    //   },{
    //     where: {
    //       userId: user.id
    //     },
    //     returning: true,
    //     plain: true
    //   })
    //   res.json(affectedRows)
    // }else{
    //   res.sendStatus(404)
    // }
    const player = await Player.findOne({
      where: {
        userId: user.id
      }
    })

    player.points += req.body.points

    res.json(user)
  } catch (error) {
    next(error)
  }
})
