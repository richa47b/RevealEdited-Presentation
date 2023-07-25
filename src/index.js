import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import CustomCursor from "./common/CustomCursor";
import WhiteBoard from "./common/Whiteboard";
import InputMapper from "./common/InputMapper";

import App from "./App";

ReactDOM.render(
  <>
    <CustomCursor></CustomCursor>
    <WhiteBoard />
    <InputMapper>
      <App />
    </InputMapper>
  </>,
  document.getElementById("root")
);
