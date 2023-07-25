import React from "react";
import Slide from "./Slide";

const SlideWithTitle = ({ title, children }) => (
  <Slide>
    <h3>{title}</h3>
    {children}
  </Slide>
);

export default SlideWithTitle;
