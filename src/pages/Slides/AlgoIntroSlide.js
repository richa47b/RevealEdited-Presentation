import IntroductionLayout from "../../layouts/IntroductionLayout";
import Slide from "../../layouts/Slide";
import AlgoIntroPic from "../../assets/Images/Algofirstslide.svg";

const AlgoIntroSlide = () => {
  return (
    <Slide>
      <IntroductionLayout
        src=""
        background_url={AlgoIntroPic}
      ></IntroductionLayout>
    </Slide>
  );
};

export default AlgoIntroSlide;
