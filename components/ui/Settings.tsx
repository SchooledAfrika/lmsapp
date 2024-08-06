"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { schoolProfileSettingsSchema } from "@/constants/schoolProfileSettings";
import { schoolPasswordUpdateSchema } from "@/constants/schoolPasswordUpdate";
import { Button } from "./button";
import Link from "next/link";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { useCloudinary } from "@/data-access/cloudinary";
import PreviewItem from "@/components/ui/PreviewItem";

export type IupdatingSchool = z.infer<typeof schoolProfileSettingsSchema>;
export type IupdatingPassword = z.infer<typeof schoolPasswordUpdateSchema>;

const UpdateProfile = () => {
  const [loading, setloading] = useState<boolean>(false);
  const [schoolLogo, setSchoolLogo] = useState<string | undefined>(undefined);
  const { imageUpload } = useCloudinary();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<IupdatingSchool>({
    resolver: zodResolver(schoolProfileSettingsSchema),
  });

  //   instance of client
  const queryClient = useQueryClient();
  //   creating a post using mutation to the backend
  const mutation = useMutation({
    mutationKey: ["updateSchool"],
    mutationFn: async (data: IupdatingSchool) => {
      // console.log(data);
      const result = await fetch("/api/modifyaccount", {
        method: "PUT",
        body: JSON.stringify({
          ...data,
        }),
      });

      return result;
    },
    onSuccess: async (result) => {
      queryClient.invalidateQueries({ queryKey: ["updateSchool"] });
      if (result.ok) {
        const body = await result.json();
        setloading(false);
        reset();
        return toast.success(body.message);
      } else {
        setloading(false);
        return toast.error("error updating profile");
      }
    },
  });
  // here we validate the datas in our form submission
  // only if there is data, before the mutation function is called
  const runSubmit: SubmitHandler<IupdatingSchool> = async (data) => {
    console.log(data);
    setloading(true);
    // converting the selected image to a blob and uploading to cloudinary
    // using the useCloudinary custom hook;
    const logoBlob = new Blob([data.schoolLogo[0]]);
    const logoUrl = await imageUpload(logoBlob);
    data.schoolLogo = logoUrl;
    mutation.mutate(data);
  };

  // handles remove image that is already present
  // if the user decides to remove it
  const handleRemove = () => {
    setSchoolLogo(undefined);
    setValue("schoolLogo", "");
  };
  // the function to generate a url for the picture
  const handleShowPix = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setValue("schoolLogo", e.target.files);
    const blob = new Blob([file]);
    const localUrl = URL.createObjectURL(blob);
    setSchoolLogo(localUrl);
    clearErrors("schoolLogo");
  };

  return (
    <form onSubmit={handleSubmit(runSubmit)}>
      <label className="font-bold text-[#9F9F9F]">Personal Information</label>
      <br />
      <div className="flex gap-[10px] pt-4">
        <input
          id="name"
          {...register("name")}
          name="name"
          type="text"
          className="outline-none p-3 rounded-[5px]  border-2 w-[50%]"
          placeholder="Full Name"
        />
        {errors.name && (
          <small className="text-red-600">{errors.name.message}</small>
        )}
        <input
          id="phoneNo"
          {...register("phoneNo")}
          name="phoneNo"
          type="text"
          className="outline-none p-3 rounded-[5px] border-2 w-[50%]"
          placeholder="Phone Number"
        />
        {errors.phoneNo && (
          <small className="text-red-600">{errors.phoneNo.message}</small>
        )}
      </div>
      <br />
      <input
        id="email"
        {...register("email")}
        name="email"
        type="email"
        className="outline-none p-3 mb-4 rounded-[5px] border-2 w-full"
        placeholder="Email Address"
      />
      {errors.email && (
        <small className="text-red-600">{errors.email.message}</small>
      )}
      <hr className="my-4" />
      <label className="font-bold text-[#9F9F9F]">School Details</label>
      <input
        id="ownerName"
        {...register("ownerName")}
        name="ownerName"
        type="text"
        className="outline-none p-3 my-4 rounded-[5px] border-2 w-full"
        placeholder="School or Institute Name"
      />
      {errors.ownerName && (
        <small className="text-red-600">{errors.ownerName.message}</small>
      )}
      <input
        id="schAddress"
        {...register("schAddress")}
        name="schAddress"
        type="text"
        className="outline-none p-3 mb-4 rounded-[5px] border-2 w-full"
        placeholder="School or Institute Address"
      />
      {errors.schAddress && (
        <small className="text-red-600">{errors.schAddress.message}</small>
      )}

      {schoolLogo === undefined ? (
        <div className="flex flex-col">
          <input
            type="file"
            multiple={false}
            accept="image/*"
            onChange={handleShowPix}
            name="schoolLogo"
            placeholder="School Logo"
            className=" w-full text-[14px] text-black bg-transparent focus:outline-none"
          />
          <div className="flex flex-col justify-center border-2 my-3 p-8 outline-none rounded-[8px] w-full bg-white">
            <p className="py-4 text-center">School or Institute Cover</p>
            <p className="flex items-center justify-center gap-2 text-[12px]">
              <Image src="/svgs/error.svg" alt="error" width={15} height={15} />
              Note that the cover is visible as a banner to everyone.
            </p>
          </div>
        </div>
      ) : (
        <PreviewItem handleRemove={handleRemove} imageItem={schoolLogo} />
      )}

      <hr className="my-4" />
      <Button
        type="submit"
        className="bg-secondary w-full text-white text-[16px] py-7 my-3"
        disabled={loading}
      >
        {loading ? "updating profile..." : "Update Profile"}
      </Button>
    </form>
  );
};

