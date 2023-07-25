import parse from "html-react-parser";
import TextAndMedia from "../../layouts/TextAndMedia";
import Slide from "../../layouts/Slide";

const OttoCycleSlide = () => {
  const heading = ` <h1 className='text-center fw-bold'>Otto Cycle</h1>`;

  return (
    <Slide>
      <TextAndMedia
        heading={parse(heading)}
        // text={parse(html)}
        iframeLink="/otto.cycle/"
        media_type="iframe"
      ></TextAndMedia>
    </Slide>
  );
};

export default OttoCycleSlide;
