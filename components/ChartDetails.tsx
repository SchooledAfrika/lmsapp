import React from "react";

const ChartDetails = () => {
  return (
    <div>
      <div className="flex justify-between my-3">
        <div>
          <h3 className="text-lightGreen font-bold">70% - 100%</h3>
          <p className="">
            <span className="text-lightGreen font-semibold">15%</span> more than
            last month&apos;s average
          </p>
        </div>
        <div className="font-bold">
          <h3 className="">5 Students</h3>
          <p>Monthly average</p>
        </div>
      </div>

      <div className="flex justify-between my-3">
        <div>
          <h3 className="text-rose-400 font-bold">50% - 69%</h3>
          <p className="">
            <span className="text-lightGreen font-semibold">15%</span> more than
            last month&apos;s average
          </p>
        </div>
        <div className="font-bold">
          <h3 className="">7 Students</h3>
          <p>Monthly average</p>
        </div>
      </div>

      <div className="flex justify-between my-3">
        <div>
          <h3 className="text-dimYellow font-bold">40% - 49%</h3>
          <p className="">
            <span className="text-lightGreen font-semibold">15%</span> more than
            last month&apos;s average
          </p>
        </div>
        <div className="font-bold">
          <h3 className="">8 Students</h3>
          <p>Monthly average</p>
        </div>
      </div>

      <div className="flex justify-between my-3">
        <div>
          <h3 className="text-red-600 font-bold">0% - 39%</h3>
          <p className="">
            <span className="text-lightGreen font-semibold">15%</span> more than
            last month&apos;s average
          </p>
        </div>
        <div className="font-bold">
          <h3 className="">4 Students</h3>
          <p>Monthly average</p>
        </div>
      </div>
    </div>
  );
};

export default ChartDetails;
