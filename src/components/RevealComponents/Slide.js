import React from "react";

const Slide = ({ children, transition = "fade" }) => (
  <section data-transition={transition}>{children}</section>
);

export default Slide;
