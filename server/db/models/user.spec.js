/* global describe beforeEach it */
const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  let user
  before(() => db.sync({force: true}))
  beforeEach(() => {
    user = {
      username: 'Cody'
    }
  })
  afterEach(() => db.sync({force: true}))

  it('has a username field', async () => {
    user.notARealAttribute = 'not a real attribute'
    const savedUser = await User.create(user)
    expect(savedUser.username).to.equal('Cody')
    expect(savedUser.notARealAttribute).to.equal(undefined)
  })

  it('username cannot be null', async () => {
    const blankUsername = User.build()
    try {
      await blankUsername.validate()
      throw Error('validation should have failed without username')
    } catch (err) {
      expect(err.message).to.contain('username cannot be null')
    }
  })
})
