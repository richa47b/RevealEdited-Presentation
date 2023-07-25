import { emitCustomEvent } from "react-custom-events";
import {
  globalCurrentRef,
  globalCurrentTab,
  globalCurrentTabToolBar
} from "../Constant";

export const resetTabIndex = (data) => {
  data.currentTab = 0;
};

export const getCurrentSlide = () => {
  globalCurrentTab
    .select((context) => context.state)
    .subscribe((state) => {
      return state;
    });
};

export const SideBarUpKey = async (data) => {
  emitCustomEvent("menuIncrement", "subtract");
};

export const SideBarDownKey = async (data) => {
  emitCustomEvent("menuIncrement", "add");
};

export const ToolBarLeftKey = async (data) => {
  // Find the new next index.
  emitCustomEvent("ToolBarIncrement", "left");

  // data.currentTab = data.currentTab - 1 <= 0 ? 0 : data.currentTab - 1;
  // await globalCurrentTabToolBar.updateValue((context) => {
  //   context.state = data.currentTab;
  // });
};

export const ToolBarRightKey = async (data) => {
  emitCustomEvent("ToolBarIncrement", "right");

  // data.currentTab = data.currentTab + 1 >= 5 ? 0 : data.currentTab + 1;
  // await globalCurrentTabToolBar.updateValue((context) => {
  //   context.state = data.currentTab;
  // });
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
  emitCustomEvent("toolBarControls");
};
