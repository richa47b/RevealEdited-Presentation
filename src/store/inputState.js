import { createState } from "@state-designer/react";
import * as actions from "./actions";
import { backend_keywords } from "./Constant";

export const InputState = createState({
  /*params:
            id: name of the state
            data: everthing to modify
            initial: initial state of the app can be an object 
            states: the states which are managed 
                on: defines what the state can be changed to
                to: change state
                do: start the method
                repeat: set interval for running methods
                    onRepeat: set the methods which needs to be run
                    delay: time interval in seconds
            
            actions: all the methods that needs to be defined
            values: data manipulation
  */
  id: "InputState",
  data: {
    evtCounterForEnterButton: 0,
    toggleSpeech: 0,
    rotationIndex: "",
    key: "",
    inputEls: [],
    currentTab: 0,
    backendKeywordsLength: backend_keywords.value.state.length
  },
  initial: "slide",
  onEnter: ["notificationEvent"],
  states: {
    slide: {
      onEnter: () => {
        console.log("state--slide");
      },
      on: {
        MISC_MENU: {
          do: "MenuOpen",
          to: "menu"
        },
        TOOLBARTOGGLE: {
          do: ["toolBarFocus"],
          to: "toolbar"
        },
        LEFTARROWKEY: { do: "regressArrow" },
        RIGHTARROWKEY: { do: "advanceArrow" },
        DETECTSEARCH: { do: "detectSearch" },
        SELECTIFRAME: { to: "iframe" }
      }
    },
    iframe: {
      onEnter: "selectIframe",
      on: {
        DETECTSEARCH: { do: "detectSearch" },
        MISC_MENU: {
          do: "MenuOpen",
          to: "menu"
        },
        TOOLBARTOGGLE: {
          do: ["deSelectIframe", "toolBarFocus"],
          to: "toolbar"
        },
        BACK: {
          do: "deSelectIframe",
          to: "slide"
        }
      }
    },
    toolbar: {
      onEnter: () => {
        console.log("state--toolbar");
      },
      on: {
        BACK: {
          do: "toolBarClose",
          to: "slide"
        },
        MISC_MENU: {
          do: ["MenuOpen"],
          to: ["menu"]
        },
        LEFTARROWKEY: { do: "ToolBarLeftKey" },
        RIGHTARROWKEY: { do: "ToolBarRightKey" },
        UPARROWKEY: { do: "selectInnerToolbar", to: "innerToolBar" },
        DETECTSEARCH: { do: "detectSearch" },
        OK: { do: "getToolbarCommand" }
      }
    },
    innerToolBar: {
      onEnter: () => {
        console.log("state--innerToolBar");
      },
      on: {
        SELECTIFRAME: { do: "innerToolBarNextKey", to: "innerToolBar" },
        TOOLBARTOGGLE: { do: "innerToolBarNextKey", to: "innerToolBar" },
        MISC_MENU: {
          do: ["MenuOpen"],
          to: ["menu"]
        },
        BACK: { do: "toolbarControls", to: "toolbar" },
        LEFTARROWKEY: { do: "innerToolBarLeftKey" },
        RIGHTARROWKEY: { do: "innerToolBarRightKey" },
        UPARROWKEY: { do: "innerToolBarUpKey" },
        DOWNARROWKEY: { do: "innerToolBarDownKey", to: "toolbar" },
        DETECTSEARCH: { do: "detectSearch" }
      }
    },
    menu: {
      onEnter: () => {
        console.log("state--menu");
      },
      on: {
        MISC_MENU: {
          do: ["MenuClose"],
          to: ["slide"]
        },
        UPARROWKEY: { do: "SideBarUpKey" },
        DOWNARROWKEY: {
          do: "SideBarDownKey"
        },
        OK: {
          do: ["clickActiveElement", "menuEvent"],
          to: ["slide"]
        },
        DETECTSEARCH: { do: "detectSearch" }
      }
    }
  },

  actions // See actions folder
});
