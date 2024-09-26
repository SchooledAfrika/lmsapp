"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { changeTeacherRoleSchema } from "@/constants/changeTeacherRole";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


import Link from "next/link";
import { User2 } from "lucide-react";

export type IupdatingTeacherRole = z.infer<typeof changeTeacherRoleSchema>;

interface Irole {
  dataId: string;
}
const ChangeRole: React.FC<Irole> = ({ dataId }) => {
  const [loading, setloading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<IupdatingTeacherRole>({
    resolver: zodResolver(changeTeacherRoleSchema),
  });

  //   instance of client
  const queryClient = useQueryClient();
  //   creating a post using mutation to the backend
  const mutation = useMutation({
    mutationKey: ["updateTeacherRole"],
    mutationFn: async (data: IupdatingTeacherRole) => {
      // console.log(data);
      const result = await fetch(`/api/teachers/change-teacher-type`, {
        method: "PUT",
        body: JSON.stringify({
          ...data,
          teacherId: dataId
        }),
      });

      return result;
    },
    onSuccess: async (result) => {
      queryClient.invalidateQueries({ queryKey: ["updateRole"] });
      if (result.ok) {
        const body = await result.json();
        setloading(false);
        reset();
        return toast.success(body.message);
      } else {
        setloading(false);
        return toast.error("error updating role");
      }
    },
  });
  // here we validate the datas in our form submission
  // only if there is data, before the mutation function is called
  const runSubmit: SubmitHandler<IupdatingTeacherRole> = async (data) => {
    console.log(data);
    setloading(true);
    mutation.mutate(data);
  };
  return (
    <div>

   
    <Dialog>
      <DialogTrigger asChild>
        <p className="inline text-[13px]  font-semibold">
                    <User2 className="inline ml-0 w-4 h-4 mr-2 text-lightGreen" />
                    Update Role
                </p>
      </DialogTrigger>
      <DialogContent className="sm:w-[500px] w-[380px] font-subtext">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">Update Teacher Role</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 font-header py-4">
          <div className="grid  items-center font-header gap-4">
          <p className="font-medium text-[15px]  ">
              Selecting either of these options changes a teacher from working as an external teacher to working as an internal teacher for SchooledAfrika and back.
            </p>
            <p className="font-semibold text-[16px]  ">
              Are you sure you want to perform this operation?
            </p>
            
          </div>
          <form onSubmit={handleSubmit(runSubmit)}>
            <div className="flex gap-[10px] pt-4">
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      clearErrors("type");
                    }}
                  >
                    <SelectTrigger className=" w-full py-2">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>

                    <SelectContent className=" font-subtext font-medium">
                      <SelectGroup>
                        <SelectItem value="INTERNAL">INTERNAL</SelectItem>
                        <SelectItem value="EXTERNAL">EXTERNAL</SelectItem>
                       
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.type && (
                <small className="text-red-600">{errors.type.message}</small>
              )}
            </div>

            <Button
              type="submit"
              className="bg-secondary w-full text-white text-[16px] py-7 my-3"
              disabled={loading}
            >
              {loading ? "updating role..." : "Update Role"}
            </Button>
          </form>
        </div>
        
      </DialogContent>
     
    </Dialog> 
    <ToastContainer />
    </div>
  );
};

export default ChangeRole;
