import parse from "html-react-parser";
import TextAndMedia from "../../layouts/TextAndMedia";
import Slide from "../../layouts/Slide";
const ICEngineIntro = () => {
  const heading = ` <h1 className='fw-bold text-center headingGlobal'>IC Engine</h1>`;
  const html = `
 <ul className="text-light  fs-5 text-start lh-sm ">
    <li className="mt-3">
      It is a machine which converts heat energy supplied to mechanical work
    </li>
    <li>The heat energy is supplied to the engine by burning the fuel.​</li>
  </ul>
`;

  return (
    <Slide>
      <TextAndMedia
        heading={parse(heading)}
        // text={parse(html)}
        iframeLink="/ciechanow.ski_ice_hero/internal-combustion-engine/index.html"
        media_type="iframe"
      ></TextAndMedia>
    </Slide>
  );
};

export default ICEngineIntro;
