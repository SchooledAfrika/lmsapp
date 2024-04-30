"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaGraduationCap } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaSchoolFlag } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";





const Cards = () => {
  const [bgColor, setbgColor] = useState(false);
  const handleColor = () => {
    setbgColor(true);
    
  };
  
  return (
    <div>
      <Card className="md:w-[450px] xs:w-[400px] sm:w-[400px]  mt-12 mb-6 md:ml-16 mx-auto rounded-xl">
        <CardContent>
          <div className="flex justify-between items-center py-4 text-base">
            <div>
              <h3 className="font-bold text-lg">Economics</h3>
              <p className="inline pt-3">
                <FaGraduationCap className="inline" /> Grade 10
              </p>
              <div className="flex justify-between py-3  text-sm">
                <p className="pr-2 inline">
                  <FaLocationDot className="inline" /> Lagos
                </p>
                <p className="inline">
                  <FaSchoolFlag className="inline mr-1 " /> Brilliant Stars
                  Academy
                </p>
              </div>
            </div>
            <div>
              <p className="inline">
                Add to favourite{" "}
                <FaHeart onClick={handleColor}
            className={`${
              bgColor
                ? "text-lightGreen  inline ml-1 cursor-pointer"
                : "text-black  inline ml-1 cursor-pointer"
            }`}/>
              </p>
              <p className="text-sm ml-1">Posted 1 week ago</p>
            </div>
          </div>

          <div>
            <Link href={`/vacancies/test`}> 
               <h3 className="font-bold text-lg">Details</h3>
            </Link>
           
            <p className="text-sm">
              We are seeking a dynamic and creative Classroom Teacher with a
              good knowledge of social sciences subjects to join our new
              education community. As a Classroom Teacher, you will play a
              pivotal role in fostering a stimulating and inclusive learning
              environment where students can...
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-start">
          <Button className="mr-6 bg-dimYellow hover:bg-gold">Full-Time</Button>
          <Button className="bg-dimYellow hover:bg-gold">
            ₦80,000 - ₦120,000
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Cards;
