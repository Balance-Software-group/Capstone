const {expect} = require('chai')
const db = require('../index')
const Game = db.model('game')

describe('Game model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  let singleGame
  before(() => db.sync({force: true}))
  beforeEach(() => {
    singleGame = {
      roomCode: 'room10'
    }
  })
  afterEach(() => db.sync({force: true}))

  it('has a roomCode field', async () => {
    singleGame.notARealAttribute = 'not a real attribute'
    const savedSingleGame = await Game.create(singleGame)
    expect(savedSingleGame.roomCode).to.equal('room10')
    expect(savedSingleGame.notARealAttribute).to.equal(undefined)
  })
}) // end describe('UserStats model')
