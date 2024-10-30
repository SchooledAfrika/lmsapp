import React, { useEffect, useState } from "react";
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
import Image from "next/image";
import { useConversion } from "@/data-access/conversion";
import { useSession } from "next-auth/react";
import { closePaymentModal, FlutterWaveButton } from "flutterwave-react-v3";
import { PaystackButton } from "react-paystack";

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
                getValue={getValues}
                id={sessionId}
                enroll={enroll}
              />
            </div>
          ) : (
            <FlutterWaveBtn
              getValue={getValues}
              id={sessionId}
              enroll={enroll}
            />
          )}
        </div>
      )}
    </div>
  );
};

// payment button handled below here
// component to make payment with paystack method
export const PayStackBtn: React.FC<{
  id: string;
  enroll: () => void;
  getValue: UseFormGetValues<IstudentSession>;
}> = ({ id, enroll, getValue }) => {
  const { data } = useSession();
  const { totalSessionPayment } = useConversion();
  const price = totalSessionPayment(
    getValue("days"),
    getValue("length"),
    getValue("hours"),
    getValue("sessionTypes")
  );
  // props for paystack payment below here
  const componentProps = {
    reference: new Date().getTime().toString(),
    email: data?.user.email as string,
    amount: price * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.NEXT_PUBLIC_PAYSTACKPUBKEY!,
    text: "Pay now",
    onSuccess: (reference: any) => {
      enroll();
    },
    metadata: {
      custom_fields: [
        {
          display_name: data?.user.id as string, //students id
          variable_name: id, //sessionId id
          value: `${price}-session`, //for the price and class specified payment
        },
        {
          display_name: "random second", //students id
          variable_name: "random second", //sessionId id
          value: `random second`, //for the price and class specified payment
        },
      ],
      plan: {
        studentId: data?.user.id,
        grade: getValue("grade"),
        sessionType: getValue("sessionTypes"),
        subjects: getValue("subject"),
        curriculum: getValue("curriculum"),
        specialNeeds: getValue("specialNeeds"),
        goals: getValue("goals"),
        days: getValue("days"),
        times: getValue("times"),
        hours: getValue("hours"),
        length: getValue("length"),
        classStart: getValue!("classStarts"),
        price,
        selectedTeacher: id,
        byparents: false,
      },
    },
  };
  return (
    <PaystackButton
      {...componentProps}
      className="w-1/4 ml-auto  py-3 flex items-center justify-center bg-green-600 cursor-pointer rounded-sm font-bold text-white"
    />
  );
};

// component to make payment with flutterwave method
export const FlutterWaveBtn: React.FC<{
  id: string;
  enroll: () => void;
  getValue: UseFormGetValues<IstudentSession>;
}> = ({ id, enroll, getValue }) => {
  const { data } = useSession();
  const { totalSessionPayment } = useConversion();
  const price = totalSessionPayment(
    getValue("days"),
    getValue("length"),
    getValue("hours"),
    getValue("sessionTypes")
  );

  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERPUBKEY!,
    tx_ref: Date.now().toString(),
    amount: price,
    currency: "NGN",
    payment_options: "card",
    customer: {
      email: data?.user.email as string,
      phone_number: data?.user.id as string, //id of the student or user that want to make payment,
      name: `${id}-session`, // field for id of the class and the payment type
      names: "calcs",
      bestshows: "this is me",
      wow: "trying now ooo",
    },
    customizations: {
      title: "school afrika",
      description: "payment for  enrollment",
      logo: "https://res.cloudinary.com/dfn0senip/image/upload/v1720127002/v5tp1e4dsjx5sidhxoud.png",
    },
    meta: {
      studentId: data?.user.id,
      grade: getValue("grade"),
      sessionType: getValue("sessionTypes"),

      subjects: getValue("subject").join("-"),
      curriculum: getValue("curriculum"),
      specialNeeds: getValue("specialNeeds")?.join("-"),
      goals: getValue("goals"),
      days: getValue("days").join("-"),
      times: getValue("times"),
      hours: getValue("hours"),
      length: getValue("length"),
      classStart: getValue("classStarts"),
      price,
      selectedTeacher: id,
      byparents: false,
    },
    onSuccess: () => {
      alert("true oooo");
      enroll();
    },
  };
  const fwConfig = {
    ...config,
    text: "Pay now",
    callback: () => {
      closePaymentModal();
      enroll();
    },
    onClose: () => {},
  };
  return (
    <div>
      <FlutterWaveButton
        className=" py-3 flex ml-auto w-1/4 items-center justify-center bg-green-600 cursor-pointer rounded-sm font-bold text-white"
        {...fwConfig}
      />
    </div>
  );
};

// default page export appears here
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
