"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { teacherStatusSchema } from "@/constants/teacherStatus";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaChartPie } from "react-icons/fa6";
import { User2 } from "lucide-react";
import { Irole } from "./ChangeRole";
import { useToast } from "@/components/ui/use-toast";

export type IupdatingTeacherStatus = z.infer<typeof teacherStatusSchema>;

const TriggerForRole = () => {
  return (
    <div className=" text-[13px] font-semibold flex items-center">
      <User2 className="inline ml-0 w-4 h-4 mr-2 text-lightGreen" />
      <p className="inline text-[13px]  font-semibold">Update Role</p>
    </div>
  );
};

const TriggerForStatus = () => {
  return (
    <div className=" text-[13px] font-semibold flex items-center">
      <FaChartPie className="inline w-4 h-4 mr-2 ml-0 text-lightGreen " />
      <p className="inline text-[13px] cursor-pointer  font-semibold">
        Update Status
      </p>
    </div>
  );
};

const UpdateTeacherStatus: React.FC<Irole> = ({
  dataId,
  dialogueOpen,
  setDialogOpen,
  isRole,
}) => {
  const [loading, setloading] = useState<boolean>(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    control,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<IupdatingTeacherStatus>({
    resolver: zodResolver(teacherStatusSchema),
  });

  //   instance of client
  const queryClient = useQueryClient();
  //   creating a post using mutation to the backend
  const mutation = useMutation({
    mutationKey: ["updateTeacherStatus"],
    mutationFn: async (data: IupdatingTeacherStatus) => {
      // console.log(data);
      const result = await fetch(`/api/teachers/${dataId}`, {
        method: "PUT",
        body: JSON.stringify({
          ...data,
        }),
      });

      return result;
    },
    onSuccess: async (result) => {
      queryClient.invalidateQueries({ queryKey: ["AdminGetTeacher"] });
      if (result.ok) {
        const body = await result.json();
        setloading(false);
        setDialogOpen(false);
        reset();
        return toast({
          variant: "default",
          title: "Successful update!!!",
          description: body.message,
          className: " bg-green-500 text-white",
        });
      } else {
        setloading(false);
        return toast({
          variant: "destructive",
          title: "Update error",
          description: "Error updating this teacher's status",
        });
      }
    },
  });
  // here we validate the datas in our form submission
  // only if there is data, before the mutation function is called
  const runSubmit: SubmitHandler<IupdatingTeacherStatus> = async (data) => {
    console.log(data);
    setloading(true);
    mutation.mutate(data);
  };
  return (
    <Dialog open={dialogueOpen} onOpenChange={() => setDialogOpen(false)}>
      <DialogTrigger asChild>{isRole && <TriggerForStatus />}</DialogTrigger>
      <DialogContent
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="sm:w-[600px] w-[380px] font-subtext"
      >
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            Update Status
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 font-header py-4">
          <div className="grid  items-center font-header gap-4">
            <p className="font-semibold text-[16px]  ">
              Are you sure you want to perform this operation?
            </p>
          </div>
          <form onSubmit={handleSubmit(runSubmit)}>
            <div className="flex gap-[10px] pt-4">
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      clearErrors("status");
                    }}
                  >
                    <SelectTrigger className=" w-full py-2">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>

                    <SelectContent className=" font-subtext font-medium">
                      <SelectGroup>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Suspended">Suspended</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && (
                <small className="text-red-600">{errors.status.message}</small>
              )}
            </div>

            <Button
              type="submit"
              className="bg-secondary w-full text-white text-[16px] py-7 my-3"
              disabled={loading}
            >
              {loading ? "updating status..." : "Update Status"}
            </Button>
          </form>
        </div>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  );
};

export default UpdateTeacherStatus;
