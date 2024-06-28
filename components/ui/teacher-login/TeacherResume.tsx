import Image from "next/image";
import React from "react";
import { ITeacherSub } from "./TeacherInfo";

const TeacherResume: React.FC<ITeacherSub> = ({
  register,
  control,
  watch,
  errors,
  clearErrors,
}) => {
  watch("resume");
  watch("details");
  return (
    <div className="flex flex-col w-full md:w-[55%] gap-2">
      <label className="font-bold text-[18px]">Resume & Qualifications</label>
      <div
        className={`flex items-center ${
          errors.resume && " border border-red-600"
        } bg-[#FFFFFF] py-4 w-full pl-2 rounded`}
      >
        <Image
          src="/svgs/upload.svg"
          width={15}
          height={15}
          alt="UplaodImage"
        />
        <div>
          <label htmlFor="file-upload" className="cursor-pointer ml-2">
            <span className="bg-transparent py-1 pr-2 text-[12px] font-medium">
              Upload Resume
            </span>
          </label>
          <input
            {...register("resume")}
            id="file-upload"
            type="file"
            name="resume"
            className="hidden"
            accept="image/*"
          />
        </div>
      </div>
      <textarea
        {...register("details")}
        rows={7}
        cols={35}
        className="w-full p-2"
        placeholder="About Yourself as a tutor"
        name="details"
        onChange={() => clearErrors("details")}
      ></textarea>
      {errors.details && (
        <small className=" text-red-600">{errors.details.message}</small>
      )}
    </div>
  );
};

export default TeacherResume;
