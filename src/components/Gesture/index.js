import React, { useEffect, useRef } from "react";
import Reveal from "reveal.js";
import {
  SwipeGesture,
  RecordLandmarksForSwipe,
  isRecording
} from "./SwipeGesture";
import {
  drawConnectors,
  drawLandmarks
} from "@mediapipe/drawing_utils/drawing_utils";
import Camera from "@mediapipe/camera_utils";
import { Hands, HAND_CONNECTIONS } from "@mediapipe/hands/hands";
import { DetectFistOpenClosed } from "./FistOpenClosed";
import { CheckForPinch, checkInitialPichGesture, pinched } from "./Pinch";
import { useCustomEventListener } from "react-custom-events";
import { emitCustomEvent } from "react-custom-events";
import { globalSlideState } from "../../store/Constant";

/******
 * Available Gestures
 */
//add them to a common place
const FIST_CLOSED = "FIST_CLOSED";
const FIST_OPEN = "FIST_OPEN";
const FIST_CLOSED_OPEN = "FIST_CLOSED_OPEN";
const ONE = "ONE";
const TWO = "TWO";
const THREE = "THREE";
const FOUR = "FOUR";
const SLIDE_NEXT = "SLIDE_NEXT";
const SLIDE_PREV = "SLIDE_PREV";
let handXAtFrame = -1;
let previousHandXAtFrame = -1;
let previousHandYAtFrame = -1;
let activate = false;
let handYAtFrame = -1;
let CURRENT_GESTURE;
let PREVIOUS_GESTURE;

export const Gesture = () => {
  console.log("Gesture Initiated");
  globalSlideState
    .select((context) => context.state)
    .subscribe((state) => {
      if (state === 13) {
        activate = true;
        let bottomOutputCanvas = document.getElementById("bottomOutputCanvas");
        bottomOutputCanvas.style.zIndex = 1;
        console.log("bottom:", bottomOutputCanvas);
        console.log("Activating Handtracking....");
        // emitCustomEvent('notification-event', 'Gesture Start')
      }
    });

  useCustomEventListener("gesture-recognition-event", (data) => {
    activate = !activate;
    activate
      ? emitCustomEvent("notification-event", "Gesture Activated")
      : emitCustomEvent("notification-event", "Gesture De-Activated");
    if (!activate) {
      activate = false;
      let bottomOutputCanvas = document.getElementById("bottomOutputCanvas");
      bottomOutputCanvas.style.zIndex = 0;
      let bottomOutputCanvasCtx = bottomOutputCanvas.getContext("2d");
      bottomOutputCanvasCtx.clearRect(
        0,
        0,
        bottomOutputCanvas.width,
        bottomOutputCanvas.height
      );
    }
  });
  SwipeGesture();
  return <HandTracking />;
};
const HandTracking = () => {
  let videoElement = useRef();
  let outputCanvas = useRef();
  let bottomOutputCanvas = useRef();
  let outputCanvasCtx = null;
  let bottomOutputCanvasCtx = null;
  useEffect(() => {
    outputCanvasCtx = outputCanvas.current.getContext("2d");
    bottomOutputCanvasCtx = bottomOutputCanvas.current.getContext("2d");
  });

  function onResults(results) {
    outputCanvasCtx.save();
    // outputCanvasCtx.scale(-1,1)
    outputCanvasCtx.clearRect(
      0,
      0,
      outputCanvas.current.width,
      outputCanvas.current.height
    );
    // outputCanvasCtx.drawImage(
    //   results.image, 0, 0, outputCanvas.current.width, outputCanvas.current.height);
    // bottomOutputCanvasCtx.scale(-1,1)
    bottomOutputCanvasCtx.clearRect(
      0,
      0,
      bottomOutputCanvas.current.width,
      bottomOutputCanvas.current.height
    );
    // bottomOutputCanvasCtx.drawImage(
    //   results.image, 0, 0, bottomOutputCanvas.current.width, bottomOutputCanvas.current.height);
    let rhLandmarks = null;
    if (!activate) {
      return;
    }

    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        if (results["multiHandedness"][0].label == "Right") rhLandmarks = true;
        if (results["multiHandedness"][0].label == "Left") rhLandmarks = false;

        drawConnectors(bottomOutputCanvasCtx, landmarks, HAND_CONNECTIONS, {
          color: "rgba(233,224,212,1)",
          lineWidth: 10
        });
        drawLandmarks(bottomOutputCanvasCtx, landmarks, {
          color: "rgba(210,202,197,1)",
          lineWidth: 0.25
        });
        let fingerData = checkFingersGesture(
          !rhLandmarks,
          landmarks,
          outputCanvas.current.width,
          outputCanvas.current.height
        );
        CURRENT_GESTURE = fingerData[0];
        // Detecting FistOpenClosed Gesture
        let thirdFinger = false;
        let fourthFinger = false;
        let tempK;
        tempK = landmarks[14]["y"];
        if (landmarks[15]["y"] < tempK && landmarks[16]["y"] < tempK) {
          thirdFinger = true;
        }
        tempK = landmarks[18]["y"];
        if (landmarks[19]["y"] < tempK && landmarks[20]["y"] < tempK) {
          fourthFinger = true;
        }
        if (thirdFinger && fourthFinger) {
          // Recording Landmarks for detecting swipe
          CheckForPinch(
            landmarks,
            bottomOutputCanvas.current,
            bottomOutputCanvasCtx,
            handXAtFrame,
            handYAtFrame
          );
        }
        DetectFistOpenClosed(CURRENT_GESTURE, PREVIOUS_GESTURE);
        if (!pinched) {
          RecordLandmarksForSwipe(landmarks);
          // Detecting pinch gesture
        }
        PREVIOUS_GESTURE = CURRENT_GESTURE;
      }
    }
    outputCanvasCtx.restore();
    bottomOutputCanvasCtx.restore();
  }

  const hands = new Hands({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }
  });
  hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });
  hands.onResults(onResults);

  useEffect(() => {
    const camera = new Camera.Camera(videoElement.current, {
      onFrame: async () => {
        if (!activate) {
          return;
        }
        await hands.send({ image: videoElement.current });
      },
      width: 1280,
      height: 720
    });
    camera.start();
  });
  return (
    <div>
      <video
        id="videoTest"
        autoPlay={true}
        muted={true}
        ref={videoElement}
        hidden={true}
      />
      <canvas
        ref={outputCanvas}
        width="1280px"
        height="720px"
        hidden={true}
      ></canvas>
      <canvas
        id="bottomOutputCanvas"
        ref={bottomOutputCanvas}
        width="1280px"
        height="720px"
        style={{
          position: "absolute",
          top: "10rem",
          left: "20rem",
          zIndex: 0,
          transform: "rotateY(180deg)"
        }}
      ></canvas>
    </div>
  );
};

