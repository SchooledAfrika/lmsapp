import Image from "next/image";
import React from "react";
import { ImCross } from "react-icons/im";

interface Ipreview {
  imageItem: string;
  handleRemove: () => void;
}

const PreviewItem: React.FC<Ipreview> = ({ imageItem, handleRemove }) => {
  return (
    <div className=" w-full h-[200px] relative">
      <Image
        className=" w-full h-full object-cover"
        src={imageItem}
        alt="profileImg"
        width={200}
        height={200}
      />
      <div
        onClick={handleRemove}
        className=" cursor-pointer absolute top-0 right-0 w-[40px] h-[40px] bg-red-600 text-white  flex items-center justify-center"
      >
        <ImCross />
      </div>
    </div>
  );
};

export default PreviewItem;
