import parse from "html-react-parser";
import TextAndMedia from "../../layouts/TextAndMedia";
import Slide from "../../layouts/Slide";
const PistonSlide = () => {
  const heading = ` <h1 className='text-center fw-bold'>Piston</h1>`;
  const html = `
 <ul className="text-light  fs-5 text-start lh-sm ">
    <li className="mt-3">
     The piston acts as a movable tight seal to keep the gases inside the cylinder 
​</li>
    
  </ul>
`;

  return (
    <Slide>
      <TextAndMedia
        heading={parse(heading)}
        // text={parse(html)}
        iframeLink="/ciechanow.ski_ice_simple_assembly/internal-combustion-engine/index.html"
        media_type="iframe"
      ></TextAndMedia>
    </Slide>
  );
};

export default PistonSlide;
