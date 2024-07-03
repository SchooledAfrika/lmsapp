import Image from "next/image";
import React from "react";
import {
  UseFormClearErrors,
  UseFormRegister,
  FieldErrors,
  Control,
  Controller,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import { Iteacher } from "@/components/TeacherAccount";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImCross } from "react-icons/im";

export interface ITeacherSub {
  register: UseFormRegister<Iteacher>;
  errors: FieldErrors<Iteacher>;
  control?: Control<Iteacher>;
  clearErrors: UseFormClearErrors<Iteacher>;
  watch: UseFormWatch<Iteacher>;
  setValue?: UseFormSetValue<Iteacher>;
  profilePhoto?: string | undefined;
  setPhoto?: React.Dispatch<React.SetStateAction<string | undefined>>;
  resume?: string | undefined;
  setResume?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const TeacherInfo: React.FC<ITeacherSub> = ({
  register,
  errors,
  control,
  watch,
  clearErrors,
  profilePhoto,
  setPhoto,
  setValue,
}) => {
  // here we watch for each field change and initial errors
  watch("name");
  watch("gender");
  watch("address");
  watch("profilePhoto");
  watch("address");
  // the function to handle picture selection
  const handleSelectPix = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (setValue) {
      setValue("profilePhoto", e.target.files);
    }
    const file = e.target.files[0];
    const blob = new Blob([file]);
    const imgUrl = URL.createObjectURL(blob);
    if (setPhoto) {
      setPhoto(imgUrl);
    }
  };
  // function to remove the image selected already
  const handleRemove = () => {
    if (setPhoto) {
      setPhoto(undefined);
    }
    if (setValue) {
      setValue("profilePhoto", "");
    }
  };
  return (
    <div className="flex flex-col w-full md:w-[55%] gap-2">
      <label className="font-bold text-[18px]">Personal Information</label>
      <input
        {...register("name")}
        type="text"
        name="name"
        placeholder="Full Name"
        className=" p-4 outline-none rounded-[8px] w-full bg-white"
        onChange={() => clearErrors("name")}
      />
      {errors.name && (
        <small className=" text-red-600">{errors.name.message}</small>
      )}
      <Controller
        control={control}
        name="gender"
        render={({ field }) => (
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              clearErrors("gender");
            }}
          >
            <SelectTrigger className=" py-[27px]">
              <SelectValue
                placeholder={`${field.value ? field.value : "enter gender"}`}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      {errors.gender && (
        <small className=" text-red-600">{errors.gender.message}</small>
      )}
      <input
        {...register("phoneNo")}
        type="text"
        name="phoneNo"
        placeholder="Phone Number"
        className=" p-4 outline-none rounded-[8px] w-full bg-white"
        onChange={() => clearErrors("phoneNo")}
      />
      {errors.phoneNo && (
        <small className=" text-red-600">{errors.phoneNo.message}</small>
      )}
      <input
        {...register("address")}
        type="text"
        name="address"
        placeholder="Permanent House Address"
        className=" p-4 outline-none rounded-[8px] w-full bg-white"
        onChange={() => clearErrors("address")}
      />
      {errors.address && (
        <small className=" text-red-600">{errors.address.message}</small>
      )}
      {profilePhoto === undefined ? (
        <div
          className={`flex items-center ${
            errors.profilePhoto && " border border-red-600"
          } bg-[#FFFFFF] py-4 pl-2 my-2 rounded-[8px]`}
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
                Upload Profile Image
              </span>
            </label>
            <input
              onChange={handleSelectPix}
              id="file-upload"
              type="file"
              name="profilePhoto"
              className="hidden"
              accept="image/*"
            />
          </div>
        </div>
      ) : (
        <div className=" w-full h-[200px] relative">
          <Image
            className=" w-full h-full object-cover"
            src={profilePhoto}
            alt="profileImg"
            width={200}
            height={200}
          />
          <div
            onClick={handleRemove}
            className=" cursor-pointer absolute top-0 right-0 w-[40px] h-[40px] bg-red-600 text-white  flex items-center justify-center"
          >
            <ImCross />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherInfo;
