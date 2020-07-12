import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import {Button, Comment, Form, Header} from 'semantic-ui-react'

import Input from './Input'
import Messages from './Messages'

let socket

export const ChatBox = ({location}) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const ENDPOINT = 'localhost:8080'
  //UPDATE: when we make the rooms live

  useEffect(
    () => {
      const {name, room} = queryString.parse(location.search)

      socket = io()

      setName(name)
      setRoom(room)

      socket.emit('join', {name, room})

      return () => {
        socket.emit('disconnect')
        socket.off()
      }
    },
    [ENDPOINT, location.search]
  )

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [...messages, message])
    })
    socket.on('roomData', ({users}) => {
      setUsers(users)
    })
  }, [])

  const sendMessage = e => {
    e.preventDefault()
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  console.log(message, messages)

  return (
    <div>
      <Header as="h3" dividing>
        Type your guesses here and chat with your friends!
      </Header>
      <div>
        <Messages messages={messages} name={name} />
        <Chat
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  )
}

export default ChatBox

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