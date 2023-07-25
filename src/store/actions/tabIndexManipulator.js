import { emitCustomEvent } from "react-custom-events";

export const resetTabIndex = (data) => {
  data.currentTab = 0;
};

export const SideBarUpKey = async () => {
  emitCustomEvent("menuIncrement", "subtract");
};

export const SideBarDownKey = async () => {
  emitCustomEvent("menuIncrement", "add");
};

export const ToolBarLeftKey = async () => {
  // Find the new next index.
  emitCustomEvent("ToolBarIncrement", "left");
};

export const ToolBarRightKey = async () => {
  emitCustomEvent("ToolBarIncrement", "right");
};

export const innerToolBarNextKey = async () => {
  emitCustomEvent("valueIncrement", "add");
};

export const innerToolBarLeftKey = async () => {
  emitCustomEvent("innerToolBarControl", "left");
};

export const innerToolBarRightKey = async () => {
  emitCustomEvent("innerToolBarControl", "right");
};

export const innerToolBarUpKey = async () => {
  emitCustomEvent("innerToolBarControl", "up");
};

export const innerToolBarDownKey = async () => {
  emitCustomEvent("innerToolBarControl", "down");
};
export const toolbarControls = () => {
  emitCustomEvent("whiteboard-event", "stop");
  emitCustomEvent("toolBarControls");
};
