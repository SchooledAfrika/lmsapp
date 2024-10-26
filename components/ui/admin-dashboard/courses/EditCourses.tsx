"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { editingCourseSchema } from "@/constants/editCourse";
export type IeditingCourse = z.infer<typeof editingCourseSchema>;
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

interface Icourse {
  id: string;
}

const EditCourses: React.FC<Icourse> = ({ id }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [bannerImg, setBannerImg] = useState<string | undefined>(undefined);
  const [coursePreviewVideo, setCoursePreviewVideo] = useState<string | undefined>(undefined);
  const [courseMainVideo, setCourseMainVideo] = useState<string | undefined>(undefined);
  const { imageUpload, videoUpload } = useCloudinary(); // Destructure once to avoid repetition

  const queryClient = useQueryClient();

  // react-hook-form instance
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IeditingCourse>({
    resolver: zodResolver(editingCourseSchema),
  });

  // Mutation for editing course
  const { mutate } = useMutation({
    mutationKey: ["editCourse"],
    mutationFn: async (data: IeditingCourse) => {
      console.log("Mutating with data:", data);
      const result = await fetch("/api/courses-from-admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, id }), // Include course data and id
      });
      return result;
    },
    onSuccess: async (result) => {
      queryClient.invalidateQueries({ queryKey: ["getCourse"] });
      setLoading(false);
      reset();

      if (result.ok) {
        const body = await result.json();
        toast.success(body.message);
      } else {
        toast.error("Error editing course");
      }
    },
    onError: () => {
      setLoading(false);
      toast.error("An error occurred during editing.");
    },
  });

  // Handle edit course submission
  const handleEdit: SubmitHandler<IeditingCourse> = async (data) => {
    console.log("Form data:", data);
    setLoading(true);

    try {
      // Convert and upload banner image
      if (data.banner?.[0]) {
        const bannerBlob = new Blob([data.banner[0]]);
        const bannerUrl = await imageUpload(bannerBlob);
        data.banner = bannerUrl;
      }

      // Convert and upload preview video
      if (data.previewVideo?.[0]) {
        const previewVideoBlob = new Blob([data.previewVideo[0]]);
        const previewVideoUrl = await videoUpload(previewVideoBlob);
        data.previewVideo = previewVideoUrl;
      }

      // Convert and upload main course video
      if (data.mainVideo?.[0]) {
        const mainVideoBlob = new Blob([data.mainVideo[0]]);
        const mainVideoUrl = await videoUpload(mainVideoBlob);
        data.mainVideo = mainVideoUrl;
      }

      // Trigger mutation to edit course
      mutate(data);
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred during file upload.");
    }
  };

  // Handle banner image preview
  const handleShowPix = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const localUrl = URL.createObjectURL(new Blob([file]));
    setValue("banner", e.target.files);
    setBannerImg(localUrl);
    clearErrors("banner");
  };

  // Handle preview video
  const handleShowPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const localUrl = URL.createObjectURL(new Blob([file]));
    setValue("previewVideo", e.target.files);
    setCoursePreviewVideo(localUrl);
    clearErrors("previewVideo");
  };

  // Handle main course video preview
  const handleShowCourseVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const localUrl = URL.createObjectURL(new Blob([file]));
    setValue("mainVideo", e.target.files);
    setCourseMainVideo(localUrl);
    clearErrors("mainVideo");
  };

  // Handle removing banner image
  const handleRemove = () => {
    setBannerImg(undefined);
    setValue("banner", "");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-lightGreen cursor-pointer absolute -translate-y-1/2 left-3 rounded-md text-white text-[12px] font-bold px-4 py-2 text-center lg:block">
          Edit Course
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:w-[500px] w-[380px] font-subtext">
        <ScrollArea className="h-[500px] w-full">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">Edit Course</DialogTitle>
          </DialogHeader>

          <div className="w-[96%] mt-2">
            <form onSubmit={handleSubmit(handleEdit)} className="flex flex-col gap-2 w-full px-2">
              {/* Form fields for title, subject, grade, details, and price */}
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
              {/* Banner image upload with preview */}
              {bannerImg === undefined ? (
                <div className="flex flex-col border p-3 rounded-md">
                  <label className="text-[15px] font-semibold">Course Banner</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleShowPix}
                    name="banner"
                    className="w-full text-[14px] text-black bg-transparent focus:outline-none"
                  />
                </div>
              ) : (
                <PreviewItem handleRemove={handleRemove} imageItem={bannerImg} />
              )}

              {/* Preview video upload */}
              <div className="flex flex-col border p-3 rounded-md">
                <label className="text-[15px] font-semibold">Course Preview Video</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleShowPreview}
                  name="previewVideo"
                  className="w-full text-[14px] text-black bg-transparent focus:outline-none"
                />
              </div>

              {/* Main course video upload */}
              <div className="flex flex-col border p-3 rounded-md">
                <label className="text-[15px] font-semibold">Main Course Video</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleShowCourseVideo}
                  name="mainVideo"
                  className="w-full text-[14px] text-black bg-transparent focus:outline-none"
                />
              </div>

              {/* Submit button */}
              <Button type="submit" className="w-full py-6 bg-lightGreen hover:bg-green-700" disabled={loading}>
                {loading ? "Editing course..." : "Edit Course"}
              </Button>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  );
};

export default EditCourses;
