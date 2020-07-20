const path = require('path')
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const db = require('./db')
const PORT = process.env.PORT || 8080
const app = express()
const socketio = require('socket.io')

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
} = require('./socket/helperFunctions')

module.exports = app

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  // compression middleware
  app.use(compression())

  // auth and api routes
  app.use('/api', require('./api'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const server = app.listen(PORT, () =>
  console.log(`Mixing it up on port ${PORT}`)
)
const io = socketio(server)
io.on('connection', socket => {
  console.log(`A socket connection to the server has been made: ${socket.id}`)

  socket.on('join', ({name, room}) => {
    const {user} = addUser({id: socket.id, name, room})

    socket.join(user.room)

    socket.emit('message', {
      text: `${user.name}, welcome to the ${user.room} room!`
    })

    socket.broadcast
      .to(user.room)
      .emit('message', {text: `${user.name} has joined!`})
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)
    io.to(user.room).emit('message', {user: user.name, text: message})
    io
      .to(user.room)
      .emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
    callback()
  })

  socket.on('draw', onDrawingEvent => {
    const user = getUser(socket.id)
    console.log('THIS IS DRAWING COORDINATES', onDrawingEvent)
    socket.to(user.room).emit('draw', onDrawingEvent)

    // socket.broadcast.emit('drawing', data)
  })

  socket.on('disconnect', () => {
    console.log(`Connection ${socket.id} has left the building`)
    const user = removeUser(socket.id)
    if (user) {
      io
        .to(user.room)
        .emit('message', {user: 'admin', text: `${user.name} has left!`})
    }
  })
})

const syncDb = () => db.sync()

async function bootApp() {
  await syncDb()
  await createApp()
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp()
} else {
  createApp()
}
