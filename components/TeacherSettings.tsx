"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { teacherProfileSettingsSchema } from "@/constants/teacherProfileSettings";
import { teacherPasswordUpdateSchema } from "@/constants/teacherPasswordUpdate";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { toast, ToastContainer } from "react-toastify";
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import "react-toastify/dist/ReactToastify.css";

export type IupdatingTeacher = z.infer<typeof teacherProfileSettingsSchema>;
export type IupdatingPassword = z.infer<typeof teacherPasswordUpdateSchema>;

const UpdateProfile = () => {
  const [loading, setloading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IupdatingTeacher>({
    resolver: zodResolver(teacherProfileSettingsSchema),
  });

  //   instance of client
  const queryClient = useQueryClient();
  //   creating a post using mutation to the backend
  const mutation = useMutation({
    mutationKey: ["updateTeacher"],
    mutationFn: async (data: IupdatingTeacher) => {
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
      queryClient.invalidateQueries({ queryKey: ["update"] });
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
  const runSubmit: SubmitHandler<IupdatingTeacher> = async (data) => {
    console.log(data);
    setloading(true);
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(runSubmit)}>
      <label className="font-bold text-[14px] text-[#9F9F9F]">
        Personal Information
      </label>
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
          id="name"
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
      <label className="font-bold text-[14px] text-[#9F9F9F] my-4">
        Address Details
      </label>
      <input
        id="address"
        {...register("address")}
        name="address"
        type="text"
        className="outline-none p-3 my-4 rounded-[5px] border-2 w-full"
        placeholder="Permanent House Address"
      />
      {errors.address && (
        <small className="text-red-600">{errors.address.message}</small>
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
    resolver: zodResolver(teacherPasswordUpdateSchema),
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
        type={showPassword ? 'text' : 'password'}
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
        {showPassword ? <EyeOff className="text-lightGreen"/> : <Eye className="text-lightGreen"/>}
      </button>


      </div>
      <div className="relative">
      <input
        id="newPassword"
        {...register("newPassword")}
        name="newPassword"
        type={showPassword ? 'text' : 'password'}
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
        {showPassword ? <EyeOff className="text-lightGreen"/> : <Eye className="text-lightGreen"/>}
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

const TeacherSettings = () => {
  return (
    <section className="flex flex-col md:flex-row mt-[100px] md:mt-[30px] gap-4">
      <div className="flex-5 bg-[#FFFFFF] rounded-[5px] p-5 h-[100vh] overflow-y-scroll scrollbar-hide">
        <hr className="my-4" />
        <UpdateProfile />

        <div className="flex flex-col justify-center outline-none rounded-[8px] w-full">
          <p className="font-bold text-[14px] text-[#9F9F9F] mb-4">
            Subscription Plan
          </p>
          <span className="font-bold pb-2">
            Upgrade and get more out of Schooled Afrika
          </span>
          <p className="text-[14px] font-medium">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo.
          </p>

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
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo.
            </p>
            <Button className="bg-transparent text-[#359C71] border border-[#359C71] mt-4 font-bold px-2">
              <Image
                src="/svgs/contact-support.svg"
                width={20}
                height={20}
                alt="View Plans"
                className="mr-2"
              />
              Contact Support
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-4 rounded-[5px]">
        <div>
          <form className="h-[55%] bg-[#FFFFFF] rounded-[5px] p-4">
            <hr className="my-4" />
            <div className="flex justify-between">
              <label className="font-bold text-[#9F9F9F]">
                Banking Information
              </label>
              <Image
                src="/svgs/colored-lock.svg"
                width={20}
                height={20}
                alt="Lock"
              />
            </div>
            <input
              type="text"
              className="outline-none p-3 my-4 rounded-[5px] border-2 w-full"
              placeholder="Bank Name"
            />
            <input
              type="text"
              className="outline-none p-3 mb-4 rounded-[5px] border-2 w-full"
              placeholder="Account Number"
            />
            <input
              type="text"
              className="outline-none p-3 mb-4 rounded-[5px] border-2 w-full"
              placeholder="Account Name"
            />
            <p className="text-[#359C71] text-center text-[12px]">
              Contact <span className="font-bold">Support</span> to Change Your
              Banking Information
            </p>
          </form>
        </div>

        <div>
          <UpdatePassword />
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default TeacherSettings;
