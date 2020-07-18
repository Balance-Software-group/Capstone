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
import {number} from 'prop-types'

export const GameRoom = ({location}) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [users, setUsers] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  // const [drawing, setDrawing] = useState('')
  // const [drawings, setDrawings] = useState([])
  const ENDPOINT = window.location.origin

  //new Whiteboard
  const canvasRef = useRef(null)
  const [color, setColor] = useState('#000000')
  const contextRef = useRef(null)

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

  //McDonald Attempt

  // useEffect(() => {
  //   setColor(color)
  //   socket.emit('color-change', color)
  //   console.log('THIS IS COLOR FROM SOCKET', color)
  // }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    // canvas.width = window.innerWidth
    // canvas.height = window.innerHeight
    // canvas.style.width = `${window.innerWidth}px`
    // canvas.style.height = `${window.innerHeight}px`
    const context = canvas.getContext('2d')
    // context.scale(2, 2)
    // context.lineCap = 'round'
    // context.strokeStyle = 'black'
    // context.lineWidth = 6
    // contextRef.current = context
    context.strokeStyle = color
    // const test = colorsRef.current

    // const onColorUpdate = (e) => {
    //   current.color = e.target.className.split(' ')[1];
    // };

    const current = {
      color
    }

    // const handleColorChange = (color) => {
    //   setColor(color.hex)
    //   current.color = color
    //   console.log('THIS IS COLORRRR', color)
    //   console.log('THIS IS CURRRRENT', current)
    // }

    //COlOR FUNCTION
    const selectColor = color => {
      setColor(() => {
        socket.emit('color-change', {
          color: current.color
        })
        return {
          currentColor: color
        }
      })
    }

    // const handleChangeComplete = color => {
    //   current.color = color
    // }

    let drawing = false

    const drawLine = (x0, y0, x1, y1, color, emit) => {
      // const context = canvasRef.current.getContext('2d')
      context.beginPath()
      context.moveTo(x0, y0)
      context.lineTo(x1, y1)
      context.strokeStyle = color
      context.lineWidth = 6
      context.stroke()
      context.closePath()
      // console.log('THIS IS COLORRRRRR', color)

      //set up canvas size
      // canvas.width = window.innerWidth * 2
      // canvas.height = window.innerHeight * 2

      if (!emit) {
        return
      }
      const w = canvas.width
      const h = canvas.height

      socket.emit('drawing', {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color
      })
    }

    const onMouseDown = e => {
      drawing = true
      current.x = e.clientX || e.touches[0].clientX
      current.y = e.clientY || e.touches[0].clientY
      // current.color = e.color.hex
    }

    const onMouseMove = e => {
      if (!drawing) {
        return
      }
      drawLine(
        current.x,
        current.y,
        e.clientX || e.touches[0].clientX,
        e.clientY || e.touches[0].clientY,
        color,
        true
      )
      current.x = e.clientX || e.touches[0].clientX
      current.y = e.clientY || e.touches[0].clientY
    }

    const onMouseUp = e => {
      if (!drawing) {
        return
      }
      drawing = false
      drawLine(
        current.x,
        current.y,
        e.clientX || e.touches[0].clientX,
        e.clientY || e.touches[0].clientY,
        current.color,
        true
      )
    }

    //limiting the number of events per second
    const throttle = (callback, delay) => {
      let previousCall = new Date().getTime()
      return function() {
        const time = new Date().getTime()

        if (time - previousCall >= delay) {
          previousCall = time
          callback.apply(null, arguments)
        }
      }
    }

    //adding eventlisteners to our canvas

    canvas.addEventListener('mousedown', onMouseDown, false)
    canvas.addEventListener('mouseup', onMouseUp, false)
    canvas.addEventListener('mouseout', onMouseUp, false)
    canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false)
    canvas.addEventListener('click', selectColor)

    //setting the event listener for canvas resize
    const onResize = () => {
      canvas.width = window.innerHeight
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', onResize, false)
    onResize()

    //adding the socket connection
    const onDrawingEvent = data => {
      const w = canvas.width
      const h = canvas.height
      data.color = color
      console.log('THIS IS DATAAAAAAAA IN THE DRAWING EVENT', data)
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color)
    }
    socket.on('drawing', onDrawingEvent)
  }, [])

  const sendMessage = e => {
    e.preventDefault()
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
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
            // onChangeComplete={handleColorChange}
            // selectColor={color.hex}
            selectColor={color => {
              setColor(color.hex)
            }}
          />
          <canvas
            // onMouseDown={startDrawing}
            // onMouseUp={finishDrawing}
            // onMouseMove={draw}
            // value={drawings}
            // onChange={({target: {value}}) => sendDrawing(value)}
            ref={canvasRef}
            // width={100%}
            // height={200}
          />
        </div>
        <Timer />
        <UserDashboard />
      </div>
    </div>
  )
}

export default GameRoom
