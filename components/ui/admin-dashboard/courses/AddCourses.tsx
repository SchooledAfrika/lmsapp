"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { useCloudinary } from "@/data-access/cloudinary";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineClass } from "react-icons/md";
import { useImageSizeChecker } from "@/data-access/multimedia";
import { subjectList, gradeList } from "@/constants/completeReg";

const CourseMedia: React.FC<{
  setBannerImg: React.Dispatch<React.SetStateAction<Blob | undefined | null>>;
  bannerImg: Blob | undefined | null;
  setCourseMainVideo: React.Dispatch<
    React.SetStateAction<Blob | undefined | null>
  >;
  setCoursePreviewVideo: React.Dispatch<
    React.SetStateAction<Blob | undefined | null>
  >;
  courseMainVide: Blob | null | undefined;
  coursePreviewVideo: Blob | null | undefined;
}> = ({
  setBannerImg,
  bannerImg,
  setCourseMainVideo,
  setCoursePreviewVideo,
  courseMainVide,
  coursePreviewVideo,
}) => {
  const { getWidthAndHeight, getFileSize } = useImageSizeChecker();

  // Function to handle video preview for coursePreview
  const handleShowPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return; // Ensure a file is selected
    const file = e.target.files[0];
    const fileSize = getFileSize(file);
    if (fileSize > 40) return toast.error(" preview video size exceeded");
    // now we convert to blob
    const previewBlob = new Blob([file], { type: file.type });
    return setCoursePreviewVideo(previewBlob);
  };

  // Function to handle video preview for courseVideo
  const handleShowCourseVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return; // Ensure a file is selected
    const file = e.target.files[0]; // Get the first selected file
    const fileSize = getFileSize(file);
    if (fileSize > 100) return toast.error("main video size exceeded ");
    // converting the main video to blob format here
    const mainVideoBlob = new Blob([file], { type: file.type });
    return setCourseMainVideo(mainVideoBlob);
  };

  const handleShow = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    // get the width and lenght and check if
    // it meet the requirements
    const vals = await getWidthAndHeight(e.target.files[0]);
    if (vals.width !== 1883 || vals.height !== 1011)
      return toast.error("wrong image Dimensions");
    // now we can update the state for the banner picture
    const pictureBlob = new Blob([file], { type: file.type });
    return setBannerImg(pictureBlob);
  };

  return (
    <div className=" flex flex-col gap-2">
      <div className="flex flex-col border p-3 rounded-md">
        <label className="text-[15px] font-semibold">Course Banner</label>
        <small className=" text-[10px] text-green-500">
          Banner Dimension 1883*1011{" "}
        </small>
        <input
          type="file"
          multiple={false}
          accept="image/*"
          onChange={handleShow}
          name="banner"
          placeholder="Course Image"
          className=" w-full text-[14px] text-black bg-transparent focus:outline-none"
        />
        {bannerImg === undefined && (
          <small className=" text-red-700">Banner is required</small>
        )}
      </div>

      <div className="flex flex-col border p-3 rounded-md">
        <label className="text-[15px] font-semibold">
          Course Preview Video
        </label>
        <small className=" text-[10px] text-green-500">
          Preview video size max: 40MB
        </small>
        <input
          type="file"
          multiple={false}
          accept="video/*"
          onChange={handleShowPreview}
          name="previewVideo"
          placeholder="Course Preview Video"
          className=" w-full text-[14px] text-black bg-transparent focus:outline-none"
        />
        {coursePreviewVideo === undefined && (
          <small className=" text-red-700">Preview video is required</small>
        )}
      </div>

      <div className="flex flex-col  border p-3 rounded-md">
        <label className="text-[15px] font-semibold">Main Video</label>
        <small className=" text-[10px] text-green-500">
          Main video size max: 99MB
        </small>
        <input
          type="file"
          multiple={false}
          accept="video/*"
          onChange={handleShowCourseVideo}
          name="mainVideo"
          placeholder="Course Main Video"
          className=" w-full text-[14px] text-black bg-transparent focus:outline-none"
        />
        {courseMainVide === undefined && (
          <small className=" text-red-700">Course main video is required</small>
        )}
      </div>
    </div>
  );
};

