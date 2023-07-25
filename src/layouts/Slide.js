import React from "react";
import PropTypes from "prop-types";
const Slide = ({ children, transition = "fade", background_url }) => (
  <section
    data-auto-animate
    style={{ pointerEvents: "all" }}
    data-background-image={background_url}
    data-transition={transition}
  >
    {children}
  </section>
);

Slide.propTypes = {
  children: PropTypes.node,
  transition: PropTypes.string
};

export default Slide;
