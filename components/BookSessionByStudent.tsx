import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import ProgressLine from "./ui/PrograssLine";
import {
  StudentSessionSchema,
  BookSessionStudentInfo,
} from "@/constants/bookSession";
import { z } from "zod";
import { useForm, UseFormGetValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import StudentBookDetails from "./ui/book-teacher/StudentBookDetails";
import StudentBookSchedule from "./ui/book-teacher/StudentBookSchedule";
import PaymentByStudentSession from "./ui/book-teacher/PaymentByStudentSession";
import { Button } from "./ui/button";
import { FlutterWaveBtn, PayStackBtn } from "./BookSessionByParents";
import Image from "next/image";

export type IstudentSession = z.infer<typeof StudentSessionSchema>;

// dialog for successful payment in the book session
export const SuccessfulPayment: React.FC<{
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className=" md:w-2/4  py-5 flex flex-col gap-2 items-center rounded-lg justify-center bg-white text-black"
    >
      <Image
        src="/success.jpg"
        alt="successful"
        width={200}
        height={200}
        className=" w-[200px] h-[200px]"
        priority
      />
      <p className=" text-green-800 font-bold md:text-[20px]">
        Payment successful, you will be merged with the teacher!!!
      </p>
    </div>
  );
};

// component for rendering btn for payment and next page
const ControlBtn: React.FC<{
  currentPage: number;
  handleNextPage: () => void;
  method: string;
  sessionId: string;
  enroll: () => void;
  getValues: UseFormGetValues<IstudentSession>;
}> = ({
  currentPage,
  handleNextPage,
  method,
  sessionId,
  enroll,
  getValues,
}) => {
  return (
    <div>
      {currentPage <= 2 ? (
        <Button
          onClick={handleNextPage}
          type="button"
          className="px-8 py-3 md:my-2 my-4 flex md:w-28 w-full md:justify-end float-right bg-lightGreen hover:bg-green-700"
        >
          Proceed
        </Button>
      ) : (
        <div>
          {method === "Paystack" ? (
            <div className=" z-[99999]">
              <PayStackBtn
                studentValue={getValues}
                id={sessionId}
                price={200}
                enroll={enroll}
                isByStudent={true}
              />
            </div>
          ) : (
            <FlutterWaveBtn id={sessionId} price={200} enroll={enroll} />
          )}
        </div>
      )}
    </div>
  );
};
const BookSessionByStudent: React.FC<{
  sessionId: string;
  tutorName: string;
  tutorImg: string;
  tutorLang: string[];
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ sessionId, tutorImg, tutorLang, tutorName, setShowDialog }) => {
  const [completed, setCompleted] = useState<boolean>(false);
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [method, setMethod] = useState<string>("Paystack");
  const [totalAmt, setTotalAmt] = useState<number | undefined>(undefined);
  const {
    register,
    trigger,
    setValue,
    control,
    watch,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm<IstudentSession>({ resolver: zodResolver(StudentSessionSchema) });
  // function to trigger enrollment completed
  const enroll = () => {
    setCompleted(true);
  };

  type fieldName = keyof IstudentSession;
  // function to validate form on each proceed clicked
  const handleNextPage = async () => {
    const fields = BookSessionStudentInfo[currentPage - 1].field as fieldName[];
    const isValid = await trigger(fields, { shouldFocus: true });
    if (!isValid) return;
    if (currentPage === 4) {
    } else {
      setcurrentPage((prev) => prev + 1);
    }
  };
  return (
    <div
      onClick={() => setShowDialog(false)}
      className=" fixed top-0 left-0 bottom-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-md z-50 h-screen w-full  flex items-center justify-center  "
    >
      <div className=" font-subtext w-full flex items-center justify-center">
        {completed ? (
          <SuccessfulPayment onClick={(e) => e.stopPropagation()} />
        ) : (
          <div
            onClick={(e) => e.stopPropagation()}
            className=" sm:w-4/5 bg-stone-100 overflow-x-auto w-full  font-header py-4"
          >
            <ScrollArea className="md:h-[500px] h-[500px] pr-3   w-full ">
              <div className=" flex  flex-col md:flex-row gap-3  md:gap-16">
                <ProgressLine
                  formArrays={BookSessionStudentInfo}
                  currentPage={currentPage}
                  setcurrentPage={setcurrentPage}
                />
                <form onSubmit={(e) => e.preventDefault()} className=" flex-1">
                  {/* conditionaly rendering each form */}
                  {currentPage === 1 ? (
                    <StudentBookDetails
                      watch={watch}
                      register={register}
                      errors={errors}
                      control={control}
                      clearErrors={clearErrors}
                      setValue={setValue}
                      getValues={getValues}
                    />
                  ) : currentPage === 2 ? (
                    <StudentBookSchedule
                      watch={watch}
                      register={register}
                      errors={errors}
                      control={control}
                      clearErrors={clearErrors}
                      setValue={setValue}
                      getValues={getValues}
                      setTotalAmt={setTotalAmt}
                      totalAmt={totalAmt}
                    />
                  ) : (
                    <PaymentByStudentSession
                      watch={watch}
                      register={register}
                      errors={errors}
                      control={control}
                      clearErrors={clearErrors}
                      setValue={setValue}
                      getValues={getValues}
                      method={method}
                      setmethod={setMethod}
                      totalAmt={totalAmt}
                      tutorImg={tutorImg}
                      tutorName={tutorName}
                      tutorLang={tutorLang}
                    />
                  )}
                  <ControlBtn
                    currentPage={currentPage}
                    handleNextPage={handleNextPage}
                    method={method}
                    sessionId={sessionId}
                    enroll={enroll}
                    getValues={getValues}
                  />
                </form>
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookSessionByStudent;
