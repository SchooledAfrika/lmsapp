"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Container from "@/components/Container";
import Link from "next/link";
import { subjects } from "@/constants/index";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { IRequestTeacherSub } from "./WardsDetail";
import { Controller } from "react-hook-form";

const TeacherRequest: React.FC<IRequestTeacherSub> = ({
  register,
  errors,
  control,
  clearErrors,
  watch,
}) => {
  
  return (
    <section className="py-[1rem] font-header md:pt-[3rem]">
      <Container>
      <h3 className="font-bold text-[16px]">
             Request a Special Teacher
           </h3>
           <Controller
          control={control}
          name="selectLanguage"
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                clearErrors("selectLanguage");
              }}
            >
              <SelectTrigger className="md:w-[450px] mt-4  h-[60px] w-[330px] p-4">
                <SelectValue placeholder="Language" />
              </SelectTrigger>

              <SelectContent className=" font-subtext font-medium">
                <SelectGroup>
                  <SelectItem value="english">English</SelectItem>
                  
                 
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.selectLanguage && (
          <small className="text-red-600">{errors.selectLanguage.message}</small>
        )}
        <br />

        <Controller
        control={control}
        name="selectSubject"
        render={({ field }) => (
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              clearErrors("selectSubject");
            }}
          >

        <SelectTrigger className="md:w-[450px]  mb-2 h-[60px] w-[330px] p-4 ">
              <SelectValue
                placeholder={`${
                  field.value ? field.value : "Select Subject"
                }`}
              />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((value, index) => (
                <SelectItem key={index} value={value.title}>
                  <div className=" flex gap-2">
                    <Image src={value.icon} alt="icon" width={20} height={20} />
                    {value.title}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors.selectSubject && (
        <small className=" text-red-600">{errors.selectSubject.message}</small>
      )}
       <br />

<Controller
          control={control}
          name="selectGrade"
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                clearErrors("selectGrade");
              }}
            >
              <SelectTrigger className="md:w-[450px]   h-[60px] w-[330px] p-4">
                <SelectValue placeholder="Select Grade" />
              </SelectTrigger>

              <SelectContent className=" font-subtext font-medium">
                <SelectGroup>
                  <SelectItem value="grade1">Grade 1</SelectItem>
                  <SelectItem value="grade2">Grade 2</SelectItem>
                  <SelectItem value="grade3">Grade 3</SelectItem>
                  <SelectItem value="grade4">Grade 4</SelectItem>
                  <SelectItem value="grade5">Grade 5</SelectItem>
                  <SelectItem value="grade6">Grade 6</SelectItem>
                  <SelectItem value="grade7">Grade 7</SelectItem>
                  <SelectItem value="grade8">Grade 8</SelectItem>
                  <SelectItem value="grade9">Grade 9</SelectItem>
                  <SelectItem value="grade10">Grade 10</SelectItem>
                  <SelectItem value="grade11">Grade 11</SelectItem>
                  <SelectItem value="grade12">Grade 12</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.selectGrade && (
          <small className="text-red-600">{errors.selectGrade.message}</small>
        )}
          <br />
       
       <Controller
          control={control}
          name="classSchedule"
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                clearErrors("classSchedule");
              }}
            >
              <SelectTrigger className="md:w-[450px]   h-[60px] w-[330px] p-4">
                <SelectValue placeholder="Class Schedule" />
              </SelectTrigger>

              <SelectContent className=" font-subtext font-medium">
                <SelectGroup>
                <SelectItem value="first">8AM-10AM</SelectItem>
                  <SelectItem value="second">10AM-12PM</SelectItem>
                  <SelectItem value="grade3">12PM-2PM</SelectItem>
                  <SelectItem value="grade4">2PM-4PM</SelectItem>
                  <SelectItem value="grade5">4PM-6PM</SelectItem>
                  <SelectItem value="grade6">6PM-8PM</SelectItem>
                  <SelectItem value="grade7">8PM-10PM</SelectItem>
                  
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.classSchedule && (
          <small className="text-red-600">{errors.classSchedule.message}</small>
        )}
          <br />

          <textarea
          {...register("details")}
          name="details"
          rows={7}
          cols={35}
          className=" p-2 md:w-[450px] text-[14px] w-[330px]"
          placeholder="Tell us more about the type of teacher you need."
          onChange={() => clearErrors("details")}
        ></textarea>
        {errors.details && (
          <small className=" text-red-500">{errors.details.message}</small>
        )}
       

       

            

           
       
      </Container>
    </section>
  );
};
export default TeacherRequest;
