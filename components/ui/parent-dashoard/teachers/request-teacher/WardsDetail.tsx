import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WardsDetailProps {
  OnclickWardsDetail: () => void;
}

const WardsDetail: React.FC<WardsDetailProps> = ({ OnclickWardsDetail }) => {
  return (
    <section className="py-[1rem] font-header md:pt-[3rem]">
      <Container>
        <div className="flex my-6 justify-between ml-[0] md:ml-[40px]">
          <p className="font-bold text-lg">Details</p>
          <Link
            href="/parents-dashboard/teachers"
            className="cursor-pointer"
          >
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
              <span className="bg-[#359C71] text-[13px] rounded-[50%] px-[10px] text-white">
                1
              </span>
              <p className="text-[#359C71] font-bold">Wards Detail</p>
            </div>
            <p className="border-l-2 border-[#E9ECEB] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#E9ECEB] rounded-full px-[7px] text-white">
                2
              </span>
              <p className="">Teacher's Request</p>
            </div>
          </div>

          <form className="pl-[0] md:pl-[100px] mt-[40px] md:mt-[0]">
            <label className="font-bold text-[16px]">
              Request a Special Teacher
            </label>
            <p className="md:w-[450px] text-[13.5px] py-2">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Lorem ipsum dolor sit amet,
              consectetuer adipiscing elit.
            </p>
            <div className="bg-white flex md:w-[450px] my-2 rounded-md  w-full p-4 flex-col">
              <div className="flex space-x-3">
                <Image
                  src="/tutors.jpg"
                  alt="teacher"
                  width={100}
                  height={100}
                  className="w-[100px] h-[100px] rounded-full"
                />
                <p className="font-bold items-center">David Olushola</p>
              </div>
              <div className="flex flex-col my-6">
                <h3 className="font-semibold text-[14px]">About</h3>
                <p className="text-[13px] font-medium">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Lorem ipsum dolor sit amet,
                  consectetuer adipiscing elit.
                </p>
              </div>
            </div>
            <Select>
              <SelectTrigger className="md:w-[450px]  h-[60px] w-full p-4">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>

              <SelectContent className=" font-subtext font-medium">
                <SelectGroup>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
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

            <Button
              onClick={OnclickWardsDetail}
              className="bg-secondary w-full hover:bg-green-800 text-white text-[16px] px-6 py-7 my-3"
            >
              Proceed
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-2 border-lightGreen hover:text-green-700 w-full text-lightGreen text-[16px] px-6 py-7 my-3"
            >
              <Link href="" className="font-bold">
                Select Another Ward
              </Link>
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
};
export default WardsDetail;
