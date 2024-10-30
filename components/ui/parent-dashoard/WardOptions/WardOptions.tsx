"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addWardSchema } from "@/constants/addWard";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
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
import Cookies from "js-cookie";
import Link from "next/link";
import { FullPageLoading } from "@/components/SingleTutor";

export type IaddWard = z.infer<typeof addWardSchema>;

// the component to display select for wards
const SelectWard: React.FC<{ data: any }> = ({ data }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedWard, handleSelectedWard] = useState<string | undefined>(
    () => {
      const wardId = Cookies.get("wardId") as string | undefined;
      console.log(wardId);
      return wardId;
    }
  );
  const router = useRouter();
  // useEffect to update the wardsId continuesly when changed
  const handleSelect = (value: string) => {
    handleSelectedWard(value);
  };
  // commant to proceed to wards page
  // and also to set the new wardId in our cookies
  const handleContinue = () => {
    console.log(selectedWard);
    if (!selectedWard)
      return toast.error("Please select a ward to continue...");
    setLoading(true);
    Cookies.set("wardId", selectedWard);
    router.push("/parents-dashboard");
  };
  return (
    <div className="flex flex-col items-center px-2 mb-2 ">
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

      <button
        onClick={handleContinue}
        disabled={selectedWard == undefined ? true : false}
        type="submit"
        className={`md:w-[500px] w-full mx-auto mt-3 py-4 rounded-md text-md ${
          selectedWard === undefined
            ? " bg-slate-300 text-slate-500 font-bold cursor-not-allowed"
            : "bg-lightGreen hover:bg-green-700 transition-all ease-in-out duration-700 text-white cursor-pointer"
        } `}
      >
        {loading ? "loading..." : "Continue"}
      </button>
    </div>
  );
};
const WardOptions = () => {
  const [loadingAdd, setLoadingAdd] = useState<boolean>(false); // For the Add Ward button
  const [loadingProceed, setLoadingProceed] = useState<boolean>(false); // For the Proceed button
  const router = useRouter();
  const [selectedWardId, setSelectedWardId] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isLoading) {
    return <FullPageLoading fullpage={true} />;
  }

  return (
    <div className="font-header w-full h-screen overflow-hidden  py-3 ">
      <p className="text-center font-bold text-[20px]  mb-3">SELECT WARD</p>
      <SelectWard data={data} />
      <p className="text-center font-bold text-[18px]">OR</p>
      <p className="text-center font-bold text-[20px] mt-2 mb-6">
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
              className=" p-4 outline-none rounded-[8px] w-full bg-white"
            />
            {errors.email && (
              <small className=" text-red-600">{errors.email.message}</small>
            )}
          </div>

          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Ward Password"
              className=" p-4 outline-none rounded-[8px] w-full bg-white"
            />
            {errors.password && (
              <small className=" text-red-600">{errors.password.message}</small>
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
            disabled={loadingAdd}
          >
            {loadingAdd ? "adding ward..." : "Add Ward"}
          </Button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default WardOptions;
