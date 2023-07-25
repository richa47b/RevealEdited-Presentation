import React, { useEffect, useRef, useState } from "react";
import { Button, List, ListInlineItem } from "reactstrap";
import { emitCustomEvent, useCustomEventListener } from "react-custom-events";
import { globalContext } from "../../store/Constant";
import { StatesEnum } from "../../store/states";
import TransformControls from "./TransformControls";
import { ModelAnnotation } from "../Model3D/ModelAnnotation";

window.modelStateForDisAssemble = true;

const ToolBar = () => {
  const [showAnnotation, setShowAnnotation] = useState(false);
  const [isToggledForTransformControls, setisToggledForTransformControls] =
    useState(false);
  const [activeElement, setActiveElement] = useState("");
  const [moveRight, setMoveRight] = useState(false);
  const inputEls = useRef([]);
  const [nextIdx, setNextIdx] = useState(0);

  useCustomEventListener("transform-controls", (data) => {
    data == "start"
      ? setisToggledForTransformControls(true)
      : setisToggledForTransformControls(false);
  });
  useCustomEventListener("iframe-toggle", (data) => {
    if (data == "deselectIframe") {
      setActiveElement("");
      setisToggledForTransformControls(false);
      setShowAnnotation(false);
    }
  });
  useCustomEventListener("toolbarOptions", (data) => {
    if (data === "3Dmodel") {
      setMoveRight(true);
    } else {
      setMoveRight(false);
    }
    console.log(moveRight, "moveRight");
  });

  useCustomEventListener("ToolBarIncrement", (data) => {
    if (data == "left") {
      console.log(nextIdx, "nextIdxLEFT");
      setNextIdx(nextIdx - 1 <= 0 ? 0 : nextIdx - 1);
      inputEls.current[nextIdx].focus();
    } else if (data == "right" && moveRight) {
      console.log(nextIdx, "nextIdxRIGHT");
      setNextIdx(nextIdx + 1 >= 5 ? 0 : nextIdx + 1);
      inputEls.current[nextIdx].focus();
    }
  });

  useCustomEventListener("annotation-toolbar", () => {
    setShowAnnotation(!showAnnotation);
  });

  useCustomEventListener("getToolbarCommand", () => {
    switch (document.activeElement) {
      case inputEls.current[0]:
        emitCustomEvent("notification-event", "WhiteBoard Activated");
        emitCustomEvent("notification-event", "WhiteBoard Activated");
        break;
      case inputEls.current[1]:
        emitCustomEvent("whiteboard-event", "stop");
        break;
      case inputEls.current[2]:
        emitCustomEvent("disassemble-model", "reset");
        emitCustomEvent("notification-event", "Reset");
        window.modelStateForDisAssemble = true;
        break;
      case inputEls.current[3]:
        if (window.modelStateForDisAssemble == false) {
          emitCustomEvent("disassemble-model", "assemble");
          emitCustomEvent("notification-event", "Assemble Model");
          window.modelStateForDisAssemble = true;
          return;
        }
        emitCustomEvent("disassemble-model", "disassemble");
        emitCustomEvent("notification-event", " Disassemble Model");
        window.modelStateForDisAssemble = false;
        break;
      case inputEls.current[4]:
        setShowAnnotation(true);
        emitCustomEvent("annotation-toolbar", "show");
        emitCustomEvent("notification-event", "Annotation");
        break;
      default:
        break;
    }
  });

  useCustomEventListener("toolBarControls", () => {
    if (!inputEls.current.includes(activeElement)) {
      inputEls.current[2].focus();
    }
  });

  useEffect(() => {
    if (showAnnotation)
      globalContext.updateValue((context) => {
        context.state = StatesEnum.ANNOTATION;
      });
  }, [showAnnotation, isToggledForTransformControls]);

  function resetFocus() {
    setShowAnnotation(false);
    setisToggledForTransformControls(false);

    globalContext.updateValue((context) => {
      context.state = StatesEnum.TOOLBAR;
    });
  }

  const ToolsBarOptions = [
    {
      id: 1,
      className:
        activeElement === "whiteboard"
          ? "toolbar-list-selection"
          : "toolbar-list",
      Focus: () => {
        resetFocus();
        setActiveElement("whiteboard");
        setisToggledForTransformControls(false);
        emitCustomEvent("whiteboard-event", "start");
        emitCustomEvent("notification-event", "WhiteBoard Activated");
      },
      Click: () => {
        setActiveElement("whiteboard");
        emitCustomEvent("notification-event", "WhiteBoard Activated");
        emitCustomEvent("notification-event", "WhiteBoard Activated");
        setActiveElement("whiteboard");
      },
      imageSrc: "/app/Pencil.svg"
    },
    {
      id: 2,
      className:
        activeElement == "controls"
          ? "toolbar-list-selection"
          : "toolbar-list ",
      Focus: () => {
        resetFocus();
        globalContext.updateValue((context) => {
          context.state = StatesEnum.TRANSFORM_TOOLBAR;
        });
        setisToggledForTransformControls(true);
        emitCustomEvent("disassemble-model", "reset");
        emitCustomEvent("notification-event", "Reset");
        emitCustomEvent("whiteboard-event", "stop");
        emitCustomEvent("notification-event", "WhiteBoard Deactivate");
        window.modelStateForDisAssemble = true;
        setActiveElement("controls");
      },
      Click: () => {
        setActiveElement("controls");
        emitCustomEvent("whiteboard-event", "stop");
        emitCustomEvent("notification-event", "WhiteBoard Deactivate");
      },
      imageSrc: "/app/ModelControls.svg",
      imageClassName: "toolbar-icons"
    },
    {
      id: 3,
      className:
        activeElement === "reset"
          ? "toolbar-list toolbar-list-selection"
          : "toolbar-list ",
      Focus: () => {
        resetFocus();
        setisToggledForTransformControls(false);
        setActiveElement("reset");
      },
      Click: () => {
        emitCustomEvent("disassemble-model", "reset");
        emitCustomEvent("notification-event", "Reset");
        window.modelStateForDisAssemble = true;
        setActiveElement("reset");
      },
      imageSrc: "/app/ResetIcon.svg",
      imageClassName: "toolbar-icons"
    },
    {
      id: 4,
      className:
        activeElement === "disassemble"
          ? "toolbar-list toolbar-list-selection"
          : "toolbar-list ",
      Focus: () => {
        resetFocus();
        setisToggledForTransformControls(false);
        setActiveElement("disassemble");
      },
      Click: () => {
        if (window.modelStateForDisAssemble == false) {
          emitCustomEvent("disassemble-model", "assemble");
          emitCustomEvent("notification-event", "Assemble Model");
          window.modelStateForDisAssemble = true;
          return;
        }
        emitCustomEvent("disassemble-model", "disassemble");
        emitCustomEvent("notification-event", " Disassemble Model");
        window.modelStateForDisAssemble = false;
        setActiveElement("disassemble");
      },
      imageSrc: "/app/AssembleIcon.svg",
      imageClassName: "toolbar-icons"
    },
    {
      id: 5,
      className:
        activeElement === "text"
          ? "toolbar-list toolbar-list-selection"
          : "toolbar-list ",
      Focus: () => {
        resetFocus();
        setisToggledForTransformControls(false);
        setShowAnnotation(!showAnnotation);
        setActiveElement("text");
      },
      Click: () => {
        setShowAnnotation(true);
        emitCustomEvent("annotation-toolbar", "show");
        emitCustomEvent("notification-event", "Annotation");
        setActiveElement("text");
      },
      imageSrc: "/app/AnnotationIcon.svg",
      imageClassName: "toolbar-icons"
    }
  ];

  return (
    <>
      <div className="hoverable ">
        <List
          type="inline"
          className=" d-flex justify-content-between toolbar mb-0 p-3  "
          id="toolbarFocus"
          onClick={() => {
            setActiveElement("");
            setisToggledForTransformControls(false);
            setShowAnnotation(false);
            emitCustomEvent("machineEvent", "TOOLBARTOGGLE");
          }}
        >
          {ToolsBarOptions.map((item, index) => {
            return (
              <>
                <Button
                  ref={(el) => {
                    ToolsBarOptions.length > index
                      ? (inputEls.current[index] = el)
                      : (inputEls.current[index] = el);
                  }}
                  tabIndex={nextIdx}
                  className={item.className}
                  onFocus={item.Focus}
                  onClick={item.Click}
                >
                  <img
                    src={item.imageSrc}
                    alt=""
                    className="toolbar-icons"
                  ></img>
                </Button>
                {index === 0 && (
                  <span className="square border-end vertical-line"></span>
                )}
              </>
            );
          })}
        </List>
        {isToggledForTransformControls && <TransformControls />}
        {showAnnotation && <ModelAnnotation />}
      </div>
    </>
  );
};
export default ToolBar;
