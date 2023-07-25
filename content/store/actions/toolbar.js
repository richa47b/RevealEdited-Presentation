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

export const toolBarBlur = () => {
  document.querySelector(".toolbar-list").blur();
};

export const toolbarOpen = () => {
  document.getElementById("toolbarFocus").focus();
};

export const toolbarClose = () => {
  document.getElementById("iframe").focus();
};

export const selectInnerToolbar = () => {
  emitCustomEvent("toolbar", "upperkeyfortoolbar");
};

export const getToolbarCommand = () => {
  emitCustomEvent("getToolbarCommand");
};
