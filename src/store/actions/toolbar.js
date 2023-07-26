import { emitCustomEvent } from "react-custom-events";

export const hideToolbar = () => {
  emitCustomEvent("annotation-toolbar", "hide");
  emitCustomEvent("notification-event", "Annotation");
};

export const toolBarFocus = () => {
  document.querySelector(".toolbar-list").focus();
};

export const clickActiveElement = () => {
  document.activeElement.click();
};

export const toolBarClose = () => {
  emitCustomEvent("whiteboard-event", "stop");
  emitCustomEvent("iframe-toggle", "deselectIframe");
  document.querySelector(".toolbar-list").blur();
};

export const toolbarOpen = () => {
  document.getElementById("toolbarFocus").focus();
};

export const selectInnerToolbar = () => {
  emitCustomEvent("toolbar", "upperkeyfortoolbar");
};

export const getToolbarCommand = () => {
  emitCustomEvent("getToolbarCommand");
};
