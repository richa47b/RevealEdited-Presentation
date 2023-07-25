import { emitCustomEvent } from 'react-custom-events'

export const detectGesture = () => {
  emitCustomEvent('gesture-recognition-event', 'toggle')
}

export const detectSearch = () => {
  emitCustomEvent('search-event', 'search')
}

export const openSearchBar = (data) => {
  if (data.toggleSpeech === 1) {
    // Browser Home for Speech
    emitCustomEvent('speechRecognition-event', 'stop')
    data.toggleSpeech = 0
  } else {
    emitCustomEvent('speechRecognition-event', 'start')
    data.toggleSpeech = 1
  }
}
