import { createGlobalstate } from "state-pool";
import { StatesEnum } from "./states";
import IntroductiontoICEngine from "../assets/Images/IntroductiontoICEngine.png";
import Cylinder from "../assets/Images/Cylinder.png";
import OttoCycle from "../assets/Images/OttoCycle.png";
import Piston from "../assets/Images/Piston.png";
import Valve from "../assets/Images/Valve.png";
import FuelInjector from "../assets/Images/FuelInjector.png";
import Strokes from "../assets/Images/Strokes.png";
import Model3D from "../assets/Images/3DModel.png";
import IntroDSA from "../assets/Images/IntroDSA.png";

import CardGame from "../assets/Images/CardGame.png";
import SortingSimulation from "../assets/Images/SortingSimulation.png";
export const globalContext = createGlobalstate({
  state: StatesEnum.NOT_DEFINED
});
export const globalSlideState = createGlobalstate({
  state: -1
});

export const globalCurrentTab = createGlobalstate({
  state: 0
});
export const globalCurrentTabToolBar = createGlobalstate({
  state: 0
});

export const globalCurrentRef = createGlobalstate({
  state: {}
});

export const globalCurrentTool = createGlobalstate({
  state: {}
});

export const threeDModel = createGlobalstate({
  state: false
});
export const backend_keywords = createGlobalstate({
  state: [
    // {
    //   id: 1,
    //   Heading: "Internal Combustion Engine​",
    //   Text: "",
    //   Media_description:
    //     "An internal combustion engine (ICE or IC engine) is a heat engine in which the combustion of a fuel occurs",
    //   src: IntroductiontoICEngine,
    // },
    {
      id: 2,
      Heading: "IC Engine",
      Text: "",
      Media_description: " internal combustion engine (ICE)",
      src: IntroductiontoICEngine
    },

    {
      id: 3,
      Heading: "Cylinder",
      Text: "Cylinder",
      Media_description: "Cylinder",
      src: Cylinder
    },

    {
      id: 4,
      Heading: "Fuel Injector",
      Text: "Fuel Injector",
      Media_description: "Fuel Injector",
      src: FuelInjector
    },

    {
      id: 5,
      Heading: "Valve",
      Text: "Valve",
      Media_description: "Valve",
      src: Valve
    },

    {
      id: 6,
      Heading: "Piston",
      Text: "Piston",
      Media_description: "Piston",
      src: Piston
    },
    {
      id: 7,
      Heading: "Strokes",
      Text: "Stroke",
      Media_description: "Stroke",
      src: Strokes
    },
    {
      id: 8,
      Heading: "Otto Cycle​",
      Text: "auto Cycle​",
      Media_description: "auto Cycle​",
      src: OttoCycle
    },

    {
      id: 9,
      Heading: "3d model of Ic Engine",
      Text: "3D Model",
      Media_description: "3d model of Ic Engine",
      src: Model3D
    },
    {
      id: 10,
      Heading: "Introduction to Algorithm",
      Text: "Introduction to Algorithm",
      Media_description: "Introduction",
      src: IntroDSA
    },
    {
      id: 11,
      Heading: "Sorting Game",
      Text: "Sorting Game",
      Media_description: "Sorting Game",
      src: CardGame
    },
    {
      id: 12,
      Heading: "Selection Sort",
      Text: "Selection Sort",
      Media_description: "Selection Sort",
      src: SortingSimulation
    }
  ]
});
