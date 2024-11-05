"use client";
import React, { useState, useEffect, useContext } from "react";
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
import { useWardId } from "@/data-access/conversion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { BsPlusSquare } from "react-icons/bs";
import { Eye, EyeOff } from "lucide-react";

interface AddWardProps {
  onProceed: () => void; // Function to refresh the dashboard
}

const SwitchWard: React.FC<{
  data: any;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ data, setIsDialogOpen }) => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const { setWardIs, wardId } = useWardId();
  const handleSelect = (wardId: string) => {
    setSelectedId(wardId);
  };
  const handleChange = () => {
    if (!selectedId) return;
    Cookies.set("wardId", selectedId!);
    setWardIs(selectedId);
    setIsDialogOpen(false);
  };
  return (
    <div className="flex flex-col w-full items-center">
      <Select onValueChange={handleSelect}>
        <SelectTrigger className="md:w-[500px] w-full  py-6">
          <SelectValue placeholder="Select Ward" />
        </SelectTrigger>
        <SelectContent className="font-header font-medium">
          <SelectGroup className=" flex flex-col gap-1">
            {Array.isArray(data) &&
              data.map((item: any) => (
                <SelectItem
                  className={` cursor-pointer hover:bg-green-600 transition-all ease-in-out duration-700 ${
                    item.id === wardId && " bg-green-600 text-white"
                  }`}
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div
        onClick={handleChange}
        className={`md:w-[500px] w-full flex items-center justify-center  mt-3 py-5 rounded-md text-md ${
          selectedId
            ? "bg-lightGreen text-white font-semibold hover:bg-green-700 cursor-pointer transition-all ease-in-out duration-700"
            : " bg-gray-500 cursor-not-allowed"
        } `}
      >
        <p>Switch ward</p>
      </div>
    </div>
  );
};

export type IaddWard = z.infer<typeof addWardSchema>;
const AddWard = () => {
  const [loadingAdd, setLoadingAdd] = useState<boolean>(false); // For the Add Ward button
  const [loadingProceed, setLoadingProceed] = useState<boolean>(false); // For the Proceed button
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // Controls the dialog state
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
    localStorage.setItem("selectedWardId", wardId);
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

  return (
    <div className="font-header ">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <p className="text-[13px] flex flex-col md:ml-3 px-4 mt-3 md:mt-0 text-center   py-4 bg-white rounded-md  font-semibold">
            <BsPlusSquare className="w-[40px] h-[40px]  mx-auto bg-lightGreen text-white border border-white" />
            Add or Switch Ward
          </p>
        </DialogTrigger>

        <DialogContent className="sm:w-[600px]  w-[380px] font-subtext">
          <ScrollArea className="h-[500px] w-full ">
            <div className="grid gap-4 font-header py-4">
              <div className="grid items-center font-header gap-4">
                <p className="text-center font-bold text-[20px] my-6">
                  SWITCH WARD
                </p>
                <SwitchWard setIsDialogOpen={setIsDialogOpen} data={data} />
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
