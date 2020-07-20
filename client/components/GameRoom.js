import React, {useState, useEffect, useRef} from 'react'
import {SketchPicker} from 'react-color'
import queryString from 'query-string'
import io from 'socket.io-client'
// import {Timer, UserDashboard} from '../components'
import {Container, Grid, Header, Icon} from 'semantic-ui-react'
import Input from './Input'
import Messages from './Messages'
import TextContainer from './TextContainer'
let socket

// -------------------------MOVED COLOR FUNCS ------------------------
const current = {
  color: '#000000'
}

// helper that will update the current color
const onColorUpdate = e => {
  console.log(e)
  current.color = e.target.className.split(' ')[1]
  // setCurrent({ color: e.target.className.split(' ')[1]});
}
// -------------------------------------------------------------------------

export const GameRoom = ({location}) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [users, setUsers] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const ENDPOINT = window.location.origin

  const canvasRef = useRef(null)
  const colorsRef = useRef(null)
  // const [ current, setCurrent ] = useState({ color: 'black' });
  const [test, setTest] = useState()
  const [currColor, setcurrColor] = useState('#000000')

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
  }, [])

  const sendMessage = e => {
    e.preventDefault()
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const test = colorsRef.current
    const context = canvas.getContext('2d')

    // COLORS
    const colors = document.getElementsByClassName('color')
    console.log(colors, 'the colors')
    console.log(test)

    for (let i = 0; i < colors.length; i++) {
      colors[i].addEventListener('click', onColorUpdate, false)
    }
    let drawing = false

    //DRAWLINE
    const drawLine = (x0, y0, x1, y1, color, emit) => {
      context.beginPath()
      context.moveTo(x0, y0)
      context.lineTo(x1, y1)
      context.strokeStyle = color
      context.lineCap = 'round'
      context.lineWidth = 7
      context.stroke()
      context.closePath()

      if (!emit) {
        return
      }
      const w = canvas.width
      const h = canvas.height

      socket.emit('draw', {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color
      })
    }

    //MOUSE MOVEMENTS/CLICKS
    const onMouseDown = e => {
      drawing = true
      current.x = e.offsetX
      current.y = e.offsetY
    }

    const onMouseMove = e => {
      if (!drawing) {
        return
      }

      drawLine(current.x, current.y, e.offsetX, e.offsetY, current.color, true)
      current.x = e.offsetX
      current.y = e.offsetY
    }

    const onMouseUp = e => {
      if (!drawing) {
        return
      }
      drawing = false
      drawLine(current.x, current.y, e.offsetX, e.offsetY, current.color, true)
    }

    //THROTTLE limiting num of events per second
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

    // ----------------------- CLEAR CANVAS ----------------------------

    const clearCanvas = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)
    }

    const emitAndCanvas = () => {
      socket.emit('clear')
      clearCanvas()
    }
    const clearButton = document.getElementsByClassName('clear')

    clearButton[0].addEventListener('click', emitAndCanvas, false)
    // -------------------------------------------------------------------------

    canvas.addEventListener('mousedown', onMouseDown, false)
    canvas.addEventListener('mouseup', onMouseUp, false)
    canvas.addEventListener('mouseout', onMouseUp, false)
    canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false)

    //RESIZE
    const onResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', onResize, false)
    onResize()

    const onDrawingEvent = data => {
      const w = canvas.width
      const h = canvas.height
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color)
    }
    socket.on('draw', onDrawingEvent)
    socket.on('clear', clearCanvas)
  }, [])

  const mystyle = {
    width: '100%',
    height: '100%',
    left: '0',
    right: '0',
    bottom: '0',
    top: '0',
    backgroundColor: 'white'
  }

  const imgStyle = {
    width: '5%',
    height: '5%'
  }

  return (
    <div>
      <Container>
        <Grid>
          <Grid.Row>
            <h3>
              Welcome to room {room}! Type your guesses here and chat with your
              friends!
            </h3>
          </Grid.Row>
          <div>
            <Messages messages={messages} name={name} />
            <Input
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </div>
          <TextContainer users={users} />
        </Grid>
      </Container>
      <div>
        <SketchPicker
          color={currColor}
          onChangeComplete={color => {
            current.color = color.hex
            setcurrColor(color.hex)
          }}
        />
        <img
          name="eraser"
          style={imgStyle}
          src="https://cdn2.iconfinder.com/data/icons/design-tools-27/1024/eraser-512.png"
          className="color white"
        />
        <img
          style={imgStyle}
          name="delete"
          className="clear"
          src="https://i.imgur.com/o75tGAW.png"
        />
        <div>
          <canvas ref={canvasRef} style={mystyle} />
        </div>
      </div>
    </div>
  )
}

export default GameRoom

// https://www.kindpng.com/picc/m/606-6068817_clear-vector-stamp-clear-button-icon-hd-png.png