let checkFingersGesture = (isRight, landmarks, width, height) => {
  let thumb = false;
  let firstFinger = false;
  let secondFinger = false;
  let thirdFinger = false;
  let fourthFinger = false;

  let tempK;
  if (isRight) {
    tempK = 1 - landmarks[2]["x"];

    if (1 - landmarks[3]["x"] < tempK && 1 - landmarks[4]["x"] < tempK) {
      thumb = true;
    }
  } else {
    tempK = landmarks[2]["x"];

    if (landmarks[3]["x"] < tempK && landmarks[4]["x"] < tempK) {
      thumb = true;
    }
  }
  tempK = landmarks[6]["y"];
  if (landmarks[7]["y"] < tempK && landmarks[8]["y"] < tempK) {
    firstFinger = true;
  }

  tempK = landmarks[10]["y"];
  if (landmarks[11]["y"] < tempK && landmarks[12]["y"] < tempK) {
    secondFinger = true;
  }

  tempK = landmarks[14]["y"];
  if (landmarks[15]["y"] < tempK && landmarks[16]["y"] < tempK) {
    thirdFinger = true;
  }

  tempK = landmarks[18]["y"];
  if (landmarks[19]["y"] < tempK && landmarks[20]["y"] < tempK) {
    fourthFinger = true;
  }

  if (
    !thumb &&
    !firstFinger &&
    !secondFinger &&
    !thirdFinger &&
    !fourthFinger
  ) {
    CURRENT_GESTURE = FIST_CLOSED;
  } else {
    //

    if (thumb && firstFinger && secondFinger && thirdFinger && fourthFinger) {
      CURRENT_GESTURE = FIST_OPEN;
    } else if (
      !thumb &&
      firstFinger &&
      secondFinger &&
      thirdFinger &&
      fourthFinger
    ) {
      CURRENT_GESTURE = FOUR;
    } else if (
      !thumb &&
      firstFinger &&
      secondFinger &&
      thirdFinger &&
      !fourthFinger
    ) {
      CURRENT_GESTURE = THREE;
    } else if (
      !thumb &&
      firstFinger &&
      secondFinger &&
      !thirdFinger &&
      !fourthFinger
    ) {
      CURRENT_GESTURE = TWO;
    } else if (
      !thumb &&
      firstFinger &&
      !secondFinger &&
      !thirdFinger &&
      !fourthFinger
    ) {
      CURRENT_GESTURE = ONE;
    } else CURRENT_GESTURE = null;
  }

  handXAtFrame = ((landmarks[0].x + landmarks[9].x) * width) / 2;
  handYAtFrame = ((landmarks[0].y + landmarks[9].y) * height) / 2;
  //
  return [CURRENT_GESTURE, firstFinger];
};

export default Gesture;
