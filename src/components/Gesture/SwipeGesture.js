import { LoadLandmarksFromCsv } from "./CSVHelper.js";
import { DynamicTimeWarping } from "./dtw.js";
import { TaskTimer } from "tasktimer";
import Reveal from "reveal.js";

export let isRecording = false;
let recordedLandMarks = [];
let referenceLandmarks = {};
let previousXForVelocity = 0;
let startTimeForVelocity = 0;
let endTimeForVelocity = 0;
let velocity = 0;

export const SwipeGesture = () => {
  // Loading Reference Landmark From CSV Files
  referenceLandmarks = LoadLandmarksFromCsv();
  // Checking For events like recording key is pressed or released
};

/**
 * This function is used for checking whether a swipe is happen based on dtw distance
 * @param {referenceLandmarks} referenceLandmarks This are the reference landmarks from the video
 */
const CheckForSwipeDtw = (referenceLandmarks) => {
  // Computing DTW distance between recorded and reference landmarks
  let distances = ComputeDtwDistance(referenceLandmarks, recordedLandMarks);
  // Just For Seeing if we are doing left swipe then distances from
  // the left swipe videos should be smaller than right swipe videos
  //   console.log(sorted);
  for (const keys in distances) {
    // Checking Whether the distances are in the range
    if (distances[keys] > 1.5 && distances[keys] < 7) {
      // Checking Swipe DIrection
      let swipeDirection = CheckSwipeDirection(
        recordedLandMarks,
        recordedLandMarks.length
      );
      if (swipeDirection !== "None") {
        if (swipeDirection == "SwipeLeft") {
          Reveal.next();
        }
        if (swipeDirection == "SwipeRight") {
          Reveal.prev();
        }
        //   console.log(swipeDirection);
      }
      break;
    }
  }
};

const CheckSwipeDirection = (landmarks, landmarksLen) => {
  let direction = "None";
  let swipeLeftCount = 0;
  let swipeRightCount = 0;
  let swipeLeft = "SwipeLeft";
  let swipeRight = "SwipeRight";
  //   console.log(landmarksLen)
  // Checking Whether the frames are enough or not
  if (landmarksLen >= 7) {
    let movedDistance = Math.abs(
      landmarks[0] - landmarks[landmarksLen - 1]
    ).toFixed(2);
    // console.log(movedDistance)
    // Calculating whether hand movement distance is greater then threeshold value
    if (movedDistance > 0.02)
      direction =
        landmarks[0] < landmarks[landmarksLen - 1] ? swipeLeft : swipeRight;
  }
  return direction;
};
/**
 * Finding the mid of palm
 * @param {landmarks} landmarks landmarks stream from mediapipe
 * @returns
 */
const MidLandMark = (landmarks) => {
  let sum = landmarks[0].x + landmarks[5].x + landmarks[17].x;
  let count = 3;
  let midLandmark = (sum / count).toFixed(2);
  //   console.log(midLandmark);
  return midLandmark;
};
/**
 * Computing Dtw Distance
 * @param {*} refLandmarks  Reference Landmarks From the video
 * @param {*} recordedLandMarks Recorded Landmarks for the webcam
 * @returns
 */
const ComputeDtwDistance = (refLandmarks, recordedLandMarks) => {
  let distance = {};
  const distFunc = (a, b) => Math.abs(a - b);
  for (const keys in refLandmarks) {
    const dtw = new DynamicTimeWarping(
      refLandmarks[keys],
      recordedLandMarks,
      distFunc
    );
    const dist = dtw.getDistance();
    distance[keys] = dist;
  }
  return distance;
};

const calculateVelocity = (landmarks) => {
  startTimeForVelocity = new Date().getTime();
  let x_center = (landmarks[0].x + landmarks[9].x * 1280) / 2;
  velocity = Math.abs(
    (previousXForVelocity - x_center) /
      (endTimeForVelocity - startTimeForVelocity)
  );
  // console.log(velocity)
  previousXForVelocity = x_center;
  endTimeForVelocity = startTimeForVelocity;
};
/**
 * This function record landmarks or push the landmarks in recorded landmarks array while recording is on
 * @param {landmarks} landmarks landmarks stream from mediapipe
 */
export const RecordLandmarksForSwipe = (landmarks) => {
  velocity = 0;
  calculateVelocity(landmarks);
  if (velocity > 0.5 && isRecording == false) {
    isRecording = true;
    timerForSwipeRecording.start();
  }
  if (isRecording) {
    recordedLandMarks.push(MidLandMark(landmarks));
  }
};

let timerForSwipeRecording = new TaskTimer(100);
timerForSwipeRecording.on("tick", () => {
  if (timerForSwipeRecording.tickCount > 8) {
    CheckForSwipeDtw(referenceLandmarks);
    recordedLandMarks = [];
    isRecording = false;
    timerForSwipeRecording.stop();
  }
});
