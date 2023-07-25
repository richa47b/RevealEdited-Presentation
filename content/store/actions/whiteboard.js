import { emitCustomEvent } from "react-custom-events";

export const startWhiteboard = (data) => {
  console.log("White Board start");
  emitCustomEvent("whiteboard-event", "start");
  emitCustomEvent("notification-event", "WhiteBoard Activated");
  var currentElement = document.activeElement;
  currentElement.click();
  data.evtCounterForEnterButton = 0;
  return;
};
export const whiteBoardInput = (data) => {
  data.evtCounterForEnterButton++;
};
export const stopWhiteBoard = () => {
  console.log("Stopping whiteboard");
  emitCustomEvent("whiteboard-event", "stop");
  emitCustomEvent("notification-event", "WhiteBoard Deactivate");
};
