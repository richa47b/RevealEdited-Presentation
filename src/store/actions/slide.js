import { emitCustomEvent } from "react-custom-events";
import Reveal from "reveal.js";

export const advanceArrow = () => {
  Reveal.next();
  emitCustomEvent("slide-arrow", "advanceArrow");
};
export const regressArrow = () => {
  console.log("regressArrow");
  Reveal.prev();
  emitCustomEvent("slide-arrow", "regressArrow");
};

export const selectIframe = () => {
  emitCustomEvent("iframe-toggle", "selectIframe");
};
export const deSelectIframe = () => {
  emitCustomEvent("whiteboard-event", "stop");
  emitCustomEvent("iframe-toggle", "deselectIframe");
};
