import parse from "html-react-parser";
import TextAndMedia from "../../layouts/TextAndMedia";
import Slide from "../../layouts/Slide";

const heading = `<h1 className=' fw-bold text-center mb-5'>Let's learn about Sorting​ </h1>`;

const AboutSortingSlide = () => {
  return (
    <Slide>
      <TextAndMedia
        heading={parse(heading)}
        iframeLink="/cards/"
        media_type="iframe"
      ></TextAndMedia>
    </Slide>
  );
};

export default AboutSortingSlide;
