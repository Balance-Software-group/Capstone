import React, {useState, useEffect, useRef} from 'react'
// import queryString from 'query-string'
// import io from 'socket.io-client'

let socket

export const theBoard = () => {
  //Whiteboard
  const canvasRef = useRef(null)
  const colorsRef = useRef(null)
  // const socketRef = useRef();

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
      current.x = e.clientX
      current.y = e.clientY
    }

    const onMouseMove = e => {
      if (!drawing) {
        return
      }
      drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true)
      current.x = e.clientX
      current.y = e.clientY
    }

    const onMouseUp = e => {
      if (!drawing) {
        return
      }
      drawing = false
      drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true)
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

    socket.on('draw', onDrawingEvent)
  }, [])

  const mystyle = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: '0',
    right: '0',
    bottom: '0',
    top: '0',
    backgroundColor: 'blue'
  }

  return (
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
    </div>
  )
}

export default theBoard
