import React, {useState, useEffect, useRef} from 'react'
import {SketchPicker} from 'react-color'
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

  //Whiteboard
  const [isDrawing, setIsDrawing] = useState(false)
  const contextRef = useRef(null)
  const canvasRef = useRef(null)
  const [color, setColor] = useState('#000000')

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
    socket.on('drawing', drawings => {
      console.log('THIS IS DRAWINGGGG IN SOCKETTTT', drawings)
      // // draw(drawings)
      // const draw = drawings => {
      //   drawings.map(drawing => contextRef.current.lineTo(drawing.x, drawing.y))
      // }
      // contextRef.current.stroke()
      draw(drawings)
      // console.log('%c DRAWING USE EFFECT!', 'color: green; font-weight: bold;', drawings)
    })
  }, [])

  //Whiteboard Use effect
  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth * 2
    canvas.height = window.innerHeight * 2
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`

    const context = canvas.getContext('2d')
    context.scale(2, 2)
    context.lineCap = 'round'
    context.strokeStyle = 'black'
    context.lineWidth = 6
    contextRef.current = context
  }, [])

  const sendMessage = e => {
    e.preventDefault()
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  const sendDrawing = drawing => {
    if (drawing) {
      socket.emit('draw', drawing)
    }
  }

  //whiteboard helper function
  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)

    const context = canvasRef.current.getContext('2d')
    context.strokeStyle = color

    setIsDrawing(true)
    // // console.log('THIS IS OFFSET X AND Y!!!!!!!', offsetX, offsetY)
    // let data = {x: offsetX, y: offsetY}
    // // console.log('THIS IS DATA!!!!!!!', data)
    // sendDrawing(data)
  }

  const finishDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const draw = ({nativeEvent}) => {
    if (!isDrawing) {
      return
    }
    const {offsetX, offsetY} = nativeEvent
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()

    let drawing = {x: offsetX, y: offsetY}
    console.log('THIS IS DRAWINGGGGG SINGULAR', drawing)
    drawings.push(drawing)
    console.log('THIS IS DRAWINGGGSSSS', drawings)
    sendDrawing(drawings)
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
        <div>
          <SketchPicker
            color={color}
            onChangeComplete={color => {
              setColor(color.hex)
            }}
          />
          <canvas
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            // value={drawings}
            // onChange={({target: {value}}) => sendDrawing(value)}
            ref={canvasRef}
          />
          {/* <Whiteboard
          drawing={drawing}
          setDrawing={setDrawing}
          sendDrawing={sendDrawing}
          drawings={drawings}
          // draw={draw}
          isDrawing={isDrawing}
          setIsDrawing={setIsDrawing}
          contextRef={contextRef}
        /> */}
        </div>
      </div>
    </div>
  )
}

export default GameRoom
