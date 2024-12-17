"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { attendanceSchema } from "@/constants/attendance";
export type Iattendance = z.infer<typeof attendanceSchema>;
import {
  Dialog,
  DialogContent,
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiCalendarDate } from "react-icons/ci";


interface AttendanceFormProps {
    showModel: boolean;
    setShowmodel: React.Dispatch<React.SetStateAction<boolean>>;
    sessionId: string; 
    name: string;
  }

const AttendanceForm: React.FC<AttendanceFormProps> = ({showModel, setShowmodel, sessionId, name}) => {
  const [loading, setloading] = useState<boolean>(false);
  

  // react hook form instance below here
  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Iattendance>({
    resolver: zodResolver(attendanceSchema),
  });

  //   instance of client
  const queryClient = useQueryClient();
  //   creating a post using mutation to the backend
  const mutation = useMutation({
    mutationKey: ["post"],
    mutationFn: async (data: Iattendance) => {
      // console.log(data);
      const result = await fetch("", {
        method: "POST",
        body: JSON.stringify({
          ...data,
        }),
      });

      return result;
    },
    onSuccess: async (result) => {
      const message = await result.json();
      queryClient.invalidateQueries({ queryKey: ["mark"] });
      setShowmodel(false);
      if (result.ok) {
        setloading(false);
        reset();
        return toast.success(message.message);
      }
      if (result.status === 401) {
        setloading(false);
        return toast.error(message.message);
      }
    },
  });
  // here we validate the datas in our form submission
  // only if there is data, before the mutation function is called
  const runSubmit: SubmitHandler<Iattendance> = async (data) => {
    setloading(true);
    mutation.mutate(data);
  };

  return (
    <Dialog open={showModel} onOpenChange={() => setShowmodel(false)}>
      <DialogTrigger asChild>
        <Button className="bg-lightGreen mt-3 bg-none border-none rounded-lg hover:bg-green-700  text-white text-[13px] font-semibold  px-3 w-full    py-2 text-center lg:block">
          <CiCalendarDate className="sm:inline-block text-[18px] hidden mr-1" />
          Mark Attendance  
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:w-[500px]  w-[380px] font-subtext">
        <ScrollArea className=" w-full ">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Mark Attendance for {name}
            </DialogTitle>
          </DialogHeader>

          <div className="w-[96%] mt-2">
            <form
              onSubmit={handleSubmit(runSubmit)}
              className=" flex flex-col gap-2 w-full px-2"
            >
              <div className="flex flex-col">
                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full p-4 justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                        
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full col-span-6 p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onDayClick={field.onChange}
                          className="font-subtext"
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.date && (
                  <small className=" text-red-600">{errors.date.message}</small>
                )}
              </div>

              <div className="flex flex-col ">
                <Controller
                  control={control}
                  name="duration"
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        clearErrors("duration");
                      }}
                    >
                      <SelectTrigger className=" w-full py-6">
                        <SelectValue placeholder="Select Duration" />
                      </SelectTrigger>

                      <SelectContent className=" font-subtext font-medium">
                        <ScrollArea className="h-[200px] w-full ">
                          <SelectGroup>
                            <SelectItem value="Absent">Absent</SelectItem>
                            <SelectItem value="30 minutes">
                              30 minutes
                            </SelectItem>
                            <SelectItem value="1 hour">1 hour</SelectItem>
                            <SelectItem value="1 hour 30 minutes">
                              1 hour 30 minutes
                            </SelectItem>
                            <SelectItem value="2 hours">2 hours</SelectItem>
                          </SelectGroup>
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.duration && (
                  <small className="text-red-600">
                    {errors.duration.message}
                  </small>
                )}
              </div>

              <Button
                type="submit"
                className="w-full py-6 text-[16px] bg-lightGreen hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "marking attendance..." : "Mark Attendance"}
              </Button>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  );
};

export default AttendanceForm;
