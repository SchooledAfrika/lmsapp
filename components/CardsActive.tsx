import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FaGraduationCap } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaSchoolFlag } from "react-icons/fa6";

const CardsActive = () => {
  return (
    <div>
      <Card className="md:w-[600px] xs:w-[400px]  sm:w-[400px]  min-h-[1000px]  mt-20 mb-20  rounded-xl">
        <CardContent>
          <div className="flex justify-between items-center py-[5px] text-base">
            <div>
              <h3 className="font-bold text-lg">Economics</h3>

              <div className="flex justify-between py-3  text-sm">
                <p className="inline pr-2 ">
                  <FaGraduationCap className="inline mr-1" />
                  Grade 10
                </p>
                <p className="pr-2 inline">
                  <FaLocationDot className="inline mr-1" />
                  Lagos
                </p>
                <p className="inline">
                  <FaSchoolFlag className="inline mr-1" />
                  Brilliant Stars Academy
                </p>
              </div>
              <div>
                <Button className="mr-6 bg-dimYellow hover:bg-gold">
                  Full-Time
                </Button>
                <Button className="bg-dimYellow hover:bg-gold">
                  ₦80,000 - ₦120,000
                </Button>
              </div>
            </div>
            <div>
              <Button asChild className="mr-6 bg-lightGreen hover:bg-green-600">
                <Link href="/">Apply Now!</Link>
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-lg">Details</h3>

            <p className="text-sm">
              We are seeking a dynamic and creative Classroom Teacher with a
              good knowledge of social sciences subjects to join our new
              education community. As a Classroom Teacher, you will play a
              pivotal role in fostering a stimulating and inclusive learning
              environment where students can...
            </p>
          </div>
          <div className="mt-6 px-3 py-3">
            <h3 className="font-bold text-lg">Responsibilities</h3>
            <ul className="text-sm list-disc">
              <li className="py-3">
                Plan, prepare, and deliver lesson plans and instructional
                materials that facilitate active learning.
              </li>
              <li className="py-3">
                Develops schemes of work, lesson plans, and tests that are by
                established procedures. Instruct and monitor students in the use
                of learning materials and equipment. Provide constructive
                feedback and assessments to students, track their progress, and
                address their individual learning needs.
              </li>
              <li className="py-3">
                Collaborate with fellow educators, parents, and administrators
                to foster a collaborative educational community.
              </li>
              <li className="py-3">
                Integrate technology and creative teaching resources to enhance
                the learning process and encourage student engagement.
              </li>
              <li className="py-3">
                Support the social and emotional development of students by
                promoting positive relationships, empathy, and effective
                conflict resolution.
              </li>
              <li className="py-3">
                Stay current with educational trends, research, and best
                practices to improve teaching methods and student outcomes
                continuously.
              </li>
              <li className="py-3">
                Participate in professional development opportunities and
                contribute to curriculum development initiatives
              </li>
            </ul>
          </div>
        </CardContent>
       
      </Card>
    </div>
  );
};

export default CardsActive;
