import React, { useRef, useState } from "react";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import FocusLock from "react-focus-lock";
import { backend_keywords } from "../../store/Constant";
import { useGlobalState } from "state-pool";
import { emitCustomEvent, useCustomEventListener } from "react-custom-events";
import Reveal from "reveal.js";

const SideBar = ({ isOpen, noRefCheck }) => {
  const [backend_keywordsList] = useGlobalState(backend_keywords);
  const [nextIdx, setNextIdx] = useState(0);
  const inputEls = useRef([]);

  useCustomEventListener("menuIncrement", (data) => {
    if (data === "add") {
      setNextIdx(nextIdx + 1 >= backend_keywordsList.length ? 0 : nextIdx + 1);
      inputEls.current[nextIdx].focus();
    } else if (data === "subtract") {
      setNextIdx(nextIdx - 1 <= 0 ? 0 : nextIdx - 1);
      inputEls.current[nextIdx].focus();
    }
  });

  return (
    <Offcanvas
      isOpen={isOpen}
      direction="start"
      style={{ width: "320px " }}
      className="sidebar-menu-background text-light"
    >
      <OffcanvasHeader
        toggle={() => {
          noRefCheck(false);
          emitCustomEvent("machineEvent", "MISC_MENU");
        }}
        className="text-light"
      ></OffcanvasHeader>
      <OffcanvasBody>
        <FocusLock>
          <h6 className="text-light mt-4">Index</h6>
          {backend_keywordsList &&
            inputEls &&
            backend_keywordsList?.state.map((item, index) => (
              <ul key={index} className="list-unstyle">
                <li
                  ref={(el) => {
                    backend_keywordsList.length > index
                      ? (inputEls.current[index] = el)
                      : (inputEls.current[index] = el);
                  }}
                  className="m-3 text-light cursor-pointer "
                  tabIndex={nextIdx}
                  onClick={() => {
                    Reveal.slide(item.id);
                  }}
                >
                  {item.Heading}
                </li>
              </ul>
            ))}
        </FocusLock>
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default SideBar;
