import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Imageshow2 = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className=" pb-8 flex items-end justify-center w-80 aspect-square bg-green-600 rounded-full absolute -bottom-8 md:translate-x-1/2"
    >
      <Image
        className=" absolute w-[250px]"
        src={"/herogirl.png"}
        alt="heroboy"
        width={100}
        height={100}
      />
    </motion.div>
  );
};

export default Imageshow2;
