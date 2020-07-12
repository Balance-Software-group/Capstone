const {addUser, removeUser, getUser, getUsersInRoom} = require('./users')
module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('join', ({name, room}, callback) => {
      const {error, user} = addUser({id: socket.id, name, room})
      if (error) return callback(error)

      socket.emit('message', {
        user: 'admin',
        text: `${user.name}, welcome to the ${user.room} room!`
      })
      socket.broadcast
        .to(user.room)
        .emit('message', {user: 'admin', text: `${user.name} has joined!`})

      socket.join(user.room)

      callback()
    })

    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id)

      io.sockets.to(user.room).emit('message', {user: user.name, text: message})

      callback()
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
