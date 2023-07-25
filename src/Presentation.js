import React from "react";
import Deck from "./components/RevealComponents/Deck";
import Slides from "./pages/Slides";

// import './Themes/darcula.css';
import "reveal.js/css/theme/black.css";
import "./Themes/override.css";

const App = () => (
  <div className="App">
    <Deck>{Slides}</Deck>
  </div>
);

export default App;