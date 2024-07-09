import Image from "next/image";
import React from "react";
import { ITeacherSub } from "./TeacherInfo";
import { ImCross } from "react-icons/im";

const TeacherResume: React.FC<ITeacherSub> = ({
  register,
  control,
  watch,
  errors,
  clearErrors,
  setValue,
  setResume,
  resume,
}) => {
  watch("resume");
  watch("details");
  // function to add resume
  const handleResumeAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (setValue) {
      setValue("resume", e.target.files);
    }
    const file = e.target.files[0];
    const blob = new Blob([file]);
    const fileUrl = URL.createObjectURL(e.target.files[0]);
    if (setResume) {
      setResume(fileUrl);
    }
    clearErrors("resume");
  };
  // this function will act to remove the selected resume
  const handleRemove = () => {
    if (setResume) {
      setResume(undefined);
    }
    if (setValue) {
      setValue("resume", "");
    }
  };
  return (
    <div className="flex flex-col w-full md:w-[55%] gap-2">
      <label className="font-bold text-[18px]">Resume & Qualifications</label>
      {resume === undefined ? (
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
              id="file-upload"
              type="file"
              name="resume"
              className="hidden"
              accept=".pdf"
              onChange={handleResumeAdd}
            />
          </div>
        </div>
      ) : (
        <div className=" w-full h-[400px] relative">
          <iframe
            className=" w-full h-full"
            src={resume}
            id="doc-preview"
            width="600"
            height="500"
          />
          <div
            onClick={handleRemove}
            className=" cursor-pointer absolute top-0 right-0 w-[40px] h-[40px] bg-red-600 text-white  flex items-center justify-center"
          >
            <ImCross />
          </div>
        </div>
      )}
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
