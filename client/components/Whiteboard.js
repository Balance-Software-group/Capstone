import React, {useRef, useEffect, useState} from 'react'
import {SketchPicker} from 'react-color'

function Whiteboard({drawing, setDrawing}) {
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
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
  }

  console.log('THIS IS DRAWING FROM WHITEBOARDDDDD!!!!!!', drawing)

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
        onMouseMove={draw}
        onChange={({target: {drawing}}) => draw(drawing)}
        ref={canvasRef}
      />
    </div>
  )
}

export default Whiteboard
