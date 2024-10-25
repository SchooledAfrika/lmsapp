"use client";
import React, { useState } from "react";
import Payment from "@/components/ui/book-teacher/Payment";
import Scheduling from "@/components/ui/book-teacher/Scheduling";
import ProgressLine from "./ui/PrograssLine";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { BookSessionInfo, sessionbookingSchema } from "@/constants/bookSession";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChildDetails from "@/components/ui/book-teacher/ChildDetails";
import { PaystackButton } from "react-paystack";
import { closePaymentModal, FlutterWaveButton } from "flutterwave-react-v3";
import { UseFormGetValues } from "react-hook-form";
import { IstudentSession, SuccessfulPayment } from "./BookSessionByStudent";
import { useConversion } from "@/data-access/conversion";
export type Isession = z.infer<typeof sessionbookingSchema>;

// component for rendering btn for payment and next page
const ControlBtn: React.FC<{
  currentPage: number;
  handleNextPage: () => void;
  method: string;
  sessionId: string;
  enroll: () => void;
  getValues: UseFormGetValues<Isession>;
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
            <PayStackBtn getValue={getValues} id={sessionId} enroll={enroll} />
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

// component to make payment with paystack method
export const PayStackBtn: React.FC<{
  id: string;
  enroll: () => void;
  getValue: UseFormGetValues<Isession>;
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
        studentId: getValue("childId"),
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
        byparents: true,
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
  getValue: UseFormGetValues<Isession>;
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
      studentId: getValue("childId"),
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
      byparents: true,
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

// then main component appears here
const BookSessionByParents: React.FC<{
  sessionId: string;
  tutorName: string;
  tutorImg: string;
  tutorLang: string[];
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ sessionId, tutorImg, tutorLang, tutorName, setShowDialog }) => {
  const { data: session, update } = useSession();
  // console.log(session?.user);
  const router = useRouter();
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
  } = useForm<Isession>({
    resolver: zodResolver(sessionbookingSchema),
  });
  // function to trigger enrollment completed
  const enroll = () => {
    setCompleted(true);
  };

  type fieldName = keyof Isession;
  // function to validate form on each proceed clicked
  const handleNextPage = async () => {
    const fields = BookSessionInfo[currentPage - 1].field as fieldName[];
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
      <div className="font-subtext w-full flex items-center justify-center">
        {completed ? (
          <SuccessfulPayment onClick={(e) => e.preventDefault()} />
        ) : (
          <div
            onClick={(e) => e.stopPropagation()}
            className="sm:w-4/5 bg-stone-100 overflow-x-auto w-full  font-header py-4"
          >
            <ScrollArea className="md:h-[500px] h-[500px] pr-3  w-full ">
              <div className=" flex  flex-col md:flex-row gap-3  md:gap-16">
                <ProgressLine
                  formArrays={BookSessionInfo}
                  currentPage={currentPage}
                  setcurrentPage={setcurrentPage}
                />
                <form onSubmit={(e) => e.preventDefault()} className=" flex-1">
                  {/* conditionaly rendering each form */}
                  {currentPage === 1 ? (
                    <ChildDetails
                      watch={watch}
                      register={register}
                      errors={errors}
                      control={control}
                      clearErrors={clearErrors}
                      setValue={setValue}
                      getValues={getValues}
                    />
                  ) : currentPage === 2 ? (
                    <Scheduling
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
                    <Payment
                      watch={watch}
                      register={register}
                      errors={errors}
                      control={control}
                      clearErrors={clearErrors}
                      setValue={setValue}
                      getValues={getValues}
                      method={method}
                      totalAmt={totalAmt}
                      setmethod={setMethod}
                      tutorName={tutorName}
                      tutorImg={tutorImg}
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

export default BookSessionByParents;
