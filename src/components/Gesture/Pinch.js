import React, { useEffect, useRef } from 'react'
import { emitCustomEvent } from 'react-custom-events';
import { CSSPlugin, gsap, Expo, TimelineMax, Linear } from "gsap";
//Variables for Pinch Mode


// Are the fingers pinched?
export let pinched = false;
// Have the fingers been released?
let released = false;
// Whether the finger/thumb are considered pinched
let pinchThresholdMet = false;

const _NONE = "NONE";
const _PINCH_UP = "PINCH_UP";
const _PINCH_DOWN = "PINCH_DOWN";
const _PINCH_MOVE = "_PINCH_MOVE";
let PINCH_STATE = _NONE;
let pinchX = 0;
let pinchY = 0;
let previousHandXAtFrame = -1
let previousHandYAtFrame = -1
gsap.registerPlugin(CSSPlugin);
let gsapWithCSSPinchX = gsap.registerPlugin(CSSPlugin) || gsap; // to protect from tree shaking
let tweenerRotateX = gsapWithCSSPinchX.core.Tween;

let tweenPinchX = {
    //tween is for interpolating values to ensure smooth movement of cursor
    rotateX: 0,
    positionList: [],
};

gsap.registerPlugin(CSSPlugin);
let gsapWithCSSPinchY = gsap.registerPlugin(CSSPlugin) || gsap; // to protect from tree shaking
let tweenerRotateY = gsapWithCSSPinchY.core.Tween;

let tweenPinchY = {
    //tween is for interpolating values to ensure smooth movement of cursor
    rotateY: 0,
    positionList: [],
};
/**
 * This Function check for pinch gesture 
 * @param {*} landmarks landmark stream from mediapipe
 * @param {*} canvasElement output canvas
 * @param {*} canvasCtx 2d context of output canvas
 * @param {*} handXAtFrame current frame hand x value 
 * @param {*} handYAtFrame current frame hand y value
 * @param {*} previousHandXAtFrame previous frame hand x value
 * @param {*} previousHandYAtFrame previous frame hand y value
 */
export const CheckForPinch = (landmarks, canvasElement, canvasCtx, handXAtFrame, handYAtFrame) => {
    // Detect if the thumb and indexFinger are pinched together
    const a =
        (landmarks[4].x - landmarks[8].x) *
        canvasElement.width;
    const b =
        (landmarks[4].y - landmarks[8].y) *
        canvasElement.height;
    const c = Math.sqrt(a * a + b * b);
    // console.log("pinch threeshold:",c);
    pinchThresholdMet = c < 50;

    if (pinchX === null)
        pinchX = 0;
    if (pinchY === null)
        pinchY = 0;

    // Simulate a mousemove (moving the block)
    if (pinched) {
        // console.log(c,"pinch");

        PINCH_STATE = _PINCH_MOVE;
        const diffX = handXAtFrame - previousHandXAtFrame;
        // doAction()
        let pinX = 0
        let pinY = 0
        if (Math.abs(diffX) > 3) {
            if (handXAtFrame < previousHandXAtFrame) {
                pinchX -= .3; //rotates rtl
                pinX = -1
                // 
            } else {
                pinchX += .3; //rotates ltr
                pinX = 1
                // 
            }
        }
        tweenerRotateX.to(tweenPinchX, 1, {
            rotateX: pinchX,
            overwrite: true,
            ease: Linear.easeNone,
            immediate: true,
        });
        const diffY = handYAtFrame - previousHandYAtFrame;
        // doAction()
        if (Math.abs(diffY) > 3) {
            if (handYAtFrame < previousHandYAtFrame) {
                pinchY -= .3; //rotates rtl
                pinY = -1
                // 
            } else {
                pinchY += .3; //rotates ltr
                pinY = 1
                // 
            }
        }
        tweenerRotateY.to(tweenPinchY, 1, {
            rotateY: pinchY,
            overwrite: true,
            ease: Linear.easeNone,
            immediate: true,
        });
        emitCustomEvent("pinch", { pinched: pinched, x: tweenPinchX.rotateX, y: tweenPinchY.rotateY });
        canvasCtx.beginPath();
        canvasCtx.arc(handXAtFrame, handYAtFrame, 10, 0, 2 * Math.PI, false);
        canvasCtx.lineWidth = 50;
        canvasCtx.strokeStyle = '#ff0000';
        canvasCtx.stroke();
        previousHandXAtFrame = handXAtFrame;
        previousHandYAtFrame = handYAtFrame;
    }
    // Simulate a mousedown (selecting a block)
    if (pinchThresholdMet && !pinched) {

        pinched = true;
        released = false;
        PINCH_STATE = _PINCH_DOWN;
        // timerForPinchStart.start();
    }
    if (!pinchThresholdMet && !released) {

        pinched = false;
        released = true;
        // timerForPinchStop.start();
        PINCH_STATE = _PINCH_UP;
        // console.log("Pinch Off");
        pinchX = tweenPinchX.rotateX 
        tweenerRotateX.to(tweenPinchX, 1, {
            rotateX: pinchX,
            overwrite: true,
            ease: Linear.easeNone,
            immediate: true,
        });
        pinchY = tweenPinchY.rotateY 
        tweenerRotateX.to(tweenPinchY, 1, {
            rotateY: pinchY,
            overwrite: true,
            ease: Linear.easeNone,
            immediate: true,
        });

    }

}

export const checkInitialPichGesture = (landmarks) => {
    let thirdFinger = false
    let fourthFinger = false
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
        return true
    }
    else {
        return false
    }
}