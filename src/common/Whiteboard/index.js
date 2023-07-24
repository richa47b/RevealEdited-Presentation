import React, { useState } from "react";
import { useCustomEventListener } from "react-custom-events";
import DrawApp from "./DrawApp";
import { globalContext } from "../../store/Constant";
import { StatesEnum } from "../../store/states";

const WhiteBoard = () => {
  useCustomEventListener("whiteboard-event", (data) => {
    if (data === "start") {
      globalContext.updateValue((context) => {
        context.state = StatesEnum.WHITEBOARD;
      }); // This will increment the weight
      setWhiteBoard(true);
    }
    if (data === "stop") {
      globalContext.updateValue((context) => {
        context.state = StatesEnum.PRESENTATION;
      }); // This will increment the weight
      setWhiteBoard(false);
    }
  });

  const [whiteboard, setWhiteBoard] = useState(false);

  return <div>{whiteboard ? <DrawApp /> : null}</div>;
};

export default WhiteBoard;
