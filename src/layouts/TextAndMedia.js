import React, { useRef } from "react";
import { emitCustomEvent } from "react-custom-events";
import { Col, Row } from "reactstrap";
import Slide from "./Slide";
import { InputState } from "../store/inputState";
import { useStateDesigner } from "@state-designer/react";

const TextAndMedia = (props) => {
  const TextAndMediaRef = useRef(null);
  const machine = useStateDesigner(InputState);

  const IFrame = (src) => {
    const iFrameRefs = useRef(null);
    return (
      <iframe
        // id="iFrameRefs"
        ref={iFrameRefs}
        id={"iFrame" + props.indices}
        title="iframe example"
        src={src}
        tabIndex={1}
        scrolling="no"
        frameBorder="0"
        seamless="seamless"
        allowFullScreen
        onLoad={(evt) => {
          emitCustomEvent("toolbarOptions", "Iframe");

          //evt.target.parentElement.appendChild(evt.target)
        }}
      />
    );
  };

  const Images = (src) => {
    return (
      <img
        alt=""
        data-src={src}
        className="rounded"
        width="100vw"
        height="250px"
      />
    );
  };

  const checkMedia = (props) => {
    if (props.media_type === "iframe") {
      return IFrame(props.iframeLink);
    } else if (props.media_type === "image") {
      return Images(props.imageLink);
    }
  };

  return (
    <div
      onPointerMove={() => {
        emitCustomEvent("toolbarOptions", "iframe");
      }}
      onClick={() => {
        emitCustomEvent("toolbarOptions", "iframe");
        machine.send("SELECTIFRAME");
      }}
    >
      <Slide>
        <Row className="mt-3" tabIndex={-1}>
          <Col sm={12} tabIndex={-1}>
            <span className="text-center"> {props.heading}</span>
          </Col>
          <div
            ref={(el) => {
              TextAndMediaRef.current = el;
            }}
          >
            {checkMedia(props)}
          </div>
        </Row>
      </Slide>
    </div>
  );
};

export default TextAndMedia;
