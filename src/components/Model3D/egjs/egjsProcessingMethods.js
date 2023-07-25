import {
  PostProcessingOutline,
  animate,
  setMesh,
  setRender
} from "./PostProcessing";
let annotationList;
let anim = false;
let scene;
let camera;
let renderer;
let currentSelectedIndex = -1;
window.currentSelectedIndex = currentSelectedIndex;

const SetDefaultPose = (action, view3DRef) => {
  if (action === "3.Assemble" || action === "1.Idle") {
    view3DRef.current.camera.defaultPose.pitch = 3.9375;
    view3DRef.current.camera.defaultPose.yaw = 24.25;
    view3DRef.current.camera.defaultPose.pivot.x = 1.6890270934655227e-7;
    view3DRef.current.camera.defaultPose.pivot.y = 0.24767144889937961;
    view3DRef.current.camera.defaultPose.pivot.z = 0.06445496684113944;
    view3DRef.current.camera.defaultPose.zoom = 16.56;
  }
  if (action === "2.DissAssemble") {
    view3DRef.current.camera.defaultPose.pitch = 20.25;
    view3DRef.current.camera.defaultPose.yaw = 22.25;
    view3DRef.current.camera.defaultPose.pivot.x = 1.6890270934655227e-7;
    view3DRef.current.camera.defaultPose.pivot.y = 0.24767144889937961;
    view3DRef.current.camera.defaultPose.pivot.z = 0.06445496684113944;
    view3DRef.current.camera.defaultPose.zoom = -24.0;
  }
};

function Init(view3DRef) {
  annotationList = view3DRef.current.annotation.list;
  scene = view3DRef.current.scene.root;
  camera = view3DRef.current.camera.threeCamera;
  renderer = view3DRef.current.renderer.threeRenderer;
  for (let index = 0; index < annotationList.length; index++) {
    view3DRef.current.annotation.list[index].element.style.width = "70px";
    view3DRef.current.annotation.list[index].element.style.height = "70px";
    view3DRef.current.annotation.list[index].element.style.fontSize = "45px";
    view3DRef.current.annotation.list[index].element.style.color =
      "rgb(192, 192, 192)";
    view3DRef.current.annotation.list[index].element.style.backgroundColor =
      "rgb(188, 38, 75)";
    view3DRef.current.annotation.list[index].element.addEventListener(
      "click",
      () => {
        MakeAnnotationHide(index, view3DRef);
        SelectObjectToHighlight(scene, camera, renderer, index, view3DRef);
      }
    );
  }
  HideAllAnnotations(view3DRef);
}
const SelectObjectToHighlight = (scene, camera, renderer, index, view3DRef) => {
  let obj =
    view3DRef.current.model.meshes[
      view3DRef.current.annotation.list[index].meshIndex
    ];
  setMesh([obj]);
  PostProcessingOutline(scene, camera, renderer);
  setRender(true);
};

function MakeAnnotationHide(showIndex, view3DRef) {
  currentSelectedIndex = showIndex;
  console.log(view3DRef, "view3DRef");
  let annotationList = view3DRef.current.annotation.list;
  for (let index = 0; index < annotationList.length; index++) {
    if (index !== showIndex) {
      view3DRef.current.annotation.list[index].element.style.visibility =
        "hidden";
    } else {
      view3DRef.current.annotation.list[index].element.style.visibility =
        "visible";
    }
  }
}

//to be exported
export async function checkmodelLoaded(view3DRef) {
  await view3DRef.current.init();
  Init(view3DRef);
  window.view3DRef = view3DRef.current;
}

//To be exported
export function ShowAllAnnotations(view3DRef) {
  console.log(view3DRef, "view3DRef");
  let annotationList = view3DRef.current.annotation.list;

  for (let index = 0; index < annotationList.length; index++) {
    view3DRef.current.annotation.list[index].element.style.visibility =
      "visible";
  }
}

