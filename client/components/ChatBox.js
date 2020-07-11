import React, {useState, useEffect} from 'react'
import queryString from 'querystring'
import io from 'socket.io-client'
import {Button, Comment, Form, Header} from 'semantic-ui-react'

let socket

export const ChatBox = ({location}) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const ENDPOINT = 'localhost:8080'
  //UPDATE: when we make the rooms live

  useEffect(
    () => {
      const {name, room} = queryString.parse(location.search)

      socket = io(ENDPOINT)

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
  return (
    <div>
      <Comment.Group>
        <Header as="h3" dividing>
          Type your guesses here and chat with your friends!
        </Header>
        <Form reply>
          <Form.TextArea />
          <Button
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form>
      </Comment.Group>
    </div>
  )
}

export default ChatBox
