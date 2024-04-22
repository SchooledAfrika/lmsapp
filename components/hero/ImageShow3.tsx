import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Imageshow3 = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className=" pb-8 flex items-end justify-center w-80 aspect-square  md:bg-dimYellow rounded-full absolute -bottom-8 md:translate-x-1/2"
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
          width={100}
          height={100}
        />
      </motion.div>
    </motion.div>
  );
};

export default Imageshow3;
