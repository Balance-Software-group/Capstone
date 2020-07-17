import React, {useRef, useEffect, useState} from 'react'
import {SketchPicker} from 'react-color'
import {connect} from 'react-redux'

function Whiteboard() {
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

  const combinedDraw = event => {
    console.log('THIS IS NATIVE EVENT --->,', event.nativeEvent)
    console.log('THIS IS EVENT.TARGET --->,', event.nativeEvent.type)
    if (event.nativeEvent.type === 'mousedown') {
      const {offsetX, offsetY} = event.nativeEvent
      contextRef.current.beginPath()
      contextRef.current.moveTo(offsetX, offsetY)

      const context = canvasRef.current.getContext('2d')
      context.strokeStyle = color

      setIsDrawing(true)
    } else if (event.nativeEvent.type === 'mousemove' && isDrawing) {
      const {offsetX, offsetY} = event.nativeEvent
      contextRef.current.lineTo(offsetX, offsetY)
      contextRef.current.stroke()
    } else {
      contextRef.current.closePath()
      setIsDrawing(false)
    }
  }

  const startDrawing = event => {
    console.log('THIS IS NATIVE EVENT --->,', event.nativeEvent)
    console.log('THIS IS EVENT.TARGET --->,', event.nativeEvent.type)

    const {offsetX, offsetY} = event.nativeEvent
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

  return (
    <div>
      <SketchPicker
        color={color}
        onChangeComplete={color => {
          setColor(color.hex)
        }}
      />

      <h1>HIIIIIIIIIIIIIIII</h1>

      {/* <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      /> */}
      <canvas
        onMouseDown={combinedDraw}
        onMouseUp={combinedDraw}
        onMouseMove={combinedDraw}
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
