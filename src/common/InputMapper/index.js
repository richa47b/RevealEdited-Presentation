import { useEffect, useState } from "react";
import KeyboardEventHandler from "@infinium/react-keyboard-event-handler";
import { useStateDesigner } from "@state-designer/react";
import { InputState } from "../../store/inputState";
import { useCustomEventListener } from "react-custom-events";
import Reveal from "reveal.js";

const InputMapper = (props) => {
  console.log(props, "props");
  const machine = useStateDesigner(InputState);
  let evtCounterForMenuButton = 0;
  const [selectIframe, setSelectIframe] = useState(false);
  const [currentFocus, setCurrentFocus] = useState(
    document.getElementsByTagName("body")[0]
  );
  useCustomEventListener("iframe-toggle", (data) => {
    console.log(data, "data");
    if (data === "selectIframe") {
      setSelectIframe(true);
    } else if (data === "deselectIframe") {
      setSelectIframe(false);
    }
  });

  useCustomEventListener("machineEvent", (data) => {
    switch (data) {
      case "MISC_MENU":
        machine.send("MISC_MENU");
        break;
      case "TOOLBARTOGGLE":
        machine.send("TOOLBARTOGGLE");
        break;
      case "UPARROWKEY":
        machine.send("UPARROWKEY");
        break;
      case "LEFTARROWKEY":
        machine.send("LEFTARROWKEY");
        break;
      case "RIGHTARROWKEY":
        machine.send("RIGHTARROWKEY");
        break;
      case "DOWNARROWKEY":
        machine.send("DOWNARROWKEY");
        break;
      case "OK":
        machine.send("OK");
        break;
      case "DETECTGESTURE":
        machine.send("DETECTGESTURE");
        break;
      case "BACK":
        machine.send("BACK");
        break;
      case "DETECTSEARCH":
        machine.send("BACK");
        break;
      default:
        console.log(data);
    }
  });
  const onKeyUpFrame = (e) => {
    switch (e.keyCode) {
      case 93: //80
        e.stopImmediatePropagation();
        e.preventDefault();
        if (evtCounterForMenuButton < 2) {
          console.log("TOOLBARTOGGLE");
          machine.send("TOOLBARTOGGLE");
          break;
        }
        evtCounterForMenuButton = 0;
        break;
    }
  };

  const onKeyUp = (key, e) => {
    // eslint-disable-next-line default-case
    switch (e.keyCode) {
      case 93: //80
        e.stopImmediatePropagation();
        e.preventDefault();
        if (evtCounterForMenuButton > 10) {
          console.log("MISC_MENU");
          machine.send("MISC_MENU");
        }
        if (!selectIframe) {
          if (evtCounterForMenuButton > 0 && evtCounterForMenuButton < 2) {
            console.log("SELECTIFRAME");
            machine.send("SELECTIFRAME");
          }
        }
        if (selectIframe) {
          if (evtCounterForMenuButton < 2) {
            console.log("TOOLBARTOGGLE");
            machine.send("TOOLBARTOGGLE");
            break;
          }
          break;
        }
        console.log(selectIframe, "selectIframe");
        evtCounterForMenuButton = 0;
        break;
      case 38:
        Reveal.removeKeyBinding("38");
        e.stopImmediatePropagation();
        e.preventDefault();
        console.log("UPARROWKEY");
        machine.send("UPARROWKEY");
        break;
      case 37:
        console.log("LEFTARROWKEY");
        machine.send("LEFTARROWKEY");
        break;
      case 40:
        Reveal.removeKeyBinding("40");
        e.stopImmediatePropagation();
        e.preventDefault();
        console.log("DOWNARROWKEY");
        machine.send("DOWNARROWKEY");
        break;
      case 39:
        console.log("RIGHTARROWKEY");
        machine.send("RIGHTARROWKEY");
        break;
      case 13:
        console.log("OK");
        machine.send("OK");
        break;
      case 32:
        console.log("DETECTGESTURE");
        machine.send("DETECTGESTURE");
        break;
      case 191: // 191 is the keycode of '/'
        console.log("DETECTSEARCH");
        machine.send("DETECTSEARCH");
        break;
      case 166: //8
        e.preventDefault();
        console.log("BACK");
        machine.send("BACK");
        break;
    }
  };

  const onKeyDown = (key, e) => {
    // eslint-disable-next-line default-case
    switch (e.keyCode) {
      case 93: //80
        e.preventDefault();
        evtCounterForMenuButton++;
        console.log(evtCounterForMenuButton, "evtCounterForMenuButton");
        break;
      case 27:
      case 166: //8
        e.preventDefault();
        console.log("BACK");
        machine.send("BACK");
        break;
      case 172:
        e.preventDefault();
        console.log("OPENSEARCHBAR");
        machine.send("OPENSEARCHBAR");
        break;
    }
  };

  window.document.addEventListener("tabFocusOut", handleTabFocusEvent, false);

  function handleTabFocusEvent() {
    document.getElementById("borderTogglediv").style.border = "";
    let navigationElement = document.getElementsByClassName("controls-arrow");
    for (var i = 0; i < navigationElement.length; i++) {
      navigationElement[i].style.visibility = "visible";
    }
  }
  useEffect(() => {
    if (selectIframe) {
      let rect = "";
      const allIframesArray = document.getElementsByTagName("iframe");
      console.log(allIframesArray, "allIframesArray");
      for (let i = 0; i < allIframesArray.length; i++) {
        rect = allIframesArray[i].getBoundingClientRect();
        console.log(rect, "rect of ----i", i);
        const visible = rect.top > 0 && rect.left > 0;
        console.log(visible, "visible");
        if (visible) {
          console.log(document.getElementsByTagName("iframe")[i]);
          setCurrentFocus(document.getElementsByTagName("iframe")[i]);
          document.getElementsByTagName("iframe")[i].focus();
          document
            .getElementsByTagName("iframe")
            [i].contentWindow.document.addEventListener(
              "keyup",
              onKeyUpFrame,
              true
            );
          break;
        }
      }
    } else {
      console.log(currentFocus);
      currentFocus.blur();
      setCurrentFocus(document.getElementsByTagName("body")[0]);
    }
  }, [selectIframe, currentFocus, onKeyUpFrame]);

  return (
    <>
      <KeyboardEventHandler
        handleKeys={["all"]}
        handleFocusableElements
        handleEventType={"keydown"}
        onKeyEvent={(key, e) => onKeyDown(key, e)}
      />
      <KeyboardEventHandler
        handleKeys={["all"]}
        handleFocusableElements
        handleEventType={"keyup"}
        onKeyEvent={(key, e) => onKeyUp(key, e)}
      />
      {props.children}
    </>
  );
};

export default InputMapper;
