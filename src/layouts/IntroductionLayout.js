import React from "react";
import { emitCustomEvent } from "react-custom-events";
import Slide from "./Slide";

const IntroductionLayout = (props) => {
  console.log(props.background_url, "IntroductionLayout");
  return (
    <div
      onPointerMove={() => {
        emitCustomEvent("toolbarOptions", "static");
      }}
      onClick={() => {
        emitCustomEvent("toolbarOptions", "static");
      }}
    >
      <Slide background_url={props.background_url}>
        {props.heading}
        {props.text}
      </Slide>
    </div>
  );
};

export default IntroductionLayout;
