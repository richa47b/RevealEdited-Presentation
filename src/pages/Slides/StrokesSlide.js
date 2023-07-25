import parse from "html-react-parser";
import TextAndMedia from "../../layouts/TextAndMedia";
import Slide from "../../layouts/Slide";
const StrokesSlide = () => {
  const heading = ` <h1 className='text-center fw-bold '>Strokes</h1>`;

  return (
    <Slide>
      <TextAndMedia
        heading={parse(heading)}
        // text={parse(html)}
        iframeLink="/ciechanow.ski_ice_valve_timing_slider/internal-combustion-engine/index.html"
        media_type="iframe"
      ></TextAndMedia>
    </Slide>
  );
};

export default StrokesSlide;
