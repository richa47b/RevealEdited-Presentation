import "./App.css";
import Presentation from "./Presentation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import SplashScreen from "./common/SplashScreen";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSplashScreenClick = () => {
    setIsLoaded(true);
  };
  return (
    <div className="App">
      {<SplashScreen onClick={handleSplashScreenClick} isLoaded={isLoaded} />}
      {isLoaded && (
        <BrowserRouter>
          <Routes>
            <Route path="/app" element={<Presentation />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
