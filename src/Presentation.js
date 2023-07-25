import React from "react";
import Deck from "./components/RevealComponents/Deck";
import Slides from "./pages/Slides";
import DropdownItems from "./common/SearchInput";

// import './Themes/darcula.css';
import "reveal.js/css/theme/black.css";
import "./Themes/override.css";
import { Container } from "reactstrap";

const App = () => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "5px",

          zIndex: "1"
        }}
      >
        <img
          src="/app/ObsidianLogo.svg"
          alt=""
          style={{ width: "144px", height: "27px", marginTop: "8px" }}
        ></img>
      </div>
      <Container className="App position-relative" style={{ top: "2rem" }}>
        <Deck>{Slides}</Deck>
      </Container>
    </>
  );
};

export default App;
