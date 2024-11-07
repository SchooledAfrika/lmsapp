"use client";
import React, { useState, useEffect, useRef } from "react";
import Container from "@/components/Container";

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
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaGraduationCap } from "react-icons/fa6";
import Image from "next/image";
import { FaLock } from "react-icons/fa";
//import { Checkout } from "./Courses";
import { useSession } from "next-auth/react";
import { CourseCreator } from "@/components/Courses";

interface courseProps {
  title: string;
  details: string;
  teacher: string;
  teacherPhoto: string | null;
  banner: string;
  previewVideo: string;
  mainVideo: string;
  price: number;
  id: string;
  byAdmin: boolean;
}

const SinglePurchasedCourse = ({
  title,
  details,
  teacher,
  teacherPhoto,
  banner,
  previewVideo,
  mainVideo,
  price,
  id,
  byAdmin,
}: courseProps) => {
  const [activeVideo, setActiveVideo] = useState(previewVideo);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { status } = useSession();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Reload the video source when activeVideo changes
    }
  }, [activeVideo]);

  return (
    <Container>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-lightGreen cursor-pointer mb-6 absolute -translate-y-1/2 left-3 rounded-md text-white text-[12px] font-bold  py-2 text-center lg:block">
            View Course
          </Button>
        </DialogTrigger>
        <DialogContent
          onClick={(e) => e.stopPropagation()}
          className="sm:w-[90%] w-[400px] bg-stone-100 font-subtext"
        >
          <ScrollArea className="h-[500px] w-full px-4 ">
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
                    poster={banner}
                    className="rounded-md w-[400px] md:w-[600px]"
                  >
                    <source src={activeVideo} type="video/mp4" />
                  </video>
                  <p className="w-[600px]  sm:hidden block text-[14px] font-bold leading-5 py-3">
                    {title}
                  </p>
                  <div className=" sm:hidden">
                    <CourseCreator
                      name={teacher}
                      profilePhoto={teacherPhoto!}
                      byAdmin={byAdmin}
                    />
                  </div>
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
                            <p className="text-[13px] leading-5 ">{details}</p>
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
                                    activeVideo === previewVideo
                                      ? "bg-lightGreen text-white" // Apply background if selected
                                      : "hover:bg-lightGreen hover:text-white"
                                  }`}
                                  onClick={() => setActiveVideo(previewVideo)}
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
                                    activeVideo === mainVideo
                                      ? "bg-lightGreen text-white" // Apply background if selected
                                      : "hover:bg-lightGreen hover:text-white"
                                  }`}
                                  onClick={() => setActiveVideo(mainVideo)}
                                >
                                  <div className="bg-lightGreen flex w-[20px] h-[20px] rounded-full place-items-center">
                                    <span className="text-white text-[13px] mx-auto">
                                      2
                                    </span>
                                  </div>

                                  <p className="font-medium text-[14px]">
                                    Main Video
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
                    {activeVideo === previewVideo
                      ? "Preview"
                      : "Full Course Video"}
                  </p>
                  <p className="w-[600px] sm:block hidden text-[14px] font-bold leading-5 py-3">
                    {title}
                  </p>
                  <p className="w-[600px] sm:block hidden mb-4 text-[13px] leading-5 ">
                    {details}
                  </p>
                  <div>
                    <CourseCreator
                      name={teacher}
                      profilePhoto={teacherPhoto!}
                      byAdmin={byAdmin}
                    />
                  </div>
                </div>
                <div className=" md:flex-4 sm:block hidden  font-header bg-stone-50 p-3 rounded-md">
                  <p className="font-semibold">Course Contents</p>
                  <div className="flex flex-col mt-3">
                    {/* Course Preview */}
                    <div
                      className={`flex space-x-3 p-3 mb-3 rounded-md cursor-pointer ${
                        activeVideo === previewVideo
                          ? "bg-lightGreen text-white" // Apply background if selected
                          : "hover:bg-lightGreen hover:text-white"
                      }`}
                      onClick={() => setActiveVideo(previewVideo)}
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
                      className={`flex space-x-3 p-3 mb-3 rounded-md cursor-pointer ${
                        activeVideo === mainVideo
                          ? "bg-lightGreen text-white" // Apply background if selected
                          : "hover:bg-lightGreen hover:text-white"
                      }`}
                      onClick={() => setActiveVideo(mainVideo)}
                    >
                      <div className="bg-lightGreen flex w-[20px] h-[20px] rounded-full place-items-center">
                        <span className="text-white text-[13px] mx-auto">
                          2
                        </span>
                      </div>

                      <p className="font-medium text-[14px]">
                        Course Main Video
                      </p>
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

export default SinglePurchasedCourse;