const UpdatePassword = () => {
  const [loading, setloading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IupdatingPassword>({
    resolver: zodResolver(schoolPasswordUpdateSchema),
  });

  //   instance of client
  const queryClient = useQueryClient();
  //   creating a post using mutation to the backend
  const mutation = useMutation({
    mutationKey: ["updatePassword"],
    mutationFn: async (data: IupdatingPassword) => {
      console.log(data);
      const result = await fetch("/api/changepassword", {
        method: "PUT",
        body: JSON.stringify({
          ...data,
        }),
      });

      return result;
    },
    onSuccess: async (result) => {
      queryClient.invalidateQueries({ queryKey: ["updatePassword"] });
      if (result.ok) {
        const body = await result.json();
        setloading(false);
        reset();
        return toast.success(body.message);
      } else {
        setloading(false);
        return toast.error("error updating password");
      }
    },
  });
  // here we validate the datas in our form submission
  // only if there is data, before the mutation function is called
  const runSubmit: SubmitHandler<IupdatingPassword> = async (data) => {
    console.log(data);
    setloading(true);
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(runSubmit)}
      className="h-[55%] bg-[#FFFFFF] rounded-[5px] p-4 my-4"
    >
      <hr className="my-4" />
      <label className="font-bold text-[#9F9F9F] my-4">Security</label>
      <div className="relative">
        <input
          id="name"
          {...register("oldPassword")}
          name="oldPassword"
          type={showPassword ? "text" : "password"}
          className="outline-none p-3 my-4 rounded-[5px] border-2 w-full"
          placeholder="Current Password"
        />
        {errors.oldPassword && (
          <small className="text-red-600">{errors.oldPassword.message}</small>
        )}
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute top-8 right-4 border-none bg-transparent cursor-pointer"
        >
          {showPassword ? (
            <EyeOff className="text-lightGreen h-5 w-5" />
          ) : (
            <Eye className="text-lightGreen h-5 w-5" />
          )}
        </button>
      </div>
      <div className="relative">
        <input
          id="newPassword"
          {...register("newPassword")}
          name="newPassword"
          type={showPassword ? "text" : "password"}
          className="outline-none p-3 mb-4 rounded-[5px] border-2 w-full"
          placeholder="New Password"
        />
        {errors.newPassword && (
          <small className="text-red-600">{errors.newPassword.message}</small>
        )}
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute top-4 right-4 border-none bg-transparent cursor-pointer"
        >
          {showPassword ? (
            <EyeOff className="text-lightGreen h-5 w-5" />
          ) : (
            <Eye className="text-lightGreen h-5 w-5" />
          )}
        </button>
      </div>
      <Button
        type="submit"
        className="bg-secondary w-full text-white text-[16px] py-7 my-3"
        disabled={loading}
      >
        {loading ? "changing password..." : "Change Password"}
      </Button>
    </form>
  );
};

const Settings = () => {
  return (
    <section className="flex flex-col md:flex-row mt-6 gap-4">
      <div className="flex-5 bg-[#FFFFFF] rounded-[5px] p-5 h-[100vh] overflow-y-scroll scrollbar-hide">
        <hr className="my-4" />
        <UpdateProfile />

        <hr className="my-4" />
        <div className="flex flex-col justify-center outline-none rounded-[8px] w-full">
          <p className="font-bold text-[14px] text-[#9F9F9F] mb-4">
            Subscription Plan
          </p>
          <span className="font-bold pb-2">
            Upgrade and get more out of Schooled Afrika
          </span>

          <div className="my-[20px]">
            <p className="font-bold pb-2">Current Plan</p>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[#359C71] underline font-bold text-[14px]">
                Basic Plan
              </span>
              <span className="font-bold text-[14px]">
                Expires May 24, 2024
              </span>
            </div>
            <Button className="bg-[#359C71] font-bold px-5">
              <Image
                src="/svgs/cash-plan.svg"
                width={20}
                height={20}
                alt="View Plans"
                className="mr-2"
              />
              View Plan
            </Button>
          </div>
          <div className="my-5">
            <p className="font-bold pb-2">Need Plan ?</p>
            <p className="text-[14px] font-medium">
              Our Team work around the clock to ensure your satisfaction. Please reach out to us.
            </p>
            <Button className="bg-transparent text-[#359C71] border border-[#359C71] mt-4 font-bold px-2">
              <Image
                src="/svgs/contact-support.svg"
                width={20}
                height={30}
                alt="View Plans"
                className="mr-2 pb-2 h-[32px]"
              />
              Contact Support
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-4 rounded-[5px]">
        <div className="block md:flex items-center gap-4 bg-[#FFFFFF] p-6 h-[40vh] md:h-[30vh] rounded-[5px]">
          <Image
            src="/schoolpic.png"
            width={200}
            height={50}
            className="h-[20vh]"
            alt="School Image"
          />
         
          <div>
            <span className="font-bold flex items-center my-4 gap-2 text-[14px]">
              <Image
                src="/svgs/schoollogo.svg"
                width={15}
                height={15}
                alt="School Logo"
              />
              Brilliant Stars College
            </span>
            <span className="flex items-center gap-2 text-[12px]">
              <Image
                src="/svgs/location.svg"
                width={15}
                height={15}
                alt="School Logo"
              />
              No 18, Westpoint Avenue, Mid-land, Birmingham, United Kingdom.
            </span>
          </div>
        </div>
        <div>
          <UpdatePassword />
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Settings;
