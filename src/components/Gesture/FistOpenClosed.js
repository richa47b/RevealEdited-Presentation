import React, { useEffect, useRef } from 'react'
import { emitCustomEvent } from 'react-custom-events';
import { TaskTimer } from 'tasktimer'
let GESTURE_INITIATED_FIST;
let CURRENT_GESTURE_FIST;

let NO_GESTURE_COUNT = 0
const FIST_CLOSED = "FIST_CLOSED";
const FIST_OPEN = "FIST_OPEN";
const FIST_CLOSED_OPEN = "FIST_CLOSED_OPEN";
export const DetectFistOpenClosed = (CURRENT_GESTURE,PREVIOUS_GESTURE) => {
    
    CURRENT_GESTURE_FIST = CURRENT_GESTURE
    if (CURRENT_GESTURE_FIST === null) {
        if (timerForFistStatic.state === "stopped")
            detectNOGesture();
    } else if (CURRENT_GESTURE_FIST !== PREVIOUS_GESTURE) {
        timerForFistStatic.stop();
        detectStaticGesture();
    }
    
}

// Static Timer for open closed fist gesture inititation
let timerForFistStatic = new TaskTimer(100);
timerForFistStatic.on("tick", () => {
    if (timerForFistStatic.tickCount > 15) {
        //threshold for long gesture
        CURRENT_GESTURE_FIST = null
        timerForFistStatic.stop();
        return;
    }

    if (timerForFistStatic.tickCount > 2) {
        //threshold for small gesture

        if (CURRENT_GESTURE_FIST == FIST_CLOSED) {
            GESTURE_INITIATED_FIST = FIST_CLOSED;
            timerForDynamic.start();
        }
    }
});
// Dynamic Timer for open closed fist gesture detection
let timerForDynamic = new TaskTimer(100);
timerForDynamic.on("tick", () => {
    if (timerForDynamic.tickCount > 2) {
        // threshold for succedding gesture
        if (GESTURE_INITIATED_FIST == FIST_CLOSED) {
            if (CURRENT_GESTURE_FIST == FIST_OPEN) {
                emitCustomEvent("disassemble-model","disassemble");
                GESTURE_INITIATED_FIST = ""
                timerForDynamic.stop();
            }
            if (CURRENT_GESTURE_FIST == FIST_CLOSED) {
                emitCustomEvent("disassemble-model","assemble");
                GESTURE_INITIATED_FIST = ""
                timerForDynamic.stop();
            }
        }

    }
    //min and max window threshold
    if (
        timerForDynamic.tickCount > 3 &&
        timerForDynamic.tickCount < 6
    ) {
        timerForDynamic.stop();
    }
});

// Timer For No Gesture Detected
let timerForNO = new TaskTimer(100);

timerForNO.on("tick", () => {
    if (CURRENT_GESTURE_FIST == null) {
        NO_GESTURE_COUNT++;
    }
    if (NO_GESTURE_COUNT === 3) {
        timerForFistStatic.stop();
        NO_GESTURE_COUNT = 0;
    }
});

/***Starting static gesture and no gesture timers  */
let detectNOGesture = () => {
    timerForNO.start();
}
let detectStaticGesture = () => {
    timerForFistStatic.start();
}


