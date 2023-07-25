import React from "react";
import { emitCustomEvent } from "react-custom-events";
import Slide from "./Slide";

const IntroductionLayout = (props) => {
  return (
    <div
      onPointerMove={() => {
        emitCustomEvent("toolbarOptions", "static");
      }}
      onClick={() => {
        emitCustomEvent("toolbarOptions", "static");
      }}
    >
      <Slide backgroundImage={props.background_url} />
    </div>
  );
};

export default IntroductionLayout;
