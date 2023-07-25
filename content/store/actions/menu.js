import { emitCustomEvent } from "react-custom-events";

export const MenuOpen = () => {
  console.log("menuopen");
  emitCustomEvent("menu-event", "open-menu");
  emitCustomEvent("notification-event", "MENU");
};
export const MenuClose = () => {
  emitCustomEvent("menu-event", "close-menu");
  emitCustomEvent("notification-event", "MENU-CLOSED");
};
export const Menu3DSlide = (data) => {
  data.mode3D =
    data.mode3D >= data.mode3DArray.length - 1 ? 0 : data.mode3D + 1;
};
