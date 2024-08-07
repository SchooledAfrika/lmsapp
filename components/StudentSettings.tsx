"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { studentProfileSettingsSchema } from "@/constants/studentProfileSettings";
import { studentPasswordUpdateSchema } from "@/constants/studentPasswordUpdate";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { toast, ToastContainer } from "react-toastify";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

export type IupdatingStudent = z.infer<typeof studentProfileSettingsSchema>;
export type IupdatingPassword = z.infer<typeof studentPasswordUpdateSchema>;

const UpdateProfile = () => {
  const [loading, setloading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<IupdatingStudent>({
    resolver: zodResolver(studentProfileSettingsSchema),
  });

  //   instance of client
  const queryClient = useQueryClient();
  //   creating a post using mutation to the backend
  const mutation = useMutation({
    mutationKey: ["updateStudent"],
    mutationFn: async (data: IupdatingStudent) => {
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
  const runSubmit: SubmitHandler<IupdatingStudent> = async (data) => {
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
      <div className="flex gap-[10px]">
        <Controller
          control={control}
          name="grade"
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                clearErrors("grade");
              }}
            >
              <SelectTrigger className=" w-full py-6">
                <SelectValue placeholder="Grade" />
              </SelectTrigger>

              <SelectContent className=" font-subtext font-medium">
                <ScrollArea className="h-[200px] w-full ">
                  <SelectGroup>
                    <SelectItem value="Grade1">Grade 1</SelectItem>
                    <SelectItem value="Grade2">Grade 2</SelectItem>
                    <SelectItem value="Grade3">Grade 3</SelectItem>
                    <SelectItem value="Grade4">Grade 4</SelectItem>
                    <SelectItem value="Grade5">Grade 5</SelectItem>
                    <SelectItem value="Grade6">Grade 6</SelectItem>
                    <SelectItem value="Grade7">Grade 7</SelectItem>
                    <SelectItem value="Grade8">Grade 8</SelectItem>
                    <SelectItem value="Grade9">Grade 9</SelectItem>
                    <SelectItem value="Grade10">Grade 10</SelectItem>
                    <SelectItem value="Grade11">Grade 11</SelectItem>
                    <SelectItem value="Grade12">Grade 12</SelectItem>
                  </SelectGroup>
                </ScrollArea>
              </SelectContent>
            </Select>
          )}
        />
        {errors.grade && (
          <small className="text-red-600">{errors.grade.message}</small>
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
              <SelectTrigger className=" w-full py-6">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>

              <SelectContent className=" font-subtext font-medium">
                <SelectGroup>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.gender && (
          <small className="text-red-600">{errors.gender.message}</small>
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
      {/* <label className="font-bold text-[14px] text-[#9F9F9F] my-4">
            Parent Information
          </label>
          <div className="flex gap-[10px] mt-4">
            <input
              type="text"
              className="outline-none p-3 rounded-[5px]  border-2 w-[50%]"
              placeholder="Full Name"
            />
            <input
              type="text"
              className="outline-none p-3 rounded-[5px] border-2 w-[50%]"
              placeholder="Phone Number"
            />
          </div>
          <input
            type="text"
            className="outline-none p-3 my-4 rounded-[5px] border-2 w-full"
            placeholder="Access ID"
          /> */}
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
    resolver: zodResolver(studentPasswordUpdateSchema),
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
            <EyeOff className="text-lightGreen" />
          ) : (
            <Eye className="text-lightGreen" />
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
            <EyeOff className="text-lightGreen" />
          ) : (
            <Eye className="text-lightGreen" />
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

const StudentSettings = () => {
  return (
    <section className="flex flex-col md:flex-row mt-[100px] md:mt-[30px] gap-4">
      <div className="flex-5 bg-[#FFFFFF] rounded-[5px] p-5 h-[100vh] overflow-y-scroll scrollbar-hide">
        <hr className="my-4" />
        <UpdateProfile />

        <div className="my-5">
          <p className="font-bold pb-2">Need Plan ?</p>
          <p className="text-[14px] font-medium">
            Enjoy our services to its fullest.
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

      <div className="flex-4 rounded-[5px]">
        <UpdatePassword />

        <div></div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default StudentSettings;
