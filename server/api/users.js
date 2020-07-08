const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (err) {
    next(err)
  }
})
