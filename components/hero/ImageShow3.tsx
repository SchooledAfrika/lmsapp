import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Imageshow3 = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className=" pb-8 flex items-end justify-center md:w-80 w-2/3 aspect-square  bg-dimYellow rounded-full absolute md:-bottom-8 -bottom-20  lg:translate-x-1/2"
    >
      <motion.div
        initial={{ translateY: 100 }}
        animate={{ translateY: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute"
      >
        <Image
          className=" w-[250px]"
          src={"/hero-4.png"}
          alt="heroboy"
          width={200}
          height={200}
        />
      </motion.div>
    </motion.div>
  );
};

export default Imageshow3;
