import clsx from "clsx";
import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const Container = ({ children, className, ...props }: Props) => {
  return (
    <div className={clsx("max-w-[1150px] mx-auto px-4", className)} {...props}>
      {children}
    </div>
  );
};

export default Container;
