import React from "react";

interface btnInterface {
  index: number;
  text: string;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  currentIndex: number;
}
const PricingBtn = ({ index, text, currentIndex, setIndex }: btnInterface) => {
  return (
    <div
      onClick={() => setIndex(index)}
      className={` text-[10px] px-6 py-1 cursor-pointer  ${
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
