"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Container from "@/components/Container";
import Link from "next/link";

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
import { TeacherRequestSuccess } from "./TeacherRequestSuccess";

const TeacherRequest: React.FC = () => {
  return (
    <section className="py-[1rem] font-header md:pt-[3rem]">
      <Container>
        <div className="flex my-6 justify-between ml-[0] md:ml-[40px]">
          <p className="font-bold text-lg">Details</p>
          <Link href="/parents-dashboard/teachers" className="cursor-pointer">
            <Image
              src="/closeAlt.svg"
              alt="cancel"
              width={100}
              height={100}
              className="w-[20px] h-[20px]"
            />
          </Link>
        </div>

        <div className="flex flex-col md:flex-row ml-[0] md:ml-[40px] mb-[50px]">
          <div>
            <div className="flex gap-10">
              <span className="bg-dimWhite text-[13px] text-center rounded-[50%] px-[8px] text-white">
                1
              </span>
              <p className="">Wards Detail</p>
            </div>
            <p className="border-dimWhite border-l-2 h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="rounded-[50%] text-[13px] bg-[#359C71] px-[8px] text-white">
                2
              </span>
              <p className="text-[#359C71] font-bold">Teacher's Request</p>
            </div>
          </div>

          <form className="pl-[0] md:pl-[100px] relative mt-[40px] md:mt-[0]">
            <label className="font-bold text-[16px]">
              Request a Special Teacher
            </label>

            <br />
            <br />

            <Select>
              <SelectTrigger className="md:w-[450px]  h-[60px] w-full p-4">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>

              <SelectContent className=" font-subtext font-medium">
                <SelectGroup>
                  <SelectItem value="english">English</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <br />

            <Select>
              <SelectTrigger className="md:w-[450px]  h-[60px] w-full p-4">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>

              <SelectContent className=" font-subtext font-medium">
                <SelectGroup>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="maths">Mathematics</SelectItem>
                  <SelectItem value="govt">Government</SelectItem>
                  <SelectItem value="phy">Physics</SelectItem>
                  <SelectItem value="bio">Biology</SelectItem>
                  <SelectItem value="chem">Chemistry</SelectItem>
                  <SelectItem value="crs">CRS</SelectItem>
                  <SelectItem value="econs">Economics</SelectItem>
                  <SelectItem value="lit">Literature-in-English</SelectItem>
                  <SelectItem value="computer">Computer</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <br />

            <Select>
              <SelectTrigger className="md:w-[450px]  h-[60px] w-full p-4">
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
            <br />

            <Select>
              <SelectTrigger className="md:w-[450px]  h-[60px] w-full p-4">
                <SelectValue placeholder=" Class Schedule" />
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
            <br />

            <Textarea
              className="h-60"
              placeholder="Tell us more about the type of teacher you need."
            />

            <br />
            <TeacherRequestSuccess />
          </form>
        </div>
      </Container>
    </section>
  );
};
export default TeacherRequest;
