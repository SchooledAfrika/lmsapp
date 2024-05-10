import React from "react";
import { eachPrice } from "@/constants/pricing/school";
import { pricingChange } from "./ui/Pricing-layout";

const EachPricing = ({
  plan,
  multiple,
}: {
  plan: eachPrice;
  multiple: pricingChange;
}) => {
  return (
    <div
      className={` shadow ${
        plan.amt === 0 &&
        " bg-gradient-to-br from-green-600 to-slate-800 text-white"
      }  px-3 flex flex-col gap-4  py-6 rounded-md border transform group hover:bg-gradient-to-br hover:from-green-600 hover:to-slate-800 hover:text-white transition-all ease-in-out duration-300`}
    >
      <div>
        <p className=" text-[12px]">{plan.planName}</p>
        <p className="text-[14px]">
          <span className="font-bold">${plan.amt * multiple.priceAmt}</span>
          {plan.amt === 0 && <span className=" font-bold">(free)</span>}
          {`/per ${multiple.duration}`}
        </p>
      </div>
      <div>
        <div
          className={` font-bold text-[12px] w-full rounded-md cursor-pointer flex items-center justify-center group-hover:bg-white group-hover:text-black ${
            plan.amt === 0 ? "bg-white text-black" : "bg-green-600 text-white"
          }  py-2`}
        >
          {plan.amt === 0 ? <p>Current</p> : <p>Upgrade</p>}
        </div>
      </div>
      <div>
        <ul className=" text-[12px] flex flex-col gap-1 list-disc">
          {plan.details.map((item, index) => (
            <li className=" list-inside" key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EachPricing;
