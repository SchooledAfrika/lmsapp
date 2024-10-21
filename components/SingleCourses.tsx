"use client";
import React, { useState, useEffect, useRef } from "react";
import Container from "./Container";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaGraduationCap } from "react-icons/fa6";

interface courseProps {
  title: string;
  description: string;
  teacher: string;
  courseBanner: string;
  coursePreview: string;
  courseVideo: string;
}

const SingleCourses = ({
  title,
  description,
  teacher,
  courseBanner,
  coursePreview,
  courseVideo,
}: courseProps) => {
  const [activeVideo, setActiveVideo] = useState(coursePreview);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Reload the video source when activeVideo changes
    }
  }, [activeVideo]);

  return (
    <Container>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-lightGreen cursor-pointer absolute -translate-y-1/2 left-3 rounded-md text-white text-[12px] font-bold px-4 py-2 text-center lg:block">
            Preview Course
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:w-[90%] w-[400px] bg-stone-100 font-subtext">
          <ScrollArea className="h-[500px] w-full ">
            <div className="grid gap-4 font-header py-4">
              <div className=" w-full flex items-center font-header mb-6 justify-between">
                <p className=" font-bold text-black">Course Overview</p>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-2 text-dimOrange font-bold border-dimOrange"
                  >
                    Leave
                  </Button>
                </DialogClose>
              </div>
              <div className="flex sm:flex-row flex-col justify-between my-6">
                <div className="md:flex-7 relative cursor-pointer">
                  <video
                    ref={videoRef}
                    width="600"
                    controls
                    poster={"/course-img.jpeg"}
                    className="rounded-md w-[400px] md:w-[600px]"
                  >
                    <source src={activeVideo} type="video/mp4" />
                  </video>
                  <p className="w-[600px]  sm:hidden block text-[14px] font-bold leading-5 py-3">
                    {title}
                  </p>

                  <p className="w-[600px]  sm:hidden  text-[12px] inline font-semibold leading-5 py-3 ">
                    {" "}
                    <FaGraduationCap className="inline mr-1 text-lg" />
                    {teacher}
                  </p>
                  <Tabs
                    defaultValue="description"
                    className="my-3 w-[400px] sm:hidden block"
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="description">
                        Course Description
                      </TabsTrigger>
                      <TabsTrigger value="content">Course Content</TabsTrigger>
                    </TabsList>
                    <TabsContent value="description">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-[18px]">
                            Description
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="px-2 overflow-x-auto w-[350px]">
                          <div className="">
                            <p className="text-[13px] leading-5 ">
                              {description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="content">
                      <Card>
                        <CardContent className="space-y-2">
                          <div className="space-y-1">
                            <div className="  font-header bg-white rounded-md">
                              <p className="font-semibold">Course Contents</p>
                              <div className="flex flex-col mt-3">
                                {/* Course Preview */}
                                <div
                                  className={`flex space-x-3 p-3 mb-3 rounded-md cursor-pointer ${
                                    activeVideo === coursePreview
                                      ? "bg-lightGreen text-white" // Apply background if selected
                                      : "hover:bg-lightGreen hover:text-white"
                                  }`}
                                  onClick={() => setActiveVideo(coursePreview)}
                                >
                                  <div className="bg-lightGreen flex w-[20px] h-[20px] rounded-full place-items-center">
                                    <span className="text-white text-[13px] mx-auto">
                                      1
                                    </span>
                                  </div>

                                  <p className="font-medium text-[14px]">
                                    Course Preview
                                  </p>
                                </div>
                                {/* Course Video */}
                                <div
                                  className={`flex space-x-3 p-3 rounded-md cursor-pointer ${
                                    activeVideo === courseVideo
                                      ? "bg-lightGreen text-white" // Apply background if selected
                                      : "hover:bg-lightGreen hover:text-white"
                                  }`}
                                  onClick={() => setActiveVideo(courseVideo)}
                                >
                                  <div className="bg-lightGreen flex w-[20px] h-[20px] rounded-full place-items-center">
                                    <span className="text-white text-[13px] mx-auto">
                                      2
                                    </span>
                                  </div>

                                  <p className="font-medium text-[14px]">
                                    Course Video
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                  <p className="font-medium pt-2 text-[14px]">
                    Currently playing:{" "}
                    {activeVideo === coursePreview
                      ? "Preview"
                      : "Full Course Video"}
                  </p>
                  <p className="w-[600px] sm:block hidden text-[14px] font-bold leading-5 py-3">
                    {title}
                  </p>
                  <p className="w-[600px] sm:block hidden text-[13px] leading-5 ">
                    {description}
                  </p>
                  <p className="w-[600px] sm:inline hidden text-[12px]  font-semibold leading-5 py-3 ">
                    {" "}
                    <FaGraduationCap className="inline mr-1 text-lg" />
                    {teacher}
                  </p>
                </div>
                <div className=" md:flex-4 sm:block hidden  font-header bg-stone-50 p-3 rounded-md">
                  <p className="font-semibold">Course Contents</p>
                  <div className="flex flex-col mt-3">
                    {/* Course Preview */}
                    <div
                      className={`flex space-x-3 p-3 mb-3 rounded-md cursor-pointer ${
                        activeVideo === coursePreview
                          ? "bg-lightGreen text-white" // Apply background if selected
                          : "hover:bg-lightGreen hover:text-white"
                      }`}
                      onClick={() => setActiveVideo(coursePreview)}
                    >
                      <div className="bg-lightGreen flex w-[20px] h-[20px] rounded-full place-items-center">
                        <span className="text-white text-[13px] mx-auto">
                          1
                        </span>
                      </div>

                      <p className="font-medium text-[14px]">Course Preview</p>
                    </div>
                    {/* Course Video */}
                    <div
                      className={`flex space-x-3 p-3 rounded-md cursor-pointer ${
                        activeVideo === courseVideo
                          ? "bg-lightGreen text-white" // Apply background if selected
                          : "hover:bg-lightGreen hover:text-white"
                      }`}
                      onClick={() => setActiveVideo(courseVideo)}
                    >
                      <div className="bg-lightGreen flex w-[20px] h-[20px] rounded-full place-items-center">
                        <span className="text-white text-[13px] mx-auto">
                          2
                        </span>
                      </div>

                      <p className="font-medium text-[14px]">Course Video</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default SingleCourses;