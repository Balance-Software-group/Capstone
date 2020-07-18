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

  //OG Whiteboard
  // const [isDrawing, setIsDrawing] = useState(false)
  // const contextRef = useRef(null)
  // const canvasRef = useRef(null)
  // const [color, setColor] = useState('#000000')

  //new Whiteboard
  const canvasRef = useRef(null)
  const [color, setColor] = useState('#000000')
  const contextRef = useRef(null)

  // const socketRef = useRef();
  // const colorsRef = useRef(null)

  //new Whiteboard function Draw
  // const draw = ctx => {
  //   ctx.fillStyle = '#000000'
  //   ctx.beginPath()
  //   ctx.arc(50, 100, 20, 0, 2*Math.PI)
  //   ctx.fill()
  // }

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

  useEffect(() => {
    const canvas = canvasRef.current
    // canvas.width = window.innerWidth * 2
    // canvas.height = window.innerHeight * 2
    // canvas.style.width = `${window.innerWidth}px`
    // canvas.style.height = `${window.innerHeight}px`
    const context = canvas.getContext('2d')
    // context.scale(2, 2)
    // context.lineCap = 'round'
    // context.strokeStyle = 'black'
    // context.lineWidth = 6
    // contextRef.current = context
    // context.strokeStyle = color
    // const test = colorsRef.current

    // const onColorUpdate = (e) => {
    //   current.color = e.target.className.split(' ')[1];
    // };

    // const handleColorChange = (color) => {
    //   setColor(color.hex)
    // }

    // const onColorUpdate = (e) => {
    //   current.color = color
    // }

    const current = {
      color
    }

    const handleChangeComplete = color => {
      current.color = color
    }

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
      console.log('THIS IS COLORRRRRR', color)

      //set up canvas size
      // canvas.width = window.innerWidth * 2
      // canvas.height = window.innerHeight * 2

      if (!emit) {
        return
      }
      const w = canvas.width
      const h = canvas.height
      console.log('THIS IS WWWWW', w)
      console.log('THIS IS HEIGHTTTTT', h)

      socket.emit('drawing', {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color: context.strokeStyle
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
        current.color,
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
    canvas.addEventListener('click', handleChangeComplete(color))

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
      console.log('THIS IS DATAAAAAAAA IN THE DRAWING EVENT', data)
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color)
    }
    socket.on('drawing', onDrawingEvent)
  }, [])
  //New Whiteboard UseEffect
  // useEffect(() => {
  //   const canvas = canvasRef.current
  //   const context = canvas.getContext('2d')
  //   canvas.width = window.innerWidth * 2
  //   canvas.height = window.innerHeight * 2
  //   canvas.style.width = `${window.innerWidth}px`
  //   canvas.style.height = `${window.innerHeight}px`

  //   //Our first draw
  //   draw(context)
  // }, [draw])

  // useEffect(() => {
  //   socket.on('drawing', thisdrawings => {
  //     console.log('THIS IS DRAWINGGGG IN SOCKETTTT', thisdrawings)

  //     //startDrawing function
  //     // contextRef.current.beginPath()
  //     const context = canvasRef.current.getContext('2d')
  //     context.strokeStyle = thisdrawings.color
  //     if (thisdrawings) {
  //       thisdrawings.map(point => {
  //         contextRef.current.lineTo(point.x, point.y)

  //         contextRef.current.stroke()

  //         // contextRef.current.closePath()
  //         setDrawing('')
  //         setDrawings([])
  //         setIsDrawing(false)
  //       })

  //       // console.log('THIS IS SET IS DRAWINGGGGG', isDrawing)
  //     }

  //     // draw(drawings)
  //     // console.log('%c DRAWING USE EFFECT!', 'color: green; font-weight: bold;', drawings)
  //   })
  // }, [])

  //Whiteboard Use effect
  // useEffect(() => {
  //   const canvas = canvasRef.current
  //   canvas.width = window.innerWidth * 2
  //   canvas.height = window.innerHeight * 2
  //   canvas.style.width = `${window.innerWidth}px`
  //   canvas.style.height = `${window.innerHeight}px`

  //   const context = canvas.getContext('2d')
  //   context.scale(2, 2)
  //   context.lineCap = 'round'
  //   context.strokeStyle = 'black'
  //   context.lineWidth = 6
  //   contextRef.current = context
  // }, [])

  const sendMessage = e => {
    e.preventDefault()
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  // const sendDrawing = theDrawings => {
  //   if (drawings) {
  //     const context = canvasRef.current.getContext('2d')
  //     context.strokeStyle = color
  //     socket.emit('draw', theDrawings)
  //     setDrawing('')
  //     setDrawings([])
  //   }
  // }

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
            // onChangeComplete={handleColorComplete()}
            onChangeComplete={color => {
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
            width={200}
            height={200}
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
