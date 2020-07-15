import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

let socket

// import {Button, Comment, Form, Header} from 'semantic-ui-react'

import Input from './Input'
import Messages from './Messages'
import TextContainer from './TextContainer'
import Whiteboard from './Whiteboard'

export const GameRoom = ({location}) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [users, setUsers] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [drawing, setDrawing] = useState('')
  const [drawings, setDrawings] = useState([])
  const ENDPOINT = window.location.origin

  useEffect(
    () => {
      const {name, room} = queryString.parse(location.search)

      socket = io(ENDPOINT)

      setRoom(room)
      setName(name)

      socket.emit('join', {name, room})
    },
    [ENDPOINT, location.search]
  )

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [...messages, message])
    })
    // socket.on('roomData', ({users}) => {
    //   setUsers(users)
    // })
  }, [])

  useEffect(() => {
    socket.on('drawing', drawing => {
      drawing = data
      console.log('%c DRAWING USE EFFECT!', 'color: green; font-weight: bold;')
    })
  }, [])

  const sendMessage = e => {
    e.preventDefault()
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  const sendDrawing = drawing => {
    // e.preventDefault()
    if (drawing) {
      socket.emit('draw', data)
    }
  }

  return (
    <div>
      <div>
        <h3>
          Welcome to room {room}! Type your guesses here and chat with your
          friends!
        </h3>
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
      <div>
        <Whiteboard
          drawing={drawing}
          setDrawing={setDrawing}
          sendDrawing={sendDrawing}
          drawings={drawings}
        />
      </div>
    </div>
  )
}

export default GameRoom

//Semantic UI div
/*<div>
      <Comment.Group>
        <Header as="h3" dividing>
          Type your guesses here and chat with your friends!
        </Header>
        <Form>
          <Form.TextArea>
            {/* <Form.Input
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null} /> */
// </Form.TextArea>
/* <Form.Input value= {message} */
/* onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}/> */
/* <Button
                content="Add Reply"
                labelPosition="left"
                icon="edit"
                primary
              /> */
/* <Button type="submit" onClick={e => sendMessage(e)}>
                Submit
              </Button>
            </Form>
          </Comment.Group>
        </div> */
