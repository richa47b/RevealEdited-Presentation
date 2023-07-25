import parse from "html-react-parser";
import TextAndMedia from "../../layouts/TextAndMedia";
import Slide from "../../layouts/Slide";

const heading = `<h1 className=' fw-bold text-center mb-5' >Selection Sort​</h1>`;

const SelectionSortSlide = () => {
  return (
    <Slide>
      <TextAndMedia
        heading={parse(heading)}
        iframeLink="/bublesort/"
        media_type="iframe"
      ></TextAndMedia>
    </Slide>
  );
};

export default SelectionSortSlide;
