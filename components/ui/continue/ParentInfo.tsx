import Image from "next/image";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UseFormRegister,
  FieldErrors,
  Control,
  Controller,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Iparents } from "@/components/ParentAccount";
import { ImCross } from "react-icons/im";
import PreviewItem from "../PreviewItem";

export interface IparentSub {
  register: UseFormRegister<Iparents>;
  errors: FieldErrors<Iparents>;
  control?: Control<Iparents>;
  profilePhoto?: string | undefined;
  setPhoto?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setValue: UseFormSetValue<Iparents>;
  childImg?: string | undefined;
  setChildImg?: React.Dispatch<React.SetStateAction<string | undefined>>;
  watch: UseFormWatch<Iparents>;
}

const ParentInfo: React.FC<IparentSub> = ({
  register,
  errors,
  control,
  profilePhoto,
  setPhoto,
  setValue,
}) => {
  // the function to generate a url for the picture
  const handleShowPix = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (setValue) {
      setValue("profilePhoto", e.target.files);
    }
    const blob = new Blob([file]);
    const localUrl = URL.createObjectURL(blob);
    if (setPhoto) {
      setPhoto(localUrl);
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
    <div className=" flex flex-col w-full md:w-[55%] gap-2">
      <label className="font-bold text-[16px]">Personal Information</label>
      <div>
        <input
          {...register("name")}
          autoFocus
          type="text"
          name="name"
          placeholder="Full Name"
          className=" p-4 outline-none rounded-[8px] w-full bg-white"
        />
        {errors.name && (
          <small className=" text-red-600">{errors.name.message}</small>
        )}
      </div>
      <div>
        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <Select onValueChange={field.onChange}>
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
      </div>
      <div>
        <input
          {...register("phoneNo")}
          type="text"
          name="phoneNo"
          placeholder="Phone Number"
          className=" p-4 outline-none rounded-[8px] w-full bg-white"
        />
        {errors.phoneNo && (
          <small className=" text-red-600">{errors.phoneNo.message}</small>
        )}
      </div>
      <div>
        <input
          {...register("address")}
          type="text"
          name="address"
          placeholder="Permanent House Address"
          className=" p-4 outline-none rounded-[8px] w-full bg-white"
        />
        {errors.address && (
          <small className=" text-red-600">{errors.address.message}</small>
        )}
      </div>
      {profilePhoto === undefined ? (
        <div>
          <div className="flex items-center bg-[#FFFFFF] py-4 pl-2 my-2 rounded-[8px]">
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
                onChange={handleShowPix}
                id="file-upload"
                type="file"
                name="profilePhoto"
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
          {errors.profilePhoto && (
            <small className=" text-red-600">
              {String(errors.profilePhoto.message)}
            </small>
          )}
        </div>
      ) : (
        <PreviewItem imageItem={profilePhoto} handleRemove={handleRemove} />
      )}
    </div>
  );
};

export default ParentInfo;
