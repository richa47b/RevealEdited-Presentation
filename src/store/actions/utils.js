import { emitCustomEvent } from 'react-custom-events'

export const goToNextFocus = () => {
  // Get the currently focused element
  var currentElement = document.activeElement
  console.log(currentElement, 'currentElement')
  // Get all focusable elements on the page
  var focusableElements = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )

  // Find the index of the currently focused element in the array
  var currentIndex = Array.prototype.indexOf.call(
    focusableElements,
    currentElement
  )
  // If the currently focused element is the last one in the array, focus on the first element
  if (currentIndex === focusableElements.length - 1) {
    focusableElements[0].focus()
  } else {
    // Otherwise, focus on the next element in the array
    focusableElements[currentIndex + 1].focus()
  }
}

export const menuEvent = () => {
  emitCustomEvent('menu-event', '')
}
