import { List, ListInlineItem } from "reactstrap";
import { useRef, useState } from "react";
import { emitCustomEvent, useCustomEventListener } from "react-custom-events";

const TransformControls = () => {
  const InnerEls = useRef([]);
  const [innerNextIdx, setInnerNextIdx] = useState(0);
  const mode3DArray = ["ROTATE", "ZOOM", "PAN"];
  const [mode3D, setMode3D] = useState(-1);

  useCustomEventListener("innerToolBarControl", (data) => {
    let d = "";
    if (document.activeElement === InnerEls.current[0]) {
      switch (data) {
        case "left":
          d = "x-";
          break;
        case "right":
          d = "x+";
          break;
        case "up":
          d = "y-";
          break;
        case "down":
          d = "y+";
          break;
        default:
          break;
      }
      if (mode3D > -1) {
        d += ":" + mode3DArray[mode3D];
      } else {
        d += ":" + mode3DArray[0];
      }
    } else if (document.activeElement === InnerEls.current[1]) {
      switch (data) {
        case "up":
        case "left":
          d = "x+";
          break;
        case "right":
        case "down":
          d = "y-";
          break;
        default:
          break;
      }
      if (mode3D > -1) {
        d += ":" + mode3DArray[mode3D];
      } else {
        d += ":" + mode3DArray[1];
      }
    } else if (document.activeElement === InnerEls.current[2]) {
      switch (data) {
        case "left":
          d = "x-";
          break;
        case "right":
          d = "x+";
          break;
        case "up":
          d = "y-";
          break;
        case "down":
          d = "y+";
          break;
        default:
          break;
      }
      if (mode3D > -1) {
        d += ":" + mode3DArray[mode3D];
      } else {
        d += ":" + mode3DArray[2];
      }
    }
    emitCustomEvent("model-events", d);
    return;
  });

  const ToolsBarInner = [
    {
      id: 1,
      name: "rotate",
      Focus: () => {
        setMode3D(0);
      },
      Click: () => {
        setMode3D(0);
      },
      imageSrc: "/app/RotateIcon.svg"
    },
    {
      id: 2,
      name: "zoom",
      Focus: () => {
        setMode3D(1);
      },
      Click: () => {
        setMode3D(1);
      },
      imageSrc: "/app/SearchIcon.svg"
    },
    {
      id: 3,
      name: "pan",
      Focus: () => {
        setMode3D(2);
      },
      Click: () => {
        setMode3D(2);
      },
      imageSrc: "/app/HandIcon.svg"
    }
  ];

  useCustomEventListener("toolbar", (data) => {
    if (data == "upperkeyfortoolbar") {
      InnerEls.current[innerNextIdx].focus();
    }
  });

  useCustomEventListener("valueIncrement", (data) => {
    if (data == "add") {
      innerNextIdx < 2 ? setInnerNextIdx(innerNextIdx + 1) : setInnerNextIdx(0);
      InnerEls.current[innerNextIdx].focus();
    } else if (data == "subtract") {
      innerNextIdx < 0 ? setInnerNextIdx(0) : setInnerNextIdx(innerNextIdx - 1);
      InnerEls.current[innerNextIdx].focus();
    }
  });
  return (
    <>
      <List
        type="inline"
        className=" d-flex justify-content-between model-controls-div mb-0 p-2"
        id="inner-list"
        onClick={() => {
          emitCustomEvent("machineEvent", "TOOLBARTOGGLE");
        }}
      >
        {ToolsBarInner &&
          InnerEls &&
          ToolsBarInner.map((item, index) => (
            <>
              <ListInlineItem
                ref={(el) => {
                  ToolsBarInner.length > InnerEls.current.length &&
                    (InnerEls.current[index] = el);
                }}
                tabIndex={innerNextIdx}
                className={
                  document.activeElement === InnerEls.current[index]
                    ? " toolbar-list-selection "
                    : "model-controls-list"
                }
                onClick={item.Click}
              >
                <img src={item.imageSrc} alt="" className="toolbar-icons"></img>
              </ListInlineItem>
            </>
          ))}
      </List>
    </>
  );
};

export default TransformControls;
