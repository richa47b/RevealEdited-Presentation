import React from "react";
import PropTypes from "prop-types";

const Slide = ({ background_url, children, transition = "fade" }) => (
  <section
    data-auto-animate
    style={{ pointerEvents: "all" }}
    data-background-image={"url(/app/Indexbackground.svg)"}
    data-transition={transition}
  >
    {console.log(background_url, "background_url")}
    {console.log(children, "children")}
    {children}
  </section>
);

Slide.propTypes = {
  children: PropTypes.node,
  transition: PropTypes.string
};

export default Slide;
