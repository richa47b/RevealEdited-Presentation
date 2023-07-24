//https://github.com/colbyfayock/my-long-press/blob/main/src/pages/index.js

import { useState, useRef } from 'react'

export default function useLongPress() {
  const [action, setAction] = useState()

  const timerRef = useRef()
  const isLongPress = useRef()
  let evtCounter = 0

  function startPressTimer(evt) {
    isLongPress.current = false
    timerRef.current = setTimeout(() => {
      isLongPress.current = true
      if (evt.buttons == 1) setAction('longpress' + ++evtCounter)
    }, 500)
  }

  function handleOnClick(e) {
    // console.log("handleOnClick");
    if (isLongPress.current) {
      setAction('longpress' + ++evtCounter)
      return
    }
    setAction('click' + ++evtCounter)
  }

  function handleOnMouseDown(evt) {
    // console.log(evt.buttons, "evt");
    if (evt.buttons == 2) {
      return
    }
    startPressTimer(evt)
    // console.log('handleOnMouseDown');
  }

  function handleOnMouseUp() {
    // console.log('handleOnMouseUp');
    clearTimeout(timerRef.current)
  }

  function handleOnTouchStart() {
    // console.log('handleOnTouchStart');
    startPressTimer()
  }

  function handleOnTouchEnd() {
    if (action === 'longpress') return
    // console.log('handleOnTouchEnd');
    clearTimeout(timerRef.current)
  }

  function handleOnContextMenu(evt) {
    evt.preventDefault()
    setAction('contextMenu' + ++evtCounter)
  }
  return {
    action,
    handlers: {
      onClick: handleOnClick,
      onMouseDown: handleOnMouseDown,
      onMouseUp: handleOnMouseUp,
      onTouchStart: handleOnTouchStart,
      onTouchEnd: handleOnTouchEnd,
      onContextMenu: handleOnContextMenu,
    },
  }
}
