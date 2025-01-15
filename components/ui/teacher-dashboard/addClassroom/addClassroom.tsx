"use client";
import React, { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  addingClassroomSchema,
  Schedules,
  Subject,
  AllGrade,
} from "@/constants/addClassroom";
export type IaddingClassroom = z.infer<typeof addingClassroomSchema>;
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
import { Input } from "@/components/ui/input";
import { SiGoogleclassroom } from "react-icons/si";
import { format } from "date-fns";
import { FaHourglassStart, FaHourglassEnd } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import PreviewItem from "../../PreviewItem";
import { useCloudinary } from "@/data-access/cloudinary";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CommonDashboardContext } from "@/providers/Statecontext";

const AddClassroom: React.FC<{
  showModel: boolean;
  setShowmodel: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ showModel, setShowmodel }) => {
  const [loading, setloading] = useState<boolean>(false);
  const [banner, setBanner] = useState<string | undefined>(undefined);
  const { setShowPricing } = useContext(CommonDashboardContext);
  const [schedules, setSchedules] = useState<string[]>([]);
  const { imageUpload } = useCloudinary();

  // react hook form instance below here
  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IaddingClassroom>({
    resolver: zodResolver(addingClassroomSchema),
  });

  //   instance of client
  const queryClient = useQueryClient();
  //   creating a post using mutation to the backend
  const mutation = useMutation({
    mutationKey: ["post"],
    mutationFn: async (data: IaddingClassroom) => {
      // console.log(data);
      const result = await fetch("/api/class", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          price: Number(data.price),
          maxCapacity: Number(data.maxCapacity),
        }),
      });

      return result;
    },
    onSuccess: async (result) => {
      const message = await result.json();
      queryClient.invalidateQueries({ queryKey: ["add"] });
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

      setloading(false);
      toast.error(message.message);
      return setShowPricing(true);
    },
  });
  // here we validate the datas in our form submission
  // only if there is data, before the mutation function is called
  const runSubmit: SubmitHandler<IaddingClassroom> = async (data) => {
    setloading(true);
    // converting the selected image to a blob and uploading to cloudinary
    // using the useCloudinary custom hook;
    const bannerBlob = new Blob([data.classBanner[0]]);
    const bannerUrl = await imageUpload(bannerBlob);
    data.classBanner = bannerUrl;
    mutation.mutate(data);
  };

  //this function below handle schedule selection
  const handleSchedule = (item: string) => {
    // checking if the scheduled day is already in the array
    // if there is remove, else add it
    let arrayInstance = [...schedules];
    console.log(schedules);
    const checkSchedule = arrayInstance.find((value) => value === item);
    if (checkSchedule) {
      const removedSchedule = arrayInstance.filter((value) => value !== item);
      arrayInstance = [...removedSchedule];
      setSchedules(removedSchedule);
      setValue("schedules", arrayInstance);
      clearErrors("schedules");
    } else {
      arrayInstance.push(item);
      setSchedules(arrayInstance);
      setValue("schedules", arrayInstance);
      clearErrors("schedules");
    }
  };
  // handles remove image that is already present
  // if the user decides to remove it
  const handleRemove = () => {
    setBanner(undefined);
    setValue("classBanner", "");
  };
  // the function to generate a url for the picture
  const handleShowPix = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setValue("classBanner", e.target.files);
    const blob = new Blob([file]);
    const localUrl = URL.createObjectURL(blob);
    setBanner(localUrl);
    clearErrors("classBanner");
  };

  return (
    <Dialog open={showModel} onOpenChange={() => setShowmodel(false)}>
      <DialogTrigger asChild>
        <Button className="bg-lightGreen mt-3 bg-none border-none rounded-lg hover:bg-green-700  text-white text-[13px] font-semibold  px-3    py-2 text-start lg:block">
          <SiGoogleclassroom className="sm:inline-block text-[18px] hidden mr-1" />
          Create Classroom
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:w-[500px]  w-[380px] font-subtext">
        <ScrollArea className="h-[500px] w-full ">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">
              Create Classroom
            </DialogTitle>
          </DialogHeader>

          <div className="w-[96%] mt-2">
            <form
              onSubmit={handleSubmit(runSubmit)}
              className=" flex flex-col gap-2 w-full px-2"
            >
              <div className=" flex flex-col">
                <Input
                  id="name"
                  type="text"
                  {...register("className")}
                  name="className"
                  onChange={() => clearErrors("className")}
                  placeholder="Class Name"
                  className="col-span-6 w-full"
                />
                {errors.className && (
                  <small className="text-red-600">
                    {errors.className.message}
                  </small>
                )}
              </div>
              <div className="flex flex-col">
                <Controller
                  control={control}
                  name="subject"
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        clearErrors("subject");
                      }}
                    >
                      <SelectTrigger className=" w-full py-6">
                        <SelectValue placeholder="Subject" />
                      </SelectTrigger>

                      <SelectContent className=" font-subtext font-medium">
                        <ScrollArea className="h-[500px] w-full ">
                          <SelectGroup>
                            {Subject.map((item, index) => (
                              <SelectItem key={index} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.subject && (
                  <small className="text-red-600">
                    {errors.subject.message}
                  </small>
                )}
              </div>
              <div className="flex flex-col ">
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
                        <ScrollArea className="h-[500px] w-full ">
                          <SelectGroup>
                            {AllGrade.map((item, value) => (
                              <SelectItem key={value} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.grade && (
                  <small className="text-red-600">{errors.grade.message}</small>
                )}
              </div>
              <div className="flex flex-col">
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
                      <SelectTrigger className="w-full py-6">
                        <SelectValue placeholder="Duration" />
                      </SelectTrigger>

                      <SelectContent className=" font-subtext font-medium">
                        <ScrollArea className="h-[200px] w-full ">
                          <SelectGroup>
                            <SelectItem value="2weeks">2 Weeks</SelectItem>
                            <SelectItem value="1month">1 Month</SelectItem>
                            <SelectItem value="2months">2 Months</SelectItem>
                            <SelectItem value="3months">3 Months</SelectItem>
                            <SelectItem value="6months">6 Months</SelectItem>
                            <SelectItem value="1year">1 Year</SelectItem>
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
              <div className="flex flex-col">
                <Controller
                  control={control}
                  name="classStarts"
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
                          <FaHourglassStart className="mr-2 h-4 text-lightGreen w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Class Starts</span>
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
                {errors.classStarts && (
                  <small className=" text-red-600">
                    {errors.classStarts.message}
                  </small>
                )}
              </div>
              <div className="flex flex-col">
                <Controller
                  control={control}
                  name="classEnds"
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
                          <FaHourglassEnd className="mr-2 text-lightGreen h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Class Ends</span>
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
                {errors.classEnds && (
                  <small className=" text-red-600">
                    {errors.classEnds.message}
                  </small>
                )}
              </div>

              <div>
                <label className="font-bold text-[16px]">Class Schedule</label>
                <div className="grid grid-cols-3 gap-2 w-full rounded-md border p-3 ">
                  {Schedules.map((schedule, index) => (
                    <div
                      onClick={() => handleSchedule(schedule)}
                      key={index}
                      className=" flex justify-between items-center md:px-2 cursor-pointer hover:text-green-500"
                    >
                      <p className=" text-[14px]">{schedule.toLowerCase()}</p>
                      <input
                        type="checkbox"
                        name="schedules"
                        checked={schedules.includes(schedule)}
                        value={schedule}
                        className="appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-green-600 checked:border-transparent focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
                {errors.schedules && (
                  <small className=" text-red-600">
                    {errors.schedules.message}
                  </small>
                )}
              </div>

              <div className="flex flex-col">
                <Controller
                  control={control}
                  name="classTime"
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        clearErrors("classTime");
                      }}
                    >
                      <SelectTrigger className=" w-full py-6">
                        <SelectValue placeholder="Class Timing" />
                      </SelectTrigger>

                      <SelectContent className=" font-subtext font-medium">
                        <ScrollArea className="h-[250px] w-full ">
                          <SelectGroup>
                            <SelectItem value="7AM">7AM</SelectItem>
                            <SelectItem value="8AM">8AM</SelectItem>
                            <SelectItem value="9AM">9AM</SelectItem>
                            <SelectItem value="10AM">10AM</SelectItem>
                            <SelectItem value="11AM">11AM</SelectItem>
                            <SelectItem value="12PM">12PM</SelectItem>
                            <SelectItem value="1PM">1PM</SelectItem>
                            <SelectItem value="2PM">2PM</SelectItem>
                            <SelectItem value="3PM">3PM</SelectItem>
                            <SelectItem value="4PM">4PM</SelectItem>
                            <SelectItem value="5PM">5PM</SelectItem>
                            <SelectItem value="6PM">6PM</SelectItem>
                            <SelectItem value="7PM">7PM</SelectItem>
                          </SelectGroup>
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.classTime && (
                  <small className="text-red-600">
                    {errors.classTime.message}
                  </small>
                )}
              </div>

              <div>
                <div className=" w-full rounded-md h-[60px] font-header border bg-white flex items-center text-black justify-between px-2 ">
                  <input
                    {...register("price")}
                    name="price"
                    placeholder="Price"
                    type="number"
                    className=" w-full text-[14px] text-black bg-transparent focus:outline-none"
                  />

                  <div className=" w-[50px] cursor-pointer font-bold aspect-square rounded-full flex items-center justify-center">
                    <Image
                      src="/usflag.png"
                      alt="usflag"
                      width={100}
                      height={100}
                      className="w-[40px] h-[40px] rounded-full"
                    />
                  </div>
                </div>
                {errors.price && (
                  <small className="text-red-600">{errors.price.message}</small>
                )}
              </div>
              <div className="flex flex-col">
                <Input
                  id="maxCapacity"
                  {...register("maxCapacity")}
                  name="maxCapacity"
                  placeholder="Maximum Capacity"
                  className=""
                />

                {errors.maxCapacity && (
                  <small className="text-red-600">
                    {errors.maxCapacity.message}
                  </small>
                )}
              </div>
              {banner === undefined ? (
                <div className="flex flex-col">
                  <input
                    type="file"
                    multiple={false}
                    accept="image/*"
                    onChange={handleShowPix}
                    name="classBanner"
                    placeholder="class banner"
                    className=" w-full text-[14px] text-black bg-transparent focus:outline-none"
                  />
                </div>
              ) : (
                <PreviewItem handleRemove={handleRemove} imageItem={banner} />
              )}

              <div className="flex font-subtext flex-col">
                <div className="flex items-center space-x-2">
                  <input
                    {...register("publicClass")}
                    name="publicClass"
                    className="w-4 h-4 px-2 accent-lightGreen"
                    type="checkbox"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Public class
                  </label>
                </div>
                <p className="text-[12px] my-3">
                  Your class is visible and open to all on the platform
                </p>
              </div>
              <Button
                type="submit"
                className="w-full py-6 bg-lightGreen hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "creating class..." : "Add Classroom"}
              </Button>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  );
};

export default AddClassroom;
