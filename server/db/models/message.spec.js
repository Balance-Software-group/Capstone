const {expect} = require('chai')
const db = require('../index')
const Message = db.model('message')

describe('Message model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  let singleMessage
  before(() => db.sync({force: true}))
  beforeEach(() => {
    singleMessage = {
      content: 'what did you do today?',
      author: 'detective',
      scriptPosition: 5
    }
  })
  afterEach(() => db.sync({force: true}))

  it('has fields content, author and scriptPosition', async () => {
    singleMessage.notARealAttribute = 'not a real attribute'
    const savedSingleMessage = await Message.create(singleMessage)
    expect(savedSingleMessage.content).to.equal('what did you do today?')
    expect(savedSingleMessage.author).to.equal('detective')
    expect(savedSingleMessage.scriptPosition).to.equal(5)
    expect(savedSingleMessage.notARealAttribute).to.equal(undefined)
  })
}) // end describe('Message model')
