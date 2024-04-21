import clsx from "clsx";
import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode
}

const SectionContainer = ({ className, children }:Props) => {
  return (
    <div className={clsx("max-w-7xl mx-auto px-6 lg:px-8", className)}>
      <div className="max-w-2xl mx-auto lg:max-w-none">{children}</div>
    </div>
  );
};

export default SectionContainer;