const AddCourses: React.FC<{
  showModel: boolean;
  setShowmodel: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ showModel, setShowmodel }) => {
  const [loading, setloading] = useState<boolean>(false);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [subject, setSubject] = useState<string | undefined>(undefined);
  const [grade, setGrade] = useState<string | undefined>(undefined);
  const [desc, setDesc] = useState<string | undefined>(undefined);
  const [bannerImg, setBannerImg] = useState<Blob | undefined | null>(null);
  const [coursePreviewVideo, setCoursePreviewVideo] = React.useState<
    Blob | undefined | null
  >(null);
  const [courseMainVideo, setCourseMainVideo] = React.useState<
    Blob | undefined | null
  >(null);
  const [price, setPrice] = useState<string | undefined>(undefined);

  // react hook form instance below here
  //   instance of client
  ///api/courses-teacher
  const queryClient = useQueryClient();
  //   creating a post using mutation to the backend
  const mutation = useMutation({
    mutationKey: ["postCourse"],
    mutationFn: async (formData: FormData) => {
      const result = await fetch("/api/courses-teacher", {
        method: "POST",
        body: formData,
      });
      return result;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["getCourse"] });
      setloading(false);
      setSubject(undefined);
      setTitle(undefined);
      setGrade(undefined);
      setDesc(undefined);
      setBannerImg(null);
      setCourseMainVideo(null);
      setCoursePreviewVideo(null);
      setShowmodel(false);
    },
  });
  // function to handle uploading files
  const handleSubmit = () => {
    // check for basic fields
    if (!title || !subject || !grade || !desc) {
      return toast.error("please enter all fields");
    }
    // check for multi media fields
    // and set error if they are not present yet
    if (!bannerImg) setBannerImg(undefined);
    if (!coursePreviewVideo) setCoursePreviewVideo(undefined);
    if (!courseMainVideo) setCourseMainVideo(undefined);
    // dont execute further if any of the above condition is actually true,
    if (!bannerImg || !coursePreviewVideo || !courseMainVideo) return;
    // now we can call our mutation function
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subject", subject);
    formData.append("grade", grade);
    formData.append("desc", desc);
    formData.append("price", price as string);
    formData.append("bannerImg", bannerImg);
    formData.append("coursePreviewVideo", coursePreviewVideo);
    formData.append("courseMainVideo", courseMainVideo);

    setloading(true);
    mutation.mutate(formData);
  };

  return (
    <Dialog open={showModel} onOpenChange={() => setShowmodel(false)}>
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
            <div className=" flex flex-col gap-2 w-full px-2">
              <div className=" flex flex-col">
                <Input
                  id="name"
                  type="text"
                  name="title"
                  placeholder="Course Title"
                  className="col-span-6 w-full"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className=" flex flex-col">
                <select
                  className=" text-gray-500 py-3 px-2 border border-gray-300 rounded-md cursor-pointer"
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="" disabled selected>
                    Select Subject
                  </option>
                  {subjectList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" flex flex-col">
                <select
                  className=" text-gray-500 py-3 px-2 border border-gray-300 rounded-md cursor-pointer"
                  onChange={(e) => setGrade(e.target.value)}
                >
                  <option value="" disabled selected>
                    Select Grade
                  </option>
                  {gradeList.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <textarea
                  cols={30}
                  rows={10}
                  id="name"
                  name="details"
                  placeholder="Course Details"
                  className="col-span-6 p-2 border text-[14px] rounded-md w-full"
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              <div>
                <div className=" w-full rounded-md h-[60px] font-header border bg-white flex items-center text-black justify-between px-2 ">
                  <input
                    name="price"
                    placeholder="Price"
                    type="number"
                    className=" w-full text-[14px] text-black bg-transparent focus:outline-none"
                    onChange={(e) => setPrice(e.target.value)}
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
              </div>
              <CourseMedia
                bannerImg={bannerImg}
                setBannerImg={setBannerImg}
                setCourseMainVideo={setCourseMainVideo}
                setCoursePreviewVideo={setCoursePreviewVideo}
                courseMainVide={courseMainVideo}
                coursePreviewVideo={coursePreviewVideo}
              />
              <Button
                onClick={handleSubmit}
                className="w-full py-6 bg-lightGreen hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "adding course..." : "Add Course"}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AddCourses;
