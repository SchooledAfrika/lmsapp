import React from "react";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  UseFormClearErrors,
  UseFormRegister,
  FieldErrors,
  Control,
  Controller,
  UseFormWatch,
} from "react-hook-form";
import { IteacherOneOnOne } from "./TeacherOneOnOne";

export interface TeacherPriceProps {
  register: UseFormRegister<IteacherOneOnOne>;
  errors: FieldErrors<IteacherOneOnOne>;
  watch: UseFormWatch<IteacherOneOnOne>;
  control?: Control<IteacherOneOnOne>;
  clearErrors: UseFormClearErrors<IteacherOneOnOne>;
}

const TeacherPrice: React.FC<TeacherPriceProps> = ({
  errors,
  watch,
  register,
  control,
  clearErrors,
}) => {
  watch("pricing");
  return (
    <section>
      <Container>
        <div className="flex justify-between items-center mb-5">
          <span className="font-bold">Details</span>
          <Link
            href="/teacher-dashboard/one-on-one-section"
            className="cursor-pointer"
          >
            <Image src="/closeAlt.svg" alt="cancel" width={15} height={15} />
          </Link>
        </div>
        <div className="flex flex-col md:flex-row mb-[50px]">
          <div>
            <div className="flex flex-col pl-[0] md:pl-[100px] mt-[40px] md:mt-[0]">
              <p className="font-bold text-[18px]">
                Session Pricing (Per Hour)
              </p>
              <span className="text-[14px] w-[50%] font-medium py-2">
                Please note that the minimum duration for a session is 45
                minutes and the maximum duration is 2 hours. Your price range
                should account for that.
              </span>
              <div className="flex justify-between items-center my-2 p-4 outline-none rounded-[8px] w-full md:w-[40vh] lg:w-[60%] bg-white">
                <input
                  type="text"
                  name="text"
                  placeholder="$10 - $15"
                  className="outline-none w-full pr-4"
                />
                <div className="flex items-center gap-1">
                  <Image
                    src="/svgs/usaLogo.svg"
                    width={18}
                    height={18}
                    alt="Lock"
                  />
                  <span className="font-bold text-[16px]">USD</span>
                </div>
              </div>
              {errors.pricing && (
                <small className="text-red-600">{errors.pricing.message}</small>
              )}
              <div className="flex justify-between items-center my-2 p-4 outline-none rounded-[8px] w-full md:w-[40vh] lg:w-[60%] bg-white">
                <input
                  type="text"
                  name="text"
                  placeholder="$8 - $12"
                  className="outline-none w-full pr-4"
                />
                <div className="flex items-center gap-1">
                  <Image
                    src="/svgs/usaLogo.svg"
                    width={18}
                    height={18}
                    alt="Lock"
                  />
                  <span className="font-bold text-[16px]">USD</span>
                </div>
              </div>
              {errors.pricing && (
                <small className="text-red-600">{errors.pricing.message}</small>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TeacherPrice;
