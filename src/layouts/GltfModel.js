import React from "react";
import { Col, Row } from "reactstrap";
import Slide from "./Slide";
import Viewer from "../components/Model3D/egjs";
import { emitCustomEvent } from "react-custom-events";

const GltfModel = ({
  text,
  media_type,
  path,
  annotation_url,
  envmap,
  class_name,
  exposure,
  setDefaultPose
}) => {
  return (
    <div
      onPointerMove={() => {
        emitCustomEvent("toolbarOptions", "3Dmodel");
      }}
      onClick={() => {
        emitCustomEvent("toolbarOptions", "3Dmodel");
      }}
    >
      <Slide>
        <Row>
          <Col tabIndex={-1} sm={12} className="mb-5">
            {text}
          </Col>
          <Col tabIndex={-1} sm={12}>
            <Viewer
              tabIndex={1}
              modelPath={path}
              media_type={media_type}
              annotation_url={annotation_url}
              envmap={envmap}
              class_name={class_name}
              exposure={exposure}
              setDefaultPose={setDefaultPose}
            />
          </Col>
        </Row>
      </Slide>
    </div>
  );
};

export default GltfModel;
