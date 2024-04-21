"use client";
import React from "react";
import { createContext, ReactElement, useContext } from "react";
import { motion, useReducedMotion } from "framer-motion";
const FadeInStaggerContext = createContext(false);

const viewport = { once: true, margin: "0px 0px -200px" };

interface Props {
  children: React.ReactNode;
  faster?: boolean;
}

const FadeIn = ({children}:Props) => {
  const shouldReduceMotion = useReducedMotion();
  const isInStaggerGroup = useContext(FadeInStaggerContext);
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      {...(isInStaggerGroup
        ? {}
        : {
            initial: "hidden",
            whileInView: "visible",
            viewport,
          })}
      
    >
      {children}
    </motion.div>
  );
};

export const FadeInStagger = ({ faster = false, children }:Props) => {
  return (
    <FadeInStaggerContext.Provider value={true}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        transition={{ staggerChildren: faster ? 0.12 : 0.2 }}
        
      >
        {children}
      </motion.div>
    </FadeInStaggerContext.Provider>
  );
};

export default FadeIn;