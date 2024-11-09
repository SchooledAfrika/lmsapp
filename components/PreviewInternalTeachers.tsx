"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { internalTeachers } from "@/constants/index";
import Image from "next/image";
import Container from "./Container";
import { Button } from "./ui/button";
import Link from "next/link";

const PreviewInternalTeachers = () => {
  return (
    <Container>
      <div className="max-w-full font-header mx-auto px-4 py-24 mb-12">
        <div className="w-full flex flex-col items-center">
          <h2 className="text-2xl font-header text-lightGreen font-bold">
            <span className="hidden md:inline-flex w-20 md:w-60 mb-2 py-[.5px] lgl:w-72 h-[.5px] bg-lightGreen mr-6"></span>
            Our Teachers
            <span className="hidden md:inline-flex mb-2 w-20 py-[.5px] md:w-60 lgl:w-72 h-[.5px] bg-lightGreen ml-6"></span>
          </h2>
        </div>
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent>
            {internalTeachers.map((teacher, index) => (
              <CarouselItem
                key={teacher.id || index}
                className="p-2 sm:basis-1/2 lg:basis-1/3 flex-shrink-0"
              >
                <Card className="relative">
                  <CardContent className="flex rounded-md aspect-square items-center justify-center p-6 relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-[rgba(0,0,0,0.6)] text-white text-center rounded-md z-10">
                      <div className="text-lg bg-[rgba(0,0,0,0.6)] p-2 rounded-md font-bold mb-2">{teacher.name}</div>
                      <div className="text-sm bg-[rgba(0,0,0,0.6)] p-2 rounded-md font-semibold mb-2">{teacher.subject}</div>
                      <div className="chips flex justify-between mt-2 gap-2">
                        <div className="chip bg-[rgba(0,0,0,0.6)]  font-medium p-2 rounded-md text-xs">{teacher.grades}</div>
                        <div className="chip bg-[rgba(0,0,0,0.6)] font-medium p-2 rounded-md text-xs">{teacher.duration} Taught Online</div>
                      </div>
                      <Button asChild className="my-3 bg-lightGreen w-full">
                        <Link href="/find-tutors">Book Teacher</Link>
                      </Button>
                    </div>
                    <Image
                      src={teacher.icon}
                      alt={teacher.name}
                      fill
                      className="object-cover w-full h-full rounded-lg"
                      priority={true}
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </Container>
  );
};

export default PreviewInternalTeachers;
