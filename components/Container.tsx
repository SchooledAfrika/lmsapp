import clsx from "clsx";
import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className={clsx("max-w-[1150px] mx-auto px-4")}>{children}</div>;
};

export default Container;
