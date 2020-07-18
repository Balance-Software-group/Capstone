import React, {useState, useEffect, useRef} from 'react'
import {SketchPicker} from 'react-color'
import queryString from 'query-string'
import io from 'socket.io-client'
import {Timer, UserDashboard} from '../components'

let socket

import Input from './Input'
import Messages from './Messages'
import TextContainer from './TextContainer'
// import TheBoard from './theBoard'

export const GameRoom = ({location}) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [users, setUsers] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const ENDPOINT = window.location.origin

  // //Whiteboard
  const canvasRef = useRef(null)
  const colorsRef = useRef(null)
  // // const socketRef = useRef();

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

    //COLORS
    const colors = document.getElementsByClassName('color')
    console.log(colors, 'the colors')
    console.log(test)

    const current = {
      color: 'black'
    }

    const onColorUpdate = e => {
      current.color = e.target.className.split(' ')[1]
    }

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
      context.lineWidth = 2
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
      console.log('CURRENT', current)
      console.log('client', e.clientX, e.clientY)
      console.log('EVENT', e)
      current.x = e.offsetX
      current.y = e.offsetY
      console.log('CURRENT AGAIN', current)
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

    // socketRef.current = io.connect('/');
    // socketRef.current.on('draw', onDrawingEvent)
    socket.on('draw', onDrawingEvent)
  }, [])

  const mystyle = {
    width: '100%',
    height: '100%',
    // position: 'absolute',
    left: '0',
    right: '0',
    bottom: '0',
    top: '0',
    backgroundColor: 'white'
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
          <canvas ref={canvasRef} style={mystyle} />
          <div ref={colorsRef} className="colors">
            <div className="color black">black</div>
            <div className="color red">red</div>
            <div className="color green">green</div>
            <div className="color blue">blue</div>
            <div className="color yellow">yellow</div>
          </div>
        </div>
        <Timer />
        <UserDashboard />
      </div>
    </div>
  )
}

export default GameRoom

// import React, {useState, useEffect, useRef} from 'react'
// import {SketchPicker} from 'react-color'
// import queryString from 'query-string'
// import io from 'socket.io-client'
// import {Timer, UserDashboard} from '../components'

// let socket

// // import {Button, Comment, Form, Header} from 'semantic-ui-react'

// import Input from './Input'
// import Messages from './Messages'
// import TextContainer from './TextContainer'

// export const GameRoom = ({location}) => {
//   const [name, setName] = useState('')
//   const [room, setRoom] = useState('')
//   const [users, setUsers] = useState('')
//   const [message, setMessage] = useState('')
//   const [messages, setMessages] = useState([])
//   const [drawing, setDrawing] = useState('')
//   const [drawings, setDrawings] = useState([])
//   const ENDPOINT = window.location.origin

//   //Whiteboard
//   const [isDrawing, setIsDrawing] = useState(false)
//   const contextRef = useRef(null)
//   const canvasRef = useRef(null)
//   const [color, setColor] = useState('#000000')

//   useEffect(
//     () => {
//       const {name, room} = queryString.parse(location.search)

//       socket = io(ENDPOINT)

//       setRoom(room)
//       setName(name)

//       socket.emit('join', {name, room})
//     },
//     [ENDPOINT, location.search]
//   )

//   useEffect(() => {
//     socket.on('message', message => {
//       setMessages(messages => [...messages, message])
//     })
//     // socket.on('roomData', ({users}) => {
//     //   setUsers(users)
//     // })
//   }, [])

//   useEffect(() => {
//     socket.on('drawing', thisdrawings => {
//       console.log('THIS IS DRAWINGGGG IN SOCKETTTT', thisdrawings)

//       //startDrawing function
//       // contextRef.current.beginPath()
//       const context = canvasRef.current.getContext('2d')
//       context.strokeStyle = thisdrawings.color
//       if (thisdrawings) {
//         thisdrawings.map(point => {
//           contextRef.current.lineTo(point.x, point.y)

//           contextRef.current.stroke()

//           // contextRef.current.closePath()
//           setDrawing('')
//           setDrawings([])
//           setIsDrawing(false)
//         })

//         // console.log('THIS IS SET IS DRAWINGGGGG', isDrawing)
//       }

