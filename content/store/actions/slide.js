import { emitCustomEvent } from "react-custom-events";

export const advanceArrow = () => {
  emitCustomEvent("slide-arrow", "advanceArrow");
};
export const regressArrow = () => {
  emitCustomEvent("slide-arrow", "regressArrow");
};

export const selectIframe = () => {
  emitCustomEvent("iframe-toggle", "selectIframe");
};

export const deSelectIframe = () => {
  emitCustomEvent("iframe-toggle", "deselectIframe");
};
