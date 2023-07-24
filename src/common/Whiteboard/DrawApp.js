import React, { useRef, useState, useEffect } from 'react'
import { useCustomEventListener } from 'react-custom-events'

export default function Canvas() {
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#FFF')
  const [size, setSize] = useState('3')
  const canvasRef = useRef(null)
  const ctx = useRef(null)
  const timeout = useRef(null)
  // const [cursor, setCursor] = useState('url(/app/Pencil.svg)')

  let startX
  let startY
  let isDown = false

  function drawOval(x, y) {
    const canvas = canvasRef.current
    ctx.current = canvas.getContext('2d')
    ctx.current.clearRect(0, 0, canvas.width, canvas.height)
    ctx.current.beginPath()
    ctx.current.moveTo(startX, startY + (y - startY) / 2)
    ctx.current.bezierCurveTo(
      startX,
      startY,
      x,
      startY,
      x,
      startY + (y - startY) / 2
    )
    ctx.current.bezierCurveTo(
      x,
      y,
      startX,
      y,
      startX,
      startY + (y - startY) / 2
    )
    ctx.current.lineWidth = 10
    ctx.current.strokeStyle = '#bc264b '
    // ctx.current.closePath();
    ctx.current.stroke()
  }

  function handleMouseDown(e) {
    e.preventDefault()
    const canvas = canvasRef.current
    ctx.current = canvas.getContext('2d')
    const canvasOffset = canvas.getBoundingClientRect()
    const offsetX = canvasOffset.left
    const offsetY = canvasOffset.top
    startX = parseInt(e.clientX - offsetX)
    startY = parseInt(e.clientY - offsetY)
    isDown = true
  }

  function handleMouseUp(e) {
    if (!isDown) return
    e.preventDefault()
    isDown = false
  }

  function handleMouseOut(e) {
    if (!isDown) return
    e.preventDefault()
    isDown = false
  }

  function handleMouseMove(e) {
    if (!isDown) return
    e.preventDefault()
    const canvas = canvasRef.current
    const canvasOffset = canvas.getBoundingClientRect()
    const offsetX = canvasOffset.left
    const offsetY = canvasOffset.top
    const mouseX = parseInt(e.clientX - offsetX)
    const mouseY = parseInt(e.clientY - offsetY)
    drawOval(mouseX, mouseY)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    ctx.current = canvas.getContext('2d')

    //Resizing
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
  }, [ctx])

  const startPosition = ({ nativeEvent }) => {
    setIsDrawing(true)
    draw(nativeEvent)
  }

  const finishedPosition = () => {
    setIsDrawing(false)
    ctx.current.beginPath()
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return
    }
    const canvas = canvasRef.current
    ctx.current = canvas.getContext('2d')
    ctx.current.lineWidth = size
    ctx.current.lineCap = 'round'
    ctx.current.strokeStyle = color

    ctx.current.lineTo(nativeEvent.clientX, nativeEvent.clientY)
    ctx.current.stroke()
    ctx.current.beginPath()
    ctx.current.moveTo(nativeEvent.clientX, nativeEvent.clientY)

    if (timeout.current !== undefined) clearTimeout(timeout.current)
    timeout.current = setTimeout(function () {
      var base64ImageData = canvas.toDataURL('image/png')
      localStorage.setItem('canvasimg', base64ImageData)
    }, 400)
  }

  const clearCanvas = () => {
    localStorage.removeItem('canvasimg')
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.fillStyle = 'rgba(255,255,255,1)'
    context.clearRect(0, 0, canvas.width, canvas.height)

    //Passing clear screen
    if (timeout.current !== undefined) clearTimeout(timeout.current)
    timeout.current = setTimeout(function () {
      var base64ImageData = canvas.toDataURL('image/png')
      localStorage.setItem('canvasimg', base64ImageData)
    }, 400)
  }

  const getPen = () => {
    // console.log('getPen')
    // setCursor('url(/app/Pencil.svg)')
    // setSize('3')
    // setColor('#bc264b')
    ctx.current.globalCompositeOperation = 'source-over'
  }

  const eraseCanvas = () => {
    // setCursor('grab')
    setSize('20')
    setColor('#FFFFFF')
    ctx.current.globalCompositeOperation = 'destination-out'

    if (!isDrawing) {
      return
    }
  }

  useCustomEventListener('whiteBoard-start', (data) => {
    if (data === 'pen') getPen()
    if (data === 'erase') eraseCanvas()
    if (data === 'clear') clearCanvas()
    console.log(data, 'datas')
  })

  return (
    <>
      <div
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 9 }}
        id="whiteboard-canvas"
      >
        {/* <ToolBar
          getPen={getPen}
          eraseCanvas={eraseCanvas}
          clearCanvas={clearCanvas}
        /> */}
        {/* <div className="canvas-btn">
        <button onClick={getPen} className="btn-width">
          Pencil
        </button>
        <div className="btn-width">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div>
          <select
            className="btn-width"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option> 1 </option>
            <option> 3 </option>
            <option> 5 </option>
            <option> 10 </option>
            <option> 15 </option>
            <option> 20 </option>
            <option> 25 </option>
            <option> 30 </option>
          </select>
        </div>
        <button 
        onClick={clearCanvas}
         className="btn-width">
          Clear
        </button>
        <div>
          <button
           onClick={eraseCanvas} 
           className="btn-width">
            Eras
          </button>
        </div>
      </div> */}
        <canvas
          id="whiteboard-canvas"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseOut={handleMouseOut}
          ref={canvasRef}
        />
      </div>
    </>
  )
}
