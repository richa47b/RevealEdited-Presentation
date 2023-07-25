import React, { useEffect, useRef, useState } from "react";
import View3D from "@egjs/react-view3d";
import "@egjs/react-view3d/css/view3d-bundle.min.css";
import { emitCustomEvent, useCustomEventListener } from "react-custom-events";
import { animate, setMesh, setRender } from "./PostProcessing";
import {
  checkmodelLoaded,
  ShowAllAnnotations,
  cameraZoom,
  rotatePointer,
  cameraPan,
  HideAllAnnotations,
  disassembleAnimation,
  assembleAnimation
} from "./egjsProcessingMethods";

const Viewer = ({
  modelPath,
  annotation_url,
  envmap,
  class_name,
  exposure,
  setDefaultPose
}) => {
  const assemble = setDefaultPose[0].assemble.assemble;
  const disassemble = setDefaultPose[1].disassemble.disassemble;
  let view3DRef = "";
  let anim = false;
  view3DRef = useRef();
  let currentSelectedIndex = -1;

  const [yawValue, setYawValue] = useState(0);
  const [pitchValue, setPitchValue] = useState(0);

  window.setYawValue = setYawValue;
  window.setPitchValue = setPitchValue;
  window.currentSelectedIndex = currentSelectedIndex;
  window.ShowAllAnnotations = ShowAllAnnotations;
  window.cameraZoom = cameraZoom;
  window.Rotate = rotatePointer;
  window.cameraPan = cameraPan;

  useEffect(() => {
    checkmodelLoaded(view3DRef);
  });

  useCustomEventListener("disassemble-model", (data) => {
    if (data === "reset") ResetCamera(1200);
    if (data === "disassemble") disassembleAnimation(view3DRef);
    if (data === "assemble") assembleAnimation(view3DRef);
  });

  useCustomEventListener("pinch", (data) => {
    view3DRef.current.camera.yaw = -data.x * 40;
    view3DRef.current.camera.pitch = data.y * 40;
    view3DRef.current.camera.updatePosition();
    view3DRef.current.renderer.renderSingleFrame();
  });

  useCustomEventListener("model-events", (data) => {
    const mode = data.split(":")[1];
    const direction = data.split(":")[0];
    let functionToCall = null;
    if (mode == "ROTATE") functionToCall = rotatePointer;
    if (mode == "ZOOM") functionToCall = cameraZoom;
    if (mode == "PAN") functionToCall = cameraPan;

    if (direction == "x+") functionToCall("left");
    if (direction == "x-") functionToCall("right");
    if (direction == "y+") functionToCall("down");
    if (direction == "y-") functionToCall("up");
  });

  const ResetCamera = (callAssemble = true, duration = 1200) => {
    setMesh(null);
    setRender(false);
    if (callAssemble) {
      assembleAnimation(view3DRef);
      HideAllAnnotations(view3DRef);
    }
    view3DRef.current.camera.reset(duration);
  };

  function SetDefaultPose(action) {
    if (action === "3.Assemble" || action === "1.Idle") {
      view3DRef.current.camera.defaultPose.pitch = assemble.pitch;
      view3DRef.current.camera.defaultPose.yaw = assemble.yaw;
      view3DRef.current.camera.defaultPose.pivot.x = assemble.pivotX;
      view3DRef.current.camera.defaultPose.pivot.y = assemble.pivotY;
      view3DRef.current.camera.defaultPose.pivot.z = assemble.pivotZ;
      view3DRef.current.camera.defaultPose.zoom = assemble.zoom;
    }
    if (action === "2.DissAssemble") {
      view3DRef.current.camera.defaultPose.pitch = disassemble.pitch;
      view3DRef.current.camera.defaultPose.yaw = disassemble.yaw;
      view3DRef.current.camera.defaultPose.pivot.x = disassemble.pivotX;
      view3DRef.current.camera.defaultPose.pivot.y = disassemble.pivotY;
      view3DRef.current.camera.defaultPose.pivot.z = disassemble.pivotZ;
      view3DRef.current.camera.defaultPose.zoom = disassemble.zoom;
    }
  }

  function OnAnimationFinished() {
    view3DRef.current.on("animationFinished", (evt) => {
      let action = evt.clip.name;
      if (evt.clip.name === "3.Assemble" || evt.clip.name === "1.Idle") {
        // HideAllAnnotations();
        SetDefaultPose("3.Assemble");
        ResetCamera(false);
      }
      if (action === "2.DissAssemble") {
        ShowAllAnnotations(view3DRef);
        SetDefaultPose("2.DissAssemble");
        ResetCamera(false);
      }
      anim = false;
    });
    view3DRef.current.on("render", (evt) => {
      animate();
    });
  }
  return (
    <div className="threeDmodel-viewer">
      <View3D
        ref={view3DRef}
        yaw={yawValue}
        pitch={pitchValue}
        animationRepeatMode="none"
        autoInit={false}
        src={modelPath}
        envmap={envmap}
        exposure={exposure}
        className={class_name}
        annotationURL={annotation_url}
        onLoad={() => {
          OnAnimationFinished();
          window.assembleAnimation = assembleAnimation;
          window.disassembleAnimation = disassembleAnimation;
        }}
      />
    </div>
  );
};

export default Viewer;
