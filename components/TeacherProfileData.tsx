import React from "react";
import Container from "./Container";
import Image from "next/image";
import {
  UseFormClearErrors,
  UseFormRegister,
  FieldErrors,
  Control,
  Controller,
  UseFormWatch,
} from "react-hook-form";
import { IteacherOneOnOne } from "./TeacherOneOnOne";

export interface IteacherOneOnOneSub {
  register: UseFormRegister<IteacherOneOnOne>;
  errors: FieldErrors<IteacherOneOnOne>;
  watch: UseFormWatch<IteacherOneOnOne>;
  control?: Control<IteacherOneOnOne>;
  clearErrors: UseFormClearErrors<IteacherOneOnOne>;
}

const TeacherProfileData: React.FC<IteacherOneOnOneSub> = ({
  register,
  errors,
  watch,
  control,
  clearErrors,
}) => {
  watch("teacherImg");
  watch("aboutTeacher");
  return (
    <section>
      <Container>
        <div className="flex flex-col w-full md:w-[30vw]">
          <p className="font-bold text-[16px]">Edit Your Teachers Profile !</p>
          <div className="flex items-center gap-3 my-4">
            <Image
              src="/teacher1.png"
              width={100}
              height={100}
              className="rounded-full"
              alt="Teacher Picture"
            />
            <div>
              <span className="text-[16px] font-bold">David Olushola</span>
              <div className="flex items-center bg-[#FFFFFF] w-fit py-1 pl-2 my-2 rounded">
                <Image
                  src="/svgs/upload.svg"
                  width={15}
                  height={15}
                  alt="UplaodImage"
                />
                <div>
                  <label htmlFor="file-upload" className="cursor-pointer ml-2">
                    <span className="bg-transparent py-1 pr-2 text-[12px] font-medium">
                      Upload New Image
                    </span>
                  </label>
                  <input
                    type="file"
                    {...register("teacherImg")}
                    name="teacherImg"
                    id="file-upload"
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>
          <textarea
            rows={6}
            {...register("aboutTeacher")}
            className="p-4 outline-none w-full rounded-[10px]"
            placeholder="About Yourself as a tutor"
          ></textarea>
          {errors.aboutTeacher && (
            <small className="text-red-600">
              {errors.aboutTeacher.message}
            </small>
          )}
        </div>
      </Container>
    </section>
  );
};

export default TeacherProfileData;
