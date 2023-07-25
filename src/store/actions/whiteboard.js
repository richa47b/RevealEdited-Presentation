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
