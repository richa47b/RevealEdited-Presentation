import React from "react";
import { Container } from "reactstrap";
import Deck from "../../components/RevealComponents/Deck";
import Slides from "../Slides";
import Gesture from "../../components/Gesture";
// import "reveal.js/css/theme/beige.css";
import "../../styles/Black.css";
import "../../Themes/override.css";
import BottomBar from "../../components/BottomBar";
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
      <div className="mic">
        <BottomBar />
      </div>
      <div>
        <Gesture></Gesture>
      </div>
    </>
  );
};

export default App;
