import { emitCustomEvent } from "react-custom-events";

export * from "./menu";
export * from "./whiteboard";
export * from "./gestureAndSearch";
export * from "./toolbar";
export * from "./utils";
export * from "./tabIndexManipulator";
export * from "./slide";

export const notificationEvent = (mode3DArray, mode3D) => {
  emitCustomEvent("notification-event", mode3DArray[mode3D]);
};
