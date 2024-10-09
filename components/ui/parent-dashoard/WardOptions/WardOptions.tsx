"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addWardSchema } from "@/constants/addWard";
import { Button } from "@/components/ui/button";


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Image from "next/image";
import Link from "next/link";

export type IaddWard = z.infer<typeof addWardSchema>;
const WardOptions = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [selectedWardId, setSelectedWardId] = useState<string | null>(null);

  // Retrieve stored ward ID on component mount
  useEffect(() => {
    const storedWardId = localStorage.getItem("selectedWardId");
    if (storedWardId) {
      setSelectedWardId(storedWardId);
    }
  }, []);

  // Handle option selection
  const handleSelect = (wardId: string) => {
    setSelectedWardId(wardId);
    localStorage.setItem("selectedWardId", wardId); // Store the selected ID in localStorage
  };

  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IaddWard>({
    resolver: zodResolver(addWardSchema),
  });

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["getWard"],
    queryFn: async () => {
      const response = await fetch("/api/more-wards");
      const result = await response.json();
      return result;
    },
  });

  console.log(data);

  // Query client instance
  const queryClient = useQueryClient();

  // Mutation to handle the addition of test/exam
  const mutation = useMutation({
    mutationFn: async (data: IaddWard) => {
      const result = await fetch("/api/more-wards", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          email: String(data.email),
          password: String(data.password),
          gender: String(data.gender),
          name: String(data.name),
        }),
      });
      return result;
    },

    onSuccess: async (result) => {
      queryClient.invalidateQueries({ queryKey: ["getWard"] });
      setLoading(false);

      if (result.ok) {
        toast.success("Ward successfully added");
      } else {
        toast.error("Error adding ward");
      }
    },
    onError: (error) => {
      console.error("Error adding ward:", error);
      setLoading(false);
      toast.error("Error adding ward");
    },
  });

  // here we validate the datas in our form submission
  // only if there is data, before the mutation function is called
  const runSubmit: SubmitHandler<IaddWard> = async (data) => {
    setLoading(true);
    mutation.mutate(data);
  };

  // loading message here
  if (isLoading) {
    return <p>loading...</p>;
  }

  // return a div telling the teacher to select a ward if ther is none
  if (data.length == 0) {
    return (
      <div>
        <p>No ward here, choose ward please</p>
      </div>
    );
  }

  // Move to Ward Dashboard
  
  const handleMoveToWardDashboard = () => {
    if (selectedWardId) {
      router.push(`/parents-dashboard`);
    } else {
      toast.error("Please select a ward before proceeding!");
    }
  };

  return (
    <div className="font-header ">
      <div className="pt-4">
        <Link href="/">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={100}
            height={100}
            className="w-[100px] ml-3 mb-4 "
            priority
          />
        </Link>
      </div>
      <p className="text-center font-bold text-[20px] mt-12 mb-6">
        SELECT WARD
      </p>
      <div className="flex flex-col items-center px-2 mb-6 ">
        <Select onValueChange={handleSelect}>
          <SelectTrigger className="md:w-[500px] w-full  py-6">
            <SelectValue placeholder="Select Ward" />
          </SelectTrigger>
          <SelectContent className="font-header font-medium">
            <SelectGroup>
              {Array.isArray(data) &&
                data.map((item: any) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          onClick={handleMoveToWardDashboard}
          disabled={loading}
          type="submit"
          className="md:w-[500px] w-full mx-auto mt-3 py-8 text-md bg-lightGreen hover:bg-green-700"
        >
          {loading ? "Redirecting..." : "Redirect to ward dashboard"}
        </Button>
      </div>

      <p className="text-center font-bold text-[18px]">OR</p>
      <p className="text-center font-bold text-[20px] mt-12 mb-6">
        ADD MORE WARD(S)
      </p>

      <div className=" flex flex-col w-full mx-auto md:w-[500px] gap-2">
        <form
          onSubmit={handleSubmit(runSubmit)}
          className=" flex flex-col gap-2 w-full px-2"
        >
          <div>
            <input
              {...register("email")}
              autoFocus
              type="email"
              name="email"
              placeholder="Enter Ward Email Address"
              className=" p-4 outline-none rounded-[8px] w-full bg-white"
            />
            {errors.email && (
              <small className=" text-red-600">{errors.email.message}</small>
            )}
          </div>

          <div>
            <input
              {...register("password")}
              autoFocus
              type="password"
              name="password"
              placeholder="Enter Ward Password"
              className=" p-4 outline-none rounded-[8px] w-full bg-white"
            />
            {errors.password && (
              <small className=" text-red-600">{errors.password.message}</small>
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
                      placeholder={`${
                        field.value ? field.value : "Enter Gender of Ward"
                      }`}
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
              {...register("name")}
              autoFocus
              type="text"
              name="name"
              placeholder="Enter Ward Name"
              className=" p-4 outline-none rounded-[8px] w-full bg-white"
            />
            {errors.name && (
              <small className=" text-red-600">{errors.name.message}</small>
            )}
          </div>

          <Button
            type="submit"
            className="w-full py-6 mb-6 bg-lightGreen hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "adding ward..." : "Add Ward"}
          </Button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default WardOptions;
