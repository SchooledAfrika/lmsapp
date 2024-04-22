"use client";
import React, { useState, useEffect } from "react";
import Imageshow1 from "./Imageshow1";
import Image from "next/image";
import { motion } from "framer-motion";
import Imageshow2 from "./Imageshow2";
import Imageshow3 from "./ImageShow3";

const HeroRight = () => {
  // this state watches the image that is in the slide
  const [img, setimg] = useState<number>(1);
  //   useeffect to update the state
  useEffect(() => {
    const setTimer = setInterval(() => {
      setimg((prevImg) => (prevImg === 3 ? 1 : prevImg + 1));
    }, 6000);
    return () => clearInterval(setTimer);
  }, []);
  return (
    <div className=" hidden md:block pl-20 lg:pl-0 flex-1 relative w-full h-full overflow-hidden ">
      <motion.div
        animate={{ translateY: [-10, 0, -10] }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
          repeatType: "loop",
        }}
        className=" hidden lg:block absolute w-12 aspect-square rounded-full  bottom-16 left-20 overflow-hidden"
      >
        <Image
          className=" w-full h-full object-cover"
          src={"/slide-1.jpg"}
          alt="slider1"
          width={200}
          height={200}
        />
      </motion.div>
      <motion.div
        animate={{ translateY: [-10, 0, -10] }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
          repeatType: "loop",
        }}
        className=" hidden lg:block  absolute w-12 aspect-square rounded-full  top-32 left-32 overflow-hidden"
      >
        <Image
          className=" w-full h-full object-cover"
          src={"/slide-2.jpg"}
          alt="slider2"
          width={200}
          height={200}
        />
      </motion.div>
      <motion.div
        animate={{ translateY: [-10, 0, -10] }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
          repeatType: "loop",
        }}
        className=" hidden lg:block  absolute w-12 aspect-square rounded-full  top-24 left-36 overflow-hidden"
      >
        <Image
          className=" w-full h-full object-cover"
          src={"/slide-3.jpg"}
          alt="slider2"
          width={200}
          height={200}
        />
      </motion.div>
      <motion.div
        animate={{ translateY: [-10, 0, -10] }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
          repeatType: "loop",
        }}
        className=" hidden lg:block  absolute w-12 aspect-square rounded-full  top-12 right-24 overflow-hidden"
      >
        <Image
          className=" w-full h-full object-cover"
          src={"/slide-4.jpg"}
          alt="slider2"
          width={200}
          height={200}
        />
      </motion.div>
      <motion.div
        animate={{ translateY: [-10, 0, -10] }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
          repeatType: "loop",
        }}
        className=" hidden lg:block  absolute w-12 aspect-square rounded-full  top-60 right-0 overflow-hidden"
      >
        <Image
          className=" w-full h-full object-cover"
          src={"/slide-5.jpg"}
          alt="slider2"
          width={200}
          height={200}
        />
      </motion.div>
      <motion.div
        animate={{ translateY: [-10, 0, -10] }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
          repeatType: "loop",
        }}
        className=" hidden lg:block  absolute w-12 aspect-square rounded-full  top-52 right-0 overflow-hidden"
      >
        <Image
          className=" w-full h-full object-cover"
          src={"/slide-6.jpg"}
          alt="slider2"
          width={200}
          height={200}
        />
      </motion.div>
      <motion.div
        animate={{ translateY: [-10, 0, -10] }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
          repeatType: "loop",
        }}
        className=" hidden lg:block  absolute w-12 aspect-square rounded-full bottom-16 right-0 overflow-hidden"
      >
        <Image
          className=" w-full h-full object-cover"
          src={"/slide-7.jpg"}
          alt="slider2"
          width={200}
          height={200}
        />
      </motion.div>
      {img === 1 ? <Imageshow1 /> : img === 2 ? <Imageshow2 /> : <Imageshow3 />}
    </div>
  );
};

export default HeroRight;
