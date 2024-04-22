import React from "react";
import Container from "./Container";
import HeroLeft from "./hero/HeroLeft";
import HeroRight from "./hero/HeroRight";

const Hero = () => {
  return (
    <Container>
      <div className=" w-full h-[calc(100vh-75px)] md:h-[500px] lg:h-[calc(100vh-75px)]  flex items-end pb-16 gap-3">
        <HeroLeft />
        <HeroRight />
      </div>
    </Container>
  );
};

export default Hero;
