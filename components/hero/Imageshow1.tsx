import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Imageshow1 = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
      className=" pb-8 flex items-end justify-center w-80 aspect-square bg-[tomato] rounded-full absolute -bottom-8  lg:translate-x-1/2"
    >
      <motion.div
        initial={{ translateY: -100, translateX: -100 }}
        animate={{ translateY: 0, translateX: 0 }}
        transition={{ duration: 1, type: "spring" }}
        className="absolute"
      >
        <Image
          className=" w-[250px]"
          src={"/heroboy.png"}
          alt="heroboy"
          width={100}
          height={100}
        />
      </motion.div>
    </motion.div>
  );
};

export default Imageshow1;
