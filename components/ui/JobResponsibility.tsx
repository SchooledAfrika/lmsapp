"use client";
import React, { useState, useEffect } from "react";
import { IJobSub } from "../JobDescription";

const JobResponsibility: React.FC<IJobSub> = ({
  getValues,
  setValue,
  errors,
}) => {
  const [responsibility, setResponsibility] = useState<string[]>(() => {
    const initialResponsibility = getValues("responsibility");
    return initialResponsibility ?? [""];
  });

  useEffect(() => {
    const initialResponsibility = getValues("responsibility") as string[];
    if (initialResponsibility) {
      setResponsibility(initialResponsibility);
    }
  }, [getValues]);

  const handleAddedResponsibility = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const newResponsibility = [...responsibility, ""];
    setResponsibility(newResponsibility);
    setValue("responsibility", newResponsibility);
  };

  const handleResponsibilityChange = (
    rIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newResponsibility = [...responsibility];
    newResponsibility[rIndex] = event.target.value;
    setResponsibility(newResponsibility);
    setValue("responsibility", newResponsibility);
  };

  return (
    <section className="w-full md:w-2/3 flex flex-col gap-3">
      <label className="font-bold text-[18px]">Job Responsibilities</label>
      <div className=" flex flex-col gap-2">
        <div className=" flex flex-col gap-1">
          {responsibility.map((responsibility, rIndex) => (
            <label key={rIndex} className="flex items-center gap-3">
              <input
                type="text"
                name="text"
                value={responsibility}
                placeholder={`Responsibility ${rIndex + 1}`}
                onChange={(e) => handleResponsibilityChange(rIndex, e)}
                className=" p-4 text-[12px] rounded-md outline-none w-full md:w-[500px] bg-[#fff]"
              />
            </label>
          ))}
        </div>
        {errors.responsibility && (
          <small className=" text-red-600">
            please enter job Responsibilities
          </small>
        )}

        <div className=" w-full ">
          <button
            type="button"
            onClick={handleAddedResponsibility}
            className="font-bold text-[12px] hover:bg-green-200 rounded px-2 py-3 transform ease-in-out duration-500 transition-all"
          >
            Add More Responsibilities +
          </button>
        </div>
      </div>
    </section>
  );
};

export default JobResponsibility;
