import React from "react";
import IntroductionLayout from "../../layouts/IntroductionLayout";
import Slide from "../../layouts/Slide";
import IcPic from "../../assets/Images/ICEnginefirstslide.svg";

const IntroICEngineSlide = () => {
  return (
    <Slide>
      <IntroductionLayout
        src=""
        media_type="image"
        background_url={IcPic}
      ></IntroductionLayout>
    </Slide>
  );
};

export default IntroICEngineSlide;