//       // draw(drawings)
//       // console.log('%c DRAWING USE EFFECT!', 'color: green; font-weight: bold;', drawings)
//     })
//   }, [])

//   //Whiteboard Use effect
//   useEffect(() => {
//     const canvas = canvasRef.current
//     canvas.width = window.innerWidth * 2
//     canvas.height = window.innerHeight * 2
//     canvas.style.width = `${window.innerWidth}px`
//     canvas.style.height = `${window.innerHeight}px`

//     const context = canvas.getContext('2d')
//     context.scale(2, 2)
//     context.lineCap = 'round'
//     context.strokeStyle = 'black'
//     context.lineWidth = 6
//     contextRef.current = context
//   }, [])

//   const sendMessage = e => {
//     e.preventDefault()
//     if (message) {
//       socket.emit('sendMessage', message, () => setMessage(''))
//     }
//   }

//   const sendDrawing = theDrawings => {
//     if (drawings) {
//       const context = canvasRef.current.getContext('2d')
//       context.strokeStyle = color
//       socket.emit('draw', theDrawings)
//       setDrawing('')
//       setDrawings([])
//     }
//   }

//   // whiteboard helper function
//   const startDrawing = ({nativeEvent}) => {
//     const {offsetX, offsetY} = nativeEvent
//     contextRef.current.beginPath()
//     contextRef.current.moveTo(offsetX, offsetY)

//     const context = canvasRef.current.getContext('2d')
//     context.strokeStyle = color

//     setIsDrawing(true)

//     setDrawing({x: offsetX, y: offsetY, color})
//     console.log('THIS IS DRAWING IN STARTDRAWING FUNCTION', drawing)
//     // console.log('THIS IS OFFSET X AND Y!!!!!!!', offsetX, offsetY)
//     let data = {x: offsetX, y: offsetY, color}
//     // console.log('THIS IS DATA!!!!!!!', data)
//     sendDrawing(data)
//     setDrawing('')
//     setDrawings([])
//     sendDrawing([{}])
//   }

//   const finishDrawing = () => {
//     contextRef.current.closePath()
//     setDrawing('')
//     setDrawings([])
//     setIsDrawing(false)
//     console.log('FINISH DRAWING IS DONEEEEEEE')
//   }

//   const draw = ({nativeEvent}) => {
//     if (!isDrawing) {
//       console.log('WE ARE NOT DRAWING')
//       // setDrawing('')
//       // setDrawings([])
//       return
//     }
//     const {offsetX, offsetY} = nativeEvent
//     contextRef.current.lineTo(offsetX, offsetY)
//     contextRef.current.stroke()

//     const context = canvasRef.current.getContext('2d')
//     context.strokeStyle = color
//     let points = {x: offsetX, y: offsetY, color}
//     // console.log('THIS IS DRAWINGGGGG SINGULAR', points)
//     drawings.push(points)
//     // console.log('THIS IS DRAWINGGGSSSS', points)
//     sendDrawing(drawings)
//     setDrawing('')
//     setDrawings([])
//     // finishDrawing()
//   }

//   return (
//     <div>
//       <div>
//         <h3>
//           Welcome to room {room}! Type your guesses here and chat with your
//           friends!
//         </h3>
//         <Messages messages={messages} name={name} />
//         <Input
//           message={message}
//           setMessage={setMessage}
//           sendMessage={sendMessage}
//         />
//       </div>
//       <TextContainer users={users} />
//       <div>
//         <div>
//           <SketchPicker
//             color={color}
//             onChangeComplete={color => {
//               setColor(color.hex)
//             }}
//           />
//           <canvas
//             onMouseDown={startDrawing}
//             onMouseUp={finishDrawing}
//             onMouseMove={draw}
//             // value={drawings}
//             // onChange={({target: {value}}) => sendDrawing(value)}
//             ref={canvasRef}
//           />
//           {/* <Whiteboard
//           drawing={drawing}
//           setDrawing={setDrawing}
//           sendDrawing={sendDrawing}
//           drawings={drawings}
//           // draw={draw}
//           isDrawing={isDrawing}
//           setIsDrawing={setIsDrawing}
//           contextRef={contextRef}
//         /> */}
//         </div>
//         <Timer />
//         {/* //<Whiteboard /> */}
//         <UserDashboard />
//       </div>
//     </div>
//   )
// }

// export default GameRoom
