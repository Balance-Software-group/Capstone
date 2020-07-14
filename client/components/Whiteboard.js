import React, {useRef, useEffect, useState} from 'react'
import {SketchPicker} from 'react-color'

function Whiteboard() {
  //we define a ref object that will hold the reference to canvas element
  const canvasRef = useRef(null)

  //below we define the contextRef to be able to use it in our drawing functions
  const contextRef = useRef(null)
  //we create a new state to render the user's drawings
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#000000')

  //useEffect is triggered only once when component is mounted
  useEffect(() => {
    //below we get the reference to canvas
    const canvas = canvasRef.current
    canvas.width = window.innerWidth * 2
    canvas.height = window.innerHeight * 2
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`

    //here we define the 2d context to be able to draw on our canvas
    const context = canvas.getContext('2d')
    // the next 4 lines define the intial settings for our context
    context.scale(2, 2)
    context.lineCap = 'round'
    context.strokeStyle = 'black'
    context.lineWidth = 6
    //then we assign our context defined on line 23 to ContextRef.current (contexRef defined on line 9)
    contextRef.current = context
  }, [])

  //this function is called when user preses mouse button
  //native event (from the event )is passed in order for us to get the x and y coordinates of where the path begins
  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)

    const context = canvasRef.current.getContext('2d')
    context.strokeStyle = color

    setIsDrawing(true)
  }

  //finish drawing is called when mouse is up
  const finishDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  //we pass in native event again to get x and y coordinates
  //every time the mouse is moved we need to draw a line to the new coordinates
  const draw = ({nativeEvent}) => {
    if (isDrawing) {
      const {offsetX, offsetY} = nativeEvent
      contextRef.current.lineTo(offsetX, offsetY)
      contextRef.current.stroke()
    }
  }

  return (
    <div>
      <SketchPicker
        color={color}
        onChangeComplete={color => {
          setColor(color.hex)
        }}
      />
      {console.log(typeof color)}
      {/* html canvas element rendered with 3 event listeners and a ref in order to keep track of and work with this element inside react component*/}
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  )
}

export default Whiteboard
