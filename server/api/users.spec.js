/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const agent = request.agent(app)
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('POST /api/users', () => {
    it('creates a user in the database', () => {
      return agent
        .post('/api/users')
        .send({
          username: 'Cody'
        })
        .expect(200)
        .expect(res => {
          expect(res.body.id).to.not.be.an('undefined')
          expect(res.body.username).to.equal('Cody')
        })
    })
  })
})
