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
      {currentPage <= 3 ? (
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

// component to make payment with paystack method
export const PayStackBtn: React.FC<{
  id: string;
  price: number;
  enroll: () => void;
}> = ({ id, price, enroll }) => {
  const { data } = useSession();
  const componentProps = {
    reference: new Date().getTime().toString(),
    email: data?.user.email as string,
    amount: price * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.NEXT_PUBLIC_PAYSTACKPUBKEY!,
    text: "Pay now",
    onSuccess: (reference: any) => {
      setTimeout(() => {
        enroll();
      }, 5500);
    },
    metadata: {
      custom_fields: [
        {
          display_name: data?.user.id as string, //students id
          variable_name: id, //class id
          value: `${price}-class`, //for the price and class specified payment
        },
      ],
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
  price: number;
  enroll: () => void;
}> = ({ id, price, enroll }) => {
  const { data } = useSession();
  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERPUBKEY!,
    tx_ref: Date.now().toString(),
    amount: price,
    currency: "NGN",
    payment_options: "card",
    customer: {
      email: data?.user.email as string,
      phone_number: data?.user.id as string, //id of the student or user that want to make payment,
      name: `${id}-class`, // field for id of the class and the payment type
    },
    customizations: {
      title: "school afrika",
      description: "payment for  enrollment",
      logo: "https://res.cloudinary.com/dfn0senip/image/upload/v1720127002/v5tp1e4dsjx5sidhxoud.png",
    },
    onSuccess: () => {},
  };
  const fwConfig = {
    ...config,
    text: "Pay now",
    callback: () => {
      closePaymentModal(); // this will close the modal programmatically
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
}> = ({ sessionId }) => {
  const { data: session, update } = useSession();
  // console.log(session?.user);
  const router = useRouter();
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [method, setMethod] = useState<string>("Paystack");
  const [completed, setCompleted] = useState<boolean>(false);
  const [totalDay, setTotalDay] = useState<string[]>([]);
  const [hrPerDay, setHourPerDay] = useState<number>(1);
  const [billPeriod, setBillPeriod] = useState<string>();

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
  // here we calculate the total the user will pay
  const totalPayment = () => {
    const billPeriod = getValues("sessionTypes.billingCycle");
    const totalDaysSelected = totalDay.length;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className=" text-white w-full  bg-green-700 rounded-md px-4 py-4 sm:py-4 text-[14px] flex items-center justify-center cursor-pointer">
          Book Session
        </div>
      </DialogTrigger>

      <DialogContent className="sm:w-[900px] bg-stone-100 overflow-x-auto w-full font-subtext">
        {completed ? (
          <div>
            <p>complted</p>
          </div>
        ) : (
          <div className="  font-header py-4">
            <ScrollArea className="md:h-[500px] h-[500px]  w-full ">
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
                      setmethod={setMethod}
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

export default BookSessionByParents;
