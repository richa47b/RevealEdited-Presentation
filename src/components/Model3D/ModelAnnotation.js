import React, { useEffect, useState } from "react";
import { useCustomEventListener } from "react-custom-events";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Button } from "reactstrap";

export const ModelAnnotation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = document.getElementsByClassName("view3d-annotation-tooltip");

  useEffect(() => {
    items[currentIndex].click();
  }, [currentIndex, items]);

  let annotationArray = new Array();
  for (let i = 0; i < items.length; i++) {
    annotationArray.push(items[i].innerHTML);
  }

  const icons = [
    <GrPrevious className="btn-annotation-icons me-5" color="white" />,
    <GrNext className="btn-annotation-icons ms-5 " color="white" />
  ];

  const handleClick = (direction) => {
    if (direction === "previous") {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else {
        setCurrentIndex(items.length - 1);
      }
    } else {
      if (currentIndex < items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    }
  };

  useCustomEventListener("model-events-annotation", (data) => {
    if (data == "next") handleClick("next");
    if (data == "previous") handleClick("previous");
  });
  return (
    <div className="annotation-div" id={"somethingSomethingDiv"}>
      <Button className="btn-annotation ">
        <div className="current-index-outer">
          <svg height="34" width="34">
            <circle
              cx="17"
              cy="17"
              r="16"
              stroke="white"
              strokeWidth="2"
              fill="#bc264b"
            />
            <text
              x="12"
              y="22"
              fill="#EDEDED"
              fontSize={17}
              fontFamily="monospace"
              className="annotation-svg-circle"
            >
              {currentIndex + 1}
            </text>
          </svg>
        </div>
        <div className="vl"></div>
        {currentIndex >= 0 ? (
          <span onClick={() => handleClick("previous")}>{icons[0]}</span>
        ) : null}

        <span onClick={() => currentIndex - 1} className="annotations-text">
          {annotationArray[currentIndex]}
        </span>
        <span onClick={() => handleClick("next")}>{icons[1]}</span>
      </Button>
    </div>
  );
};
