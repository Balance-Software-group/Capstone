import React, {useRef, useEffect, useState} from 'react'
import {SketchPicker} from 'react-color'
import {connect} from 'react-redux'

function Whiteboard({
  drawing,
  drawings,
  setDrawing,
  sendDrawing,
  draw,
  setIsDrawing,
  isDrawing,
  contextRef
}) {
  const canvasRef = useRef(null)
  // const contextRef = useRef(null)
  // const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#000000')

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

  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)

    const context = canvasRef.current.getContext('2d')
    context.strokeStyle = color

    setIsDrawing(true)
    // console.log('THIS IS OFFSET X AND Y!!!!!!!', offsetX, offsetY)
    let data = {x: offsetX, y: offsetY}
    // console.log('THIS IS DATA!!!!!!!', data)
    sendDrawing(data)
  }

  const finishDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const setCoordinates = ({nativeEvent}) => {
    if (!isDrawing) {
      return
    }
    const {offsetX, offsetY} = nativeEvent
    // contextRef.current.lineTo(offsetX, offsetY)
    // contextRef.current.stroke()

    let drawing = {x: offsetX, y: offsetY}
    drawings.push(drawing)
    sendDrawing(drawings)
  }

  // const draw = ({nativeEvent}) => {
  //   if (!isDrawing) {
  //     return
  //   }
  //   const {offsetX, offsetY} = nativeEvent
  //   contextRef.current.lineTo(offsetX, offsetY)
  //   contextRef.current.stroke()

  // let data = {x: offsetX, y: offsetY}
  // console.log('THIS IS DRAWINGGGGG SINGULAR', data)
  // drawings.push(drawing)
  // console.log('THIS IS DRAWINGGGSSSS', drawings)
  // sendDrawing(data)
  // }

  return (
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
        onMouseMove={setCoordinates}
        // value={drawings}
        // onChange={({target: {value}}) => sendDrawing(value)}
        ref={canvasRef}
      />
    </div>
  )
}

const mapState = () => {
  return {}
}

const mapDispatch = () => {
  return {}
}

export default connect(mapState, mapDispatch)(Whiteboard)
