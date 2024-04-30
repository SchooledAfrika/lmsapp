import React from "react";
import Container from "./Container";
import HeroLeft from "./hero/HeroLeft";
import HeroRight from "./hero/HeroRight";

const Hero = () => {
  return (
    <Container>
      <div className=" w-full mt-16 h-[calc(100vh-2px)] md:h-[500px] lg:h-[calc(100vh-75px)]  flex md:flex-row justify-between  flex-col items-end  pb-16 gap-3">
        <HeroLeft />
        <HeroRight />
      </div>
    </Container>
  );
};

export default Hero;
