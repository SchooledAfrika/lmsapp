import React from "react";

const TableStatus: React.FC<{ active: string; canceled: string }> = ({
  active,
  canceled,
}) => {
  return (
    <div className="flex items-center gap-2 font-bold">
      <div className="flex gap-1 items-center ">
        <input type="checkbox" className="accent-lightGreen text-white" />
        <p className=" text-[12px]">All Status</p>
      </div>
      <div className="flex gap-1 items-center ">
        <input type="checkbox" className="accent-lightGreen text-white" />
        <p className=" text-[12px]">{active}</p>
      </div>
      <div className="flex gap-1 items-center ">
        <input type="checkbox" className="accent-lightGreen text-white" />
        <p className=" text-[12px]">{canceled}</p>
      </div>
    </div>
  );
};

export default TableStatus;
