import React, {useState, useEffect, useRef} from 'react'
import {SketchPicker} from 'react-color'
import queryString from 'query-string'
import io from 'socket.io-client'
import {Timer, UserDashboard} from '../components'

let socket

// import {Button, Comment, Form, Header} from 'semantic-ui-react'

import Input from './Input'
import Messages from './Messages'
import TextContainer from './TextContainer'

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
    socket.on('drawing', thisdrawings => {
      console.log('THIS IS DRAWINGGGG IN SOCKETTTT', thisdrawings)

      //startDrawing function
      // contextRef.current.beginPath()
      const context = canvasRef.current.getContext('2d')
      context.strokeStyle = thisdrawings.color
      if (thisdrawings) {
        // thisdrawings.map(point => {
        //   contextRef.current.lineTo(point.x, point.y)
        contextRef.current.lineTo(thisdrawings.x, thisdrawings.y)
        contextRef.current.stroke()

        // contextRef.current.closePath()
        setDrawing('')
        setDrawings([])
        setIsDrawing(false)
        // }
        // )

        // console.log('THIS IS SET IS DRAWINGGGGG', isDrawing)
      }

      // draw(drawings)
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

  const sendDrawing = theDrawings => {
    if (drawing) {
      const context = canvasRef.current.getContext('2d')
      context.strokeStyle = color
      socket.emit('draw', theDrawings)
      setDrawing('')
      setDrawings([])
    }
  }

  // whiteboard helper function
  // const startDrawing = ({nativeEvent}) => {
  //   const {offsetX, offsetY} = nativeEvent
  //   contextRef.current.beginPath()
  //   contextRef.current.moveTo(offsetX, offsetY)

  //   const context = canvasRef.current.getContext('2d')
  //   context.strokeStyle = color

  //   setIsDrawing(true)

  //   setDrawing({x: offsetX, y: offsetY, color})
  //   console.log('THIS IS DRAWING IN STARTDRAWING FUNCTION', drawing)
  //   // console.log('THIS IS OFFSET X AND Y!!!!!!!', offsetX, offsetY)
  //   let data = {x: offsetX, y: offsetY, color}
  //   // console.log('THIS IS DATA!!!!!!!', data)
  //   sendDrawing(data)
  //   setDrawing('')
  //   setDrawings([])
  //   sendDrawing([{}])
  // }

  // const finishDrawing = () => {
  //   contextRef.current.closePath()
  //   setDrawing('')
  //   setDrawings([])
  //   setIsDrawing(false)
  //   console.log('FINISH DRAWING IS DONEEEEEEE')
  // }

  // const draw = ({nativeEvent}) => {
  //   if (!isDrawing) {
  //     console.log('WE ARE NOT DRAWING')
  //     // setDrawing('')
  //     // setDrawings([])
  //     return
  //   }
  //   const {offsetX, offsetY} = nativeEvent
  //   contextRef.current.lineTo(offsetX, offsetY)
  //   contextRef.current.stroke()

  //   const context = canvasRef.current.getContext('2d')
  //   context.strokeStyle = color
  //   let points = {x: offsetX, y: offsetY, color}
  //   // console.log('THIS IS DRAWINGGGGG SINGULAR', points)
  //   drawings.push(points)
  //   // console.log('THIS IS DRAWINGGGSSSS', points)
  //   sendDrawing(drawings)
  //   setDrawing('')
  //   setDrawings([])
  //   // finishDrawing()
  // }
  const combinedDraw = event => {
    console.log('THIS IS NATIVE EVENT --->,', event.nativeEvent)
    console.log('THIS IS EVENT.TARGET --->,', event.nativeEvent.type)
    if (event.nativeEvent.type === 'mousedown') {
      const {offsetX, offsetY} = event.nativeEvent
      contextRef.current.beginPath()
      contextRef.current.moveTo(offsetX, offsetY)

      const context = canvasRef.current.getContext('2d')
      context.strokeStyle = color
      setDrawing({offsetX, offsetY, color})

      setIsDrawing(true)
    } else if (event.nativeEvent.type === 'mousemove' && isDrawing) {
      const {offsetX, offsetY} = event.nativeEvent
      contextRef.current.lineTo(offsetX, offsetY)
      let points = {x: offsetX, y: offsetY, color}

      // drawings.push(points)

      sendDrawing(points)
      contextRef.current.stroke()
    } else if (event.nativeEvent.type === 'mouseup') {
      contextRef.current.closePath()
      setIsDrawing(false)
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
        <div>
          <SketchPicker
            color={color}
            onChangeComplete={color => {
              setColor(color.hex)
            }}
          />
          <canvas
            onMouseDown={combinedDraw}
            onMouseUp={combinedDraw}
            onMouseMove={combinedDraw}
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
        <Timer />
        {/* //<Whiteboard /> */}
        <UserDashboard />
      </div>
    </div>
  )
}

export default GameRoom
