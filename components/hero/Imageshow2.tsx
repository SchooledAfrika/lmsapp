import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Imageshow2 = () => {
  return (
    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className=" pb-8 flex items-end justify-center md:w-80 w-2/3 aspect-square bg-green-600 rounded-full absolute md:-bottom-8 -bottom-16  lg:translate-x-1/2"
    >
      <Image
        className="absolute w-[320px]"
        src={"/herogirl2.png"}
        alt="heroboy"
        width={300}
        height={300}
      />
    </motion.div>
  );
};

export default Imageshow2;
