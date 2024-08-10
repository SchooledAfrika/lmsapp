"use client";
import React, { useState, useEffect } from "react";
import { IJobSub } from "../JobDescription";

const JobResponsibility: React.FC<IJobSub> = ({
  getValues,
  setValue,
  errors,
}) => {
  const [responsibility, setResponsibility] = useState<string[]>(() => {
    const initialResponsibility = getValues("responsibility") as string[];
    return initialResponsibility ?? [{ responsibility: [""] }];
  });
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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
    setCurrentIndex((index) => index + 1);
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
    <section className="my-[80px] md:my-6  ">
      <div className="md:pl-[100px] w-full">
        <label className="font-bold text-[18px]">Job Responsibilities</label>
        {responsibility.map((responsibility, rIndex) => (
          <label key={rIndex} className="flex items-center gap-3">
            <input
              type="text"
              name="text"
              value={responsibility}
              placeholder={`Responsibility ${rIndex + 1}`}
              onChange={(e) => handleResponsibilityChange(rIndex, e)}
              className="my-2 p-4 text-[12px] rounded-md outline-none w-full md:w-[500px] bg-[#fff]"
            />
          </label>
        ))}

        <div className=" w-full flex items-center justify-between ">
          <button
            type="button"
            onClick={handleAddedResponsibility}
            className="font-bold text-[12px] hover:bg-green-200 rounded px-2 py-3 transform ease-in-out duration-500 transition-all"
          >
            Add More Responsibilities +
          </button>
        </div>

        {errors.responsibility && (
          <small className=" text-red-600">
            please enter job Responsibilities
          </small>
        )}
      </div>
    </section>
  );
};

export default JobResponsibility;
