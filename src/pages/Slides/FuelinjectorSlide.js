import parse from "html-react-parser";
import TextAndMedia from "../../layouts/TextAndMedia";
import Slide from "../../layouts/Slide";
const FuelinjectorSlide = () => {
  const heading = ` <h1 className='text-center fw-bold'>Fuel Injector</h1>`;
  const html = `
 <ul className="text-light  fs-5 text-start lh-sm ">
    <li className="mt-3">
It sprays the fuel into combustion chamber at the end of compression stroke.​</li>
    
  </ul>
`;

  return (
    <Slide>
      <TextAndMedia
        heading={parse(heading)}
        // text={parse(html)}
        iframeLink="/ciechanow.ski_ice_injector/internal-combustion-engine/index.html"
        media_type="iframe"
      ></TextAndMedia>
    </Slide>
  );
};

export default FuelinjectorSlide;
