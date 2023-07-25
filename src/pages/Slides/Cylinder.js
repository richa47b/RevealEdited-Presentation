import parse from "html-react-parser";
import TextAndMedia from "../../layouts/TextAndMedia";
import Slide from "../../layouts/Slide";

const CyclinderSlide = () => {
  const heading = ` <h1 className='text-center fw-bold '>Cylinder</h1>`;
  const html = `
 <ul className="text-light  fs-5 text-start lh-sm ">
    <li className="mt-3">
      The cylinder block houses crank, camshaft, piston and other engine parts. In water cooled engines, the cylinder block is provided with water jackets for the circulating cooling water. ​
​</li>
    
  </ul>
`;

  return (
    <Slide>
      <TextAndMedia
        heading={parse(heading)}
        // text={parse(html)}
        iframeLink="/ciechanow.ski_ice_simple_cylinder_cross/internal-combustion-engine/index.html"
        media_type="iframe"
      ></TextAndMedia>
    </Slide>
  );
};

export default CyclinderSlide;
