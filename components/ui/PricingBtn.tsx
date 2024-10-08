import React from "react";
import { pricingChange } from "./Pricing-layout";

interface btnInterface {
  index: number;
  text: string;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  currentIndex: number;
  multipleValue: number;
  duration: string;
}
const PricingBtn = ({
  index,
  text,
  currentIndex,
  setIndex,
  multipleValue,
  duration,
}: btnInterface) => {
  return (
    <div
      onClick={() => {
        setIndex(index);
      }}
      className={` md:text-[10px] px-3 text-[8px]   md:px-6 py-1 cursor-pointer  ${
        currentIndex == index
          ? "bg-green-600 text-white"
          : "bg-transparent text-black font-bold hover:bg-green-600 hover:text-white"
      } rounded-md tranform ease-in-out duration-200`}
    >
      <p>{text}</p>
    </div>
  );
};

export default PricingBtn;
