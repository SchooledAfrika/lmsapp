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
  UseFormGetValues,
} from "react-hook-form";
import { IteacherOneOnOne } from "./TeacherOneOnOne";
import { useSession } from "next-auth/react";

export interface IteacherOneOnOneSub {
  register: UseFormRegister<IteacherOneOnOne>;
  errors: FieldErrors<IteacherOneOnOne>;
  watch: UseFormWatch<IteacherOneOnOne>;
  control?: Control<IteacherOneOnOne>;
  clearErrors: UseFormClearErrors<IteacherOneOnOne>;
  getValues: UseFormGetValues<IteacherOneOnOne>;
}

const TeacherProfileData: React.FC<IteacherOneOnOneSub> = ({
  register,
  errors,
  watch,
  control,
  clearErrors,
}) => {
  const { data } = useSession();
  watch("aboutTutor");
  return (
    <section>
      <div className="flex flex-col w-full md:w-[30vw]">
        <p className="font-bold text-[16px]">Edit Your Teachers Profile !</p>
        <div className="flex items-center gap-3 my-4">
          <Image
            src={data?.user.image!}
            width={200}
            height={200}
            className="rounded-full w-[100px] h-[100px] "
            alt="Teacher Picture"
          />
          <div>
            <span className="text-[16px] font-bold">David Olushola</span>
          </div>
        </div>
        <textarea
          rows={6}
          {...register("aboutTutor")}
          onChange={() => clearErrors("aboutTutor")}
          className="p-4 outline-none w-full rounded-[10px]"
          placeholder="About Yourself as a tutor"
          name="aboutTutor"
        ></textarea>
        {errors.aboutTutor && (
          <small className="text-red-600">{errors.aboutTutor.message}</small>
        )}
      </div>
    </section>
  );
};

export default TeacherProfileData;
