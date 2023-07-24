import React, { useState } from "react";
import { emitCustomEvent, useCustomEventListener } from "react-custom-events";
import { GrNext, GrPrevious } from "react-icons/gr";

const SlideControls = ({
  advanceSlideFunction,
  regressSlideFunction,
  slideNumberState
}) => {
  const [show, setShow] = useState(true);

  useCustomEventListener("iframe-toggle", (data) => {
    if (data === "selectIframe") {
      setShow(false);
    } else if (data === "deselectIframe") {
      setShow(true);
    }
  });

  return (
    <>
      {show ? (
        <div className="slide-controls">
          <span
            className={slideNumberState == 0 ? "d-none" : "fs-1"}
            onClick={() => {
              regressSlideFunction();
              emitCustomEvent("machineEvent", "LEFTARROW");
            }}
            color="white"
          >
            <GrPrevious className="control-icons-left" />
          </span>
          <span
            onClick={() => {
              advanceSlideFunction();
              emitCustomEvent("machineEvent", "RIGHTARROW");
            }}
            color="white"
            className=" fs-1"
          >
            <GrNext className="control-icons-right" />
          </span>
        </div>
      ) : null}
    </>
  );
};

export default SlideControls;
