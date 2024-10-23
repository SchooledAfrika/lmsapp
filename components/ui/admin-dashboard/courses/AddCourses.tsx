"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addingCourseSchema } from "@/constants/addCourse";
export type IaddingCourse = z.infer<typeof addingCourseSchema>;
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";


import { Button } from "@/components/ui/button";


import Image from "next/image";
import PreviewItem from "../../PreviewItem";
import { useCloudinary } from "@/data-access/cloudinary";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineClass } from "react-icons/md";

const AddCourses = () => {
  const [loading, setloading] = useState<boolean>(false);
  const [bannerImg, setBannerImg] = useState<string | undefined>(undefined);
  const [coursePreviewVideo, setCoursePreviewVideo] = React.useState<string | undefined>(
    undefined
  );
  const [courseMainVideo, setCourseMainVideo] = React.useState<
    string | undefined
  >(undefined);
  const { imageUpload } = useCloudinary();
  const { videoUpload } = useCloudinary();
  // react hook form instance below here
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IaddingCourse>({
    resolver: zodResolver(addingCourseSchema),
  });

  //   instance of client
  const queryClient = useQueryClient();
  //   creating a post using mutation to the backend
  const mutation = useMutation({
    mutationKey: ["postCourse"],
    mutationFn: async (data: IaddingCourse) => {
      // console.log(data);
      const result = await fetch("/api/courses-teacher", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          price: Number(data.price),
        }),
      });

      return result;
    },
    onSuccess: async (result) => {
      queryClient.invalidateQueries({ queryKey: ["getCourse"] });
      if (result.ok) {
        const body = await result.json();
        setloading(false);
        reset();
        return toast.success(body.message);
      } else {
        setloading(false);
        return toast.error("error creating course");
      }
    },
  });
  // here we validate the datas in our form submission
  // only if there is data, before the mutation function is called
  const runSubmit: SubmitHandler<IaddingCourse> = async (data) => {
    setloading(true);
    console.log(data);
    // converting the selected image to a blob and uploading to cloudinary
    // using the useCloudinary custom hook;
    const bannerImageBlob = new Blob([data.banner[0]]);
    const bannerImageUrl = await imageUpload(bannerImageBlob);
    data.banner = bannerImageUrl;

    //Convert the coursePreview Video too
    const bannerVideoPreviewBlob = new Blob([data.previewVideo[0]]);
    const bannerVideoPreviewUrl = await videoUpload(bannerVideoPreviewBlob);
    data.previewVideo = bannerVideoPreviewUrl;

    //Convert the course Video
    const bannerVideoBlob = new Blob([data.mainVideo[0]]);
    const bannerVideoUrl = await videoUpload(bannerVideoBlob);
    data.mainVideo = bannerVideoUrl;
    mutation.mutate(data);
  };
  

  // handles remove image that is already present
  // if the user decides to remove it
  const handleRemove = () => {
    setBannerImg(undefined);
    setValue("banner", "");
  };
  // the function to generate a url for the picture
  const handleShowPix = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setValue("banner", e.target.files);
    const blob = new Blob([file]);
    const localUrl = URL.createObjectURL(blob);
    setBannerImg(localUrl);
    clearErrors("banner");
  };

  // Function to handle video preview for coursePreview
  const handleShowPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return; // Ensure a file is selected

    const file = e.target.files[0]; // Get the first selected file

    setValue("previewVideo", e.target.files); // Set the file list in the form
    const localUrl = URL.createObjectURL(file); // Create a local URL for video preview
    setCoursePreviewVideo(localUrl); // Update the state to show the preview
    clearErrors("previewVideo"); // Clear any previous errors related to coursePreview
  };

  // Function to handle video preview for courseVideo
  const handleShowCourseVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return; // Ensure a file is selected

    const file = e.target.files[0]; // Get the first selected file

    setValue("mainVideo", e.target.files); // Set the file list in the form
    const localUrl = URL.createObjectURL(file); // Create a local URL for video preview
    setCourseMainVideo(localUrl); // Update the state to show the preview
    clearErrors("mainVideo"); // Clear any previous errors related to courseVideo
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-lightGreen mt-3 bg-none border-none rounded-lg hover:bg-green-700  text-white text-[13px] font-semibold  px-3    py-2 text-start lg:block">
          <MdOutlineClass className="sm:inline-block text-[18px] hidden mr-1" />
          Add Course
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:w-[500px]  w-[380px] font-subtext">
        <ScrollArea className="h-[500px] w-full ">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">Add Course</DialogTitle>
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
                  {...register("title")}
                  name="title"
                  onChange={() => clearErrors("title")}
                  placeholder="Course Title"
                  className="col-span-6 w-full"
                />
                {errors.title && (
                  <small className="text-red-600">{errors.title.message}</small>
                )}
              </div>
              <div className=" flex flex-col">
                <Input
                  id="name"
                  type="text"
                  {...register("subject")}
                  name="subject"
                  onChange={() => clearErrors("subject")}
                  placeholder="Subject"
                  className="col-span-6 w-full"
                />
                {errors.subject && (
                  <small className="text-red-600">{errors.subject.message}</small>
                )}
              </div>
              <div className=" flex flex-col">
                <Input
                  id="name"
                  type="text"
                  {...register("grade")}
                  name="grade"
                  onChange={() => clearErrors("grade")}
                  placeholder="Grade(Grade 1 format)"
                  className="col-span-6 w-full"
                />
                {errors.grade && (
                  <small className="text-red-600">{errors.grade.message}</small>
                )}
              </div>
              <div className="flex flex-col">
                <textarea
                  cols={30}
                  rows={10}
                  id="name"
                  {...register("details")}
                  name="details"
                  onChange={() => clearErrors("details")}
                  placeholder="Course Details"
                  className="col-span-6 p-2 border text-[14px] rounded-md w-full"
                />
                {errors.details && (
                  <small className="text-red-600">
                    {errors.details.message}
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

              {bannerImg === undefined ? (
                <div className="flex flex-col border p-3 rounded-md">
                  <label className="text-[15px] font-semibold">
                    Course Banner
                  </label>
                  <input
                    type="file"
                    multiple={false}
                    accept="image/*"
                    onChange={handleShowPix}
                    name="banner"
                    placeholder="Course Image"
                    className=" w-full text-[14px] text-black bg-transparent focus:outline-none"
                  />
                </div>
              ) : (
                <PreviewItem handleRemove={handleRemove} imageItem={bannerImg} />
              )}

              <div className="flex flex-col border p-3 rounded-md">
                <label className="text-[15px] font-semibold">
                  Course Preview Video
                </label>
                <input
                  type="file"
                  multiple={false}
                  accept="video/*"
                  onChange={handleShowPreview}
                  name="previewVideo"
                  placeholder="Course Preview Video"
                  className=" w-full text-[14px] text-black bg-transparent focus:outline-none"
                />
              </div>

              <div className="flex flex-col  border p-3 rounded-md">
              <label className="text-[15px] font-semibold">
                  Main  Video
                </label>
                <input
                  type="file"
                  multiple={false}
                  accept="video/*"
                  onChange={handleShowCourseVideo}
                  name="mainVideo"
                  placeholder="Course Main Video"
                  className=" w-full text-[14px] text-black bg-transparent focus:outline-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full py-6 bg-lightGreen hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "adding course..." : "Add Course"}
              </Button>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  );
};

export default AddCourses;
