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

export type IstudentSession = z.infer<typeof StudentSessionSchema>;

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
            <PayStackBtn id={sessionId} price={200} enroll={enroll} />
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
  tutorLang: string;
}> = ({ sessionId, tutorImg, tutorLang, tutorName }) => {
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
    <Dialog>
      <DialogTrigger asChild>
        <div className=" text-white w-full  bg-green-700 rounded-md px-4 py-4 sm:py-4 text-[14px] flex items-center justify-center cursor-pointer">
          Book Session
        </div>
      </DialogTrigger>
      <DialogContent className="sm:w-4/5 bg-stone-100 overflow-x-auto w-full font-subtext">
        {completed ? (
          <div>
            <p>complted</p>
          </div>
        ) : (
          <div className="  font-header py-4">
            <ScrollArea className="md:h-[500px] h-[500px]  w-full ">
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
      </DialogContent>
    </Dialog>
  );
};

export default BookSessionByStudent;
