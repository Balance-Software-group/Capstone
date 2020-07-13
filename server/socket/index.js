// const {addUser, removeUser, getUser, getUsersInRoom} = require('./users')
// // module.exports = io => {
// io.on('connection', socket => {
//   console.log(`A socket connection to the server has been made: ${socket.id}`)

//   socket.on('join', ({name, room}) => {
//     const {user} = addUser({id: socket.id, name, room})
//     socket.join(user.room)

//     socket.emit('message', {
//       user: 'admin',
//       text: `${user.name}, welcome to the ${user.room} room!`
//     })
//     socket.broadcast
//       .to(user.room)
//       .emit('message', {user: 'admin', text: `${user.name} has joined!`})
//   })

//   socket.on('sendMessage', (message, callback) => {
//     const user = getUser(socket.id)

//     io.to(user.room).emit('message', {user: user.name, text: message})
//     io
//       .to(user.room)
//       .emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

//     callback()
//   })

//   socket.on('disconnect', () => {
//     console.log(`Connection ${socket.id} has left the building`)
//     const user = removeUser(socket.id)

//     if (user) {
//       io
//         .to(user.room)
//         .emit('message', {user: 'admin', text: `${user.name} has left!`})
//     }
//   })
// })
// }
