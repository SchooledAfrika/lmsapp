"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addWardSchema } from "@/constants/addWard";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BsPlusSquare } from "react-icons/bs";
import { Eye, EyeOff } from "lucide-react";

export type IaddWard = z.infer<typeof addWardSchema>;
const AddWard = () => {
  const [loadingAdd, setLoadingAdd] = useState<boolean>(false); // For the Add Ward button
  const [loadingProceed, setLoadingProceed] = useState<boolean>(false); // For the Proceed button
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true); // Controls the dialog state
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const [selectedWardId, setSelectedWardId] = useState<string | null>(null);

  // Retrieve stored ward ID on component mount
  useEffect(() => {
    const storedWardId = localStorage.getItem("selectedWardId");
    if (storedWardId) {
      setSelectedWardId(storedWardId);
    }
  }, [selectedWardId, loadingProceed]);

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

  //console.log(data);

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
      setLoadingAdd(false);
      setLoadingProceed(false);

      if (result.ok) {
        toast.success("Ward successfully added");
      } else {
        toast.error("Error adding ward");
      }
    },
    onError: (error) => {
      console.error("Error adding ward:", error);
      setLoadingAdd(false);
      toast.error("Error adding ward");
    },
  });

  // here we validate the datas in our form submission
  // only if there is data, before the mutation function is called
  const runSubmit: SubmitHandler<IaddWard> = async (data) => {
    setLoadingAdd(true);
    mutation.mutate(data);
  };

  // loading message here
  if (isLoading) {
    return <p>loading...</p>;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Move to Ward Dashboard

  const handleMoveToWardDashboard = () => {
    if (selectedWardId) {
      setLoadingProceed(true); // Start loading for Proceed button

      // Proceed to the dashboard
      router.push(`/parents-dashboard`);

      // Set a timer to reset the loading state after a short delay
      setTimeout(() => {
        setLoadingProceed(false); // Stop loading after a delay (simulate navigation completion)
        setIsDialogOpen(false); // Close the dialog after successful navigation
      });
    } else {
      toast.error("Please select a ward before proceeding!");
    }
  };
  return (
    <div className="font-header ">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <p className="inline text-[13px] text-center font-semibold">
            <BsPlusSquare className="w-[40px] h-[40px]  mx-auto bg-lightGreen text-white border border-white" />
            Add Ward
          </p>
        </DialogTrigger>

        <DialogContent className="sm:w-[600px]  w-[380px] font-subtext">
          <ScrollArea className="h-[500px] w-full ">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold">
                ADD OR SELECT WARD
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 font-header py-4">
              <div className="grid items-center font-header gap-4">
                <p className="text-center font-bold text-[20px] my-6">
                  SELECT WARD
                </p>
                <div className="flex flex-col">
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
                    disabled={loadingProceed}
                    type="submit"
                    className="md:w-[500px] w-full  mt-3 py-8 text-md bg-lightGreen hover:bg-green-700"
                  >
                    {loadingProceed ? "Proceeding..." : "Proceed"}
                  </Button>
                </div>
              </div>
              <p className="text-center font-bold text-[18px]">OR</p>
              <p className="text-center font-bold text-[20px] mt-6 mb-6">
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
                      type="email"
                      name="email"
                      placeholder="Enter Ward Email Address"
                      className=" p-4 border outline-none rounded-[8px] w-full bg-white"
                    />
                    {errors.email && (
                      <small className=" text-red-600">
                        {errors.email.message}
                      </small>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter Ward Password"
                      className=" p-4 outline-none border rounded-[8px] w-full bg-white"
                    />
                    {errors.password && (
                      <small className=" text-red-600">
                        {errors.password.message}
                      </small>
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
                  <div>
                    <Controller
                      control={control}
                      name="gender"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className=" py-[27px]">
                            <SelectValue
                              placeholder={`${
                                field.value
                                  ? field.value
                                  : "Enter Gender of Ward"
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
                      <small className=" text-red-600">
                        {errors.gender.message}
                      </small>
                    )}
                  </div>

                  <div>
                    <input
                      {...register("name")}
                      type="text"
                      name="name"
                      placeholder="Enter Ward Name"
                      className=" p-4 border outline-none rounded-[8px] w-full bg-white"
                    />
                    {errors.name && (
                      <small className=" text-red-600">
                        {errors.name.message}
                      </small>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-6 mb-6 bg-lightGreen hover:bg-green-700"
                    disabled={loadingAdd}
                  >
                    {loadingAdd ? "adding ward..." : "Add Ward"}
                  </Button>
                </form>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </div>
  );
};

export default AddWard;