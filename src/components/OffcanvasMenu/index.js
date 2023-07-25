import React, { useState } from "react";
import SideBar from "./SideBar";
import { emitCustomEvent, useCustomEventListener } from "react-custom-events";

const OffCanvasMenu = ({ skipToFunction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const noRefCheck = () => setIsOpen(!isOpen);

  useCustomEventListener("menu-event", (data) => {
    if (data === "open-menu") {
      setIsOpen(true);
    }
    if (data === "close-menu") {
      setIsOpen(false);
    }
  });

  return (
    <div className="hamburger-menu-div">
      <div
        className="hamburger-menu"
        onClick={() => {
          setIsOpen(!isOpen);
          emitCustomEvent("machineEvent", "MISC_MENU");
        }}
      >
        <img
          alt=""
          src="/app/HamBurgerIcon.svg"
          tabIndex={-1}
          className="position-absolute hamburger-icon"
        ></img>
        <SideBar
          isOpen={isOpen}
          noRefCheck={noRefCheck}
          skipToFunction={skipToFunction}
        />
      </div>
    </div>
  );
};

export default OffCanvasMenu;