export function HideAllAnnotations(view3DRef) {
  let annotationList = view3DRef.current.annotation.list;

  for (let index = 0; index < annotationList.length; index++) {
    view3DRef.current.annotation.list[index].element.style.visibility =
      "hidden";
    view3DRef.current.annotation.list[index].unfocus();
  }
}

//To be exported
export function cameraZoom(zoomValue, view3DRef) {
  if (zoomValue === "left" || zoomValue === "down") {
    view3DRef.current.camera.zoom += 1;
  }
  if (zoomValue === "up" || zoomValue === "right") {
    view3DRef.current.camera.zoom -= 1;
  }
  view3DRef.current.camera.updatePosition();
  view3DRef.current.renderer.renderSingleFrame();
}

//To be exported
export function rotatePointer(direction = "", sensitivity = 1, view3DRef) {
  if (view3DRef.current.annotation.list[currentSelectedIndex]) {
    view3DRef.current.annotation.list[currentSelectedIndex].unfocus();
  }
  if (direction === "left") {
    view3DRef.current.camera.yaw += 1 * sensitivity;
  }
  if (direction === "right") {
    view3DRef.current.camera.yaw -= 1 * sensitivity;
  }
  if (direction === "up") {
    view3DRef.current.camera.pitch += 1 * sensitivity;
  }
  if (direction === "down") {
    view3DRef.current.camera.pitch -= 1 * sensitivity;
  }
  view3DRef.current.camera.updatePosition();
  view3DRef.current.renderer.renderSingleFrame();
}
//to be exported
export function cameraPan(direction = "", sensitivity = 1, view3DRef) {
  if (direction === "left") {
    view3DRef.current.camera.newPose.pivot.x += 0.01 * sensitivity;
  }
  if (direction === "right") {
    view3DRef.current.camera.newPose.pivot.x -= 0.01 * sensitivity;
  }
  if (direction === "up") {
    view3DRef.current.camera.newPose.pivot.y += 0.01 * sensitivity;
  }
  if (direction === "down") {
    view3DRef.current.camera.newPose.pivot.y -= 0.01 * sensitivity;
  }

  view3DRef.current.camera.updatePosition();
  view3DRef.current.renderer.renderSingleFrame();
}

//to be exported
export const disassembleAnimation = (view3DRef) => {
  if (
    view3DRef.current.animator.activeAnimation.name === "3.Assemble" ||
    view3DRef.current.animator.activeAnimation.name === "1.Idle"
  ) {
    view3DRef.current.animator.play(1);
    anim = true;
    setRender(true);
  }
};

//to be exported
export const assembleAnimation = (view3DRef) => {
  if (view3DRef.current.animator.activeAnimation.name === "2.DissAssemble") {
    view3DRef.current.animator.play(2);
    anim = true;
    setMesh(null);
    setRender(false);
    HideAllAnnotations(view3DRef);
  }
};

/**
 * Reset Camera Position According to Default Pose
 * @param {*} hideAnnotations Hide Annotations Wnen this is true {default:true}
 * @param {*} duration Duration Taken By Camera to Reset the Position
 */
//to be exported
export const ResetCamera = (
  callAssemble = true,
  duration = 1200,
  view3DRef
) => {
  setMesh(null);
  setRender(false);
  if (callAssemble) {
    assembleAnimation();
    HideAllAnnotations(view3DRef);
  }
  view3DRef.current.camera.reset(duration);
};

//to be exported
export const OnAnimationFinished = (view3DRef) => {
  view3DRef.current.on("animationFinished", (evt) => {
    let action = evt.clip.name;
    if (evt.clip.name === "3.Assemble" || evt.clip.name === "1.Idle") {
      HideAllAnnotations(view3DRef);
      SetDefaultPose("3.Assemble", view3DRef);
      ResetCamera(false, view3DRef);
    }
    if (action === "2.DissAssemble") {
      ShowAllAnnotations(view3DRef);
      SetDefaultPose("2.DissAssemble", view3DRef);
      ResetCamera(false, view3DRef);
    }
    anim = false;
  });
  view3DRef.current.on("render", (evt) => {
    animate();
  });
};
