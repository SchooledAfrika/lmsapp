"use client";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { attendanceSchema } from "@/constants/attendance";
export type Iattendance = z.infer<typeof attendanceSchema>;
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { toast } from "react-toastify";

interface AttendanceFormProps {
  showModel: boolean;
  setShowmodel: React.Dispatch<React.SetStateAction<boolean>>;
  sessionId: string;
  name: string;
}

const AttendanceForm: React.FC<AttendanceFormProps> = ({
  showModel,
  setShowmodel,
  sessionId,
  name,
}) => {
  const [loading, setloading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [dateError, setDateError] = useState<boolean>(false);
  const [duration, setDuration] = useState<string | undefined>(undefined);
  const [classHeld, setClassHeld] = useState<boolean>(false);
  const [classError, setClassError] = useState<boolean>(false);
  // useEffect to watch for field changes
  useEffect(() => {
    if (selectedDate) {
      setDateError(false);
    }
    if (duration) {
      setClassError(false);
    }
  }, [selectedDate, duration]);

  //   instance of client
  const queryClient = useQueryClient();
  //   creating a post using mutation to the backend
  const mutation = useMutation({
    mutationKey: ["post"],
    mutationFn: async () => {
      // console.log(data);
      const result = await fetch("/api/sessions-attendance", {
        method: "POST",
        body: JSON.stringify({
          classday: selectedDate,
          held: classHeld,
          duration: classHeld && duration,
          sessionId,
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
        setShowmodel(false);
        setClassHeld(false);
        setSelectedDate(undefined);
        return toast.success(message.message);
      }
      if (!result.ok) {
        setloading(false);
        return toast.error(message.message);
      }
    },
  });
  // submit the form
  const handleSubmit = () => {
    if (!selectedDate) {
      return setDateError(true);
    }
    if (classHeld && !duration) {
      return setClassError(true);
    }
    setloading(true);
    mutation.mutate();
  };

  return (
    <Dialog open={showModel} onOpenChange={() => setShowmodel(false)}>
      <DialogContent className="sm:w-[500px]  w-[380px] font-subtext">
        <ScrollArea className=" w-full ">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Mark Attendance for {name}
            </DialogTitle>
          </DialogHeader>

          <div className="w-[96%] mt-2">
            <div className=" flex flex-col gap-2 w-full px-2">
              <div className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full p-4 justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      {selectedDate ? (
                        format(selectedDate, "PPP")
                      ) : (
                        <span>Date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full col-span-6 p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onDayClick={setSelectedDate}
                      className="font-subtext"
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {dateError && (
                  <small className=" text-red-600">select date</small>
                )}
              </div>

              <div className="flex flex-col ">
                <Select
                  onValueChange={(value) => {
                    setClassHeld(value === "true");
                  }}
                >
                  <SelectTrigger className=" w-full py-6">
                    <SelectValue placeholder="was class held" />
                  </SelectTrigger>

                  <SelectContent className=" font-subtext font-medium">
                    <ScrollArea className="h-[200px] w-full ">
                      <SelectGroup>
                        <SelectItem value="true">True</SelectItem>
                        <SelectItem value="false">False</SelectItem>
                      </SelectGroup>
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>

              {classHeld && (
                <div className="flex flex-col ">
                  <Select
                    onValueChange={(value) => {
                      setDuration(value);
                    }}
                  >
                    <SelectTrigger className=" w-full py-6">
                      <SelectValue placeholder="Select Duration" />
                    </SelectTrigger>

                    <SelectContent className=" font-subtext font-medium">
                      <ScrollArea className="h-[200px] w-full ">
                        <SelectGroup>
                          <SelectItem value="0.5">30 minutes</SelectItem>
                          <SelectItem value="1">1 hour</SelectItem>
                          <SelectItem value="1.5">1 hour 30 minutes</SelectItem>
                          <SelectItem value="2">2 hours</SelectItem>
                        </SelectGroup>
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                  {!duration && (
                    <small className="text-red-600">select duration</small>
                  )}
                </div>
              )}

              <Button
                onClick={handleSubmit}
                className="w-full py-6 text-[16px] bg-lightGreen hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "marking attendance..." : "Mark Attendance"}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AttendanceForm;
