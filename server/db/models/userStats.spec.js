const {expect} = require('chai')
const db = require('../index')
const UserStats = db.model('userStats')

describe('UserStats model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  let userStat
  before(() => db.sync({force: true}))
  beforeEach(() => {
    userStat = {
      totalPoints: 18000,
      totalTime: 90
    }
  })
  afterEach(() => db.sync({force: true}))

  it('has fields totalPoints and totalTime', async () => {
    userStat.notARealAttribute = 'not a real attribute'
    const savedUserStat = await UserStats.create(userStat)
    expect(savedUserStat.totalPoints).to.equal(18000)
    expect(savedUserStat.totalTime).to.equal(90)
    expect(savedUserStat.notARealAttribute).to.equal(undefined)
  })
}) // end describe('UserStats model')
