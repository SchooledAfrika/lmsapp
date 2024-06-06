import React from "react";

const ChartDetails = () => {
  return (
    <div className="px-2 font-subtext">
      <div className="flex justify-between my-3">
        <div>
          <h3 className="text-lightGreen text-[15px] font-bold">70% - 100%</h3>
          <p className="text-[13px]">
            <span className="text-lightGreen font-semibold">15%</span> more than
            last month&apos;s average
          </p>
        </div>
        <div className="">
          <h3 className="font-bold text-[14px]">5 Students</h3>
          <p className="text-[13px]">Monthly average</p>
        </div>
      </div>

      <div className="flex justify-between my-3">
        <div>
          <h3 className="text-rose-400 text-[15px] font-bold">50% - 69%</h3>
          <p className="text-[13px]">
            <span className="text-lightGreen font-semibold">15%</span> more than
            last month&apos;s average
          </p>
        </div>
        <div className="">
          <h3 className="font-bold text-[14px]">7 Students</h3>
          <p className="text-[13px]">Monthly average</p>
        </div>
      </div>

      <div className="flex justify-between my-3">
        <div>
          <h3 className="text-dimYellow text-[15px] font-bold">40% - 49%</h3>
          <p className="text-[13px]">
            <span className="text-lightGreen font-semibold">15%</span> more than
            last month&apos;s average
          </p>
        </div>
        <div className="">
          <h3 className="font-bold text-[14px]">8 Students</h3>
          <p className="text-[13px]">Monthly average</p>
        </div>
      </div>

      <div className="flex justify-between my-3">
        <div>
          <h3 className="text-red-600 text-[15px] font-bold">0% - 39%</h3>
          <p className="text-[13px]">
            <span className="text-lightGreen font-semibold">15%</span> more than
            last month&apos;s average
          </p>
        </div>
        <div className="">
          <h3 className="font-bold text-[14px]">4 Students</h3>
          <p className="text-[13px]">Monthly average</p>
        </div>
      </div>
    </div>
  );
};

export default ChartDetails;
