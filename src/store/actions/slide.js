import { emitCustomEvent } from "react-custom-events";

export const advanceArrow = () => {
  console.log("advanceArrow");
  emitCustomEvent("slide-arrow", "advanceArrow");
};
export const regressArrow = () => {
  console.log("regressArrow");
  emitCustomEvent("slide-arrow", "regressArrow");
};

export const selectIframe = () => {
  emitCustomEvent("iframe-toggle", "selectIframe");
};
export const deSelectIframe = () => {
  emitCustomEvent("whiteboard-event", "stop");
  emitCustomEvent("iframe-toggle", "deselectIframe");
};
