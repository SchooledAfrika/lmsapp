"use client";
import { Classes } from "@/constants/index";
import Image from "next/image";
import Container from "./Container";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { useClasses } from "@/data-access/class";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { paymentMethods } from "@/constants/pricing/school";
import { GrFormCheckmark } from "react-icons/gr";
import { PaystackButton } from "react-paystack";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { closePaymentModal, FlutterWaveButton } from "flutterwave-react-v3";
import { GetClassLoader } from "./loaders/skeleton";

interface Iteacher {
  name: string;
}

interface Iclass {
  classBanner: string;
  teacherId: string;
  schedules: string[];
  price: number;
  classTime: string;
  teacher: Iteacher;
  rating?: number;
  subject: string;
  className: string;
  grade: string;
  id: string;
  studentIDs?: string[];
}

const PopularClassesCard = ({ item }: { item: Iclass }) => {
  const {
    makeSubString,
    capitalizeString,
    convertArray,
    showpayments,
    enroll,
  } = useClasses();
  const { data } = useSession();

  return (
    <>
      <div className="w-full     font-subtext rounded-lg card flex flex-col justify-center gap-3 hover:-translate-y-2 transition-transform duration-300 group">
        <div className="relative text-white w-full h-[200px]">
          <Image
            className="w-full h-full object-cover"
            src={item.classBanner}
            alt="background"
            width={200}
            height={200}
          />
          <div className=" absolute top-0 left-0 w-full h-full items-center justify-center flex flex-col gap-3">
            <div className=" px-4 py-2 rounded-md bg-[rgba(0,0,0,0.6)] text-white">
              <p>{item.className}</p>
            </div>
            <div className=" px-4 py-2 rounded-md bg-[rgba(0,0,0,0.6)] text-white">
              <p>{item.grade}</p>
            </div>
          </div>

          {item.studentIDs?.includes(data?.user.id as string) ? (
            <button className=" bg-green-600 absolute -translate-y-1/2 left-3 rounded-md text-white text-[12px] font-bold px-4   py-2 text-center lg:block">
              Enrolled
            </button>
          ) : (
            <button
              onClick={enroll}
              className=" bg-dimOrange absolute -translate-y-1/2 left-3 rounded-md text-white text-[12px] font-bold px-4   py-2 text-center lg:block"
            >
              Enrol Now
            </button>
          )}
        </div>
        <p className="text-right mr-6 font-bold text-lightGreen">
          &#36;{item.price.toFixed(2)}
        </p>
        <div className="flex flex-col gap-3 mb-8 justify-center mx-4 ">
          <div className=" flex items-center justify-between">
            <div>
              <span className="text-[12px] text-slate-600">Tutor</span>
              <div className=" flex items-center gap-2">
                <p className=" font-bold">{makeSubString(item.teacher.name)}</p>
                <div className=" flex items-center gap-1">
                  <FaStar className=" text-[tomato]" />
                  {item.rating ? item.rating : "0/5"}
                </div>
              </div>
            </div>
            <div className=" flex items-center gap-1 bg-green-200 px-2 py-1 rounded-md">
              <MdVerified className=" text-green-700" />
              <p className=" text-green-700 text-[10px]">verified</p>
            </div>
          </div>
          <div className="flex items-center gap-4 ">
            <Image
              className=" w-[25px] h-[25px]"
              src={`/${item.subject.toLowerCase()}.png`}
              alt={item.subject}
              width={200}
              height={200}
            />
            <p className="font-bold">{capitalizeString(item.subject)}</p>
          </div>
          <div className=" flex items-center gap-2">
            <p className="font-medium text-sm">
              {convertArray(item.schedules)}
            </p>
            <p className=" h-4 border border-slate-800"></p>
            <p className=" font-medium text-sm lowercase">{item.classTime}</p>
          </div>
        </div>
      </div>
      {showpayments && <Checkout {...item} enroll={enroll} />}
    </>
  );
};

// component that display a dialogue box for payment method based on the class selected
const Checkout: React.FC<Iclass & { enroll: () => void }> = ({
  enroll,
  id,
  price,
  studentIDs,
}) => {
  // this state manages the payment method the user has selected
  const [selected, setSelected] = useState<string | undefined>(undefined);
  // method to update the payment
  const updatePayMethod = (method: string) => {
    setSelected(method);
  };
  return (
    <div
      onClick={enroll}
      className=" fixed px-3 py-2 flex items-center justify-center w-full h-screen top-0 left-0 bottom-0 z-[999] bg-[rgba(0,0,0,0.1)] backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" bg-stone-100 w-full pt-5 sm:w-[400px] px-3 py-2 flex flex-col justify-center items-center "
      >
        <p className=" font-bold text-green-700">Payment</p>
        <p className=" text-[12px] font-bold mt-2">Select payment method</p>
        <div className=" w-[100px] aspect-square rounded-full border-2 border-green-700 flex items-center justify-center mt-4 mb-3">
          <p className=" font-bold text-green-700 ">{price}</p>
        </div>
        {/* div showing the payment methods */}
        <div className=" mt-3 w-full flex flex-col gap-2">
          {paymentMethods.map((payment, index) => (
            <div
              key={index}
              className=" bg-white px-3 py-2 w-full flex items-start justify-between cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                updatePayMethod(payment.title);
              }}
            >
              <div>
                <Image
                  src={payment.image}
                  alt={payment.title}
                  width={200}
                  height={200}
                  className=" w-[30px]"
                />
              </div>
              <div className=" flex flex-col gap-1">
                <p className=" font-bold text-[14px]">{payment.title}</p>
                <p className=" text-[10px]">{payment.desc}</p>
              </div>
              <div
                className={` w-4 aspect-square ${
                  payment.title == selected ? "bg-green-700" : "bg-slate-300"
                } rounded-sm self-center flex items-center justify-center`}
              >
                {payment.title == selected && (
                  <GrFormCheckmark className=" text-[10px] text-white" />
                )}
              </div>
            </div>
          ))}
        </div>
        {/* div that shows the button to call for payment below here */}
        <div className=" w-full mt-5 ">
          {selected == undefined ? (
            <button
              className="w-full py-3 flex items-center justify-center bg-green-200 cursor-not-allowed rounded-sm text-gray-400"
              disabled={true}
            >
              {" "}
              Select payment method
            </button>
          ) : (
            <div>
              {selected === "Paystack" ? (
                <PayStackBtn id={id} price={price} enroll={enroll} />
              ) : (
                <FlutterWaveBtn
                  id={id}
                  price={price}
                  studentIDs={studentIDs}
                  enroll={enroll}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// component to make payment with paystack method
const PayStackBtn: React.FC<{
  id: string;
  price: number;
  enroll: () => void;
}> = ({ id, price, enroll }) => {
  const { data } = useSession();
  const queryClient = useQueryClient();
  const componentProps = {
    reference: new Date().getTime().toString(),
    email: data?.user.email as string,
    amount: price * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.NEXT_PUBLIC_PAYSTACKPUBKEY!,
    text: "Pay with paystack",
    onSuccess: (reference: any) => {
      toast.success("payment successful, navigate to class in your dashboard");
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["infiniteclass"] });
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
      className="w-full py-3 flex items-center justify-center bg-green-600 cursor-pointer rounded-sm font-bold text-white"
    />
  );
};
// component to make payment with flutterwave method
const FlutterWaveBtn: React.FC<{
  id: string;
  price: number;
  studentIDs: string[] | undefined;
  enroll: () => void;
}> = ({ id, price, studentIDs, enroll }) => {
  const { data } = useSession();
  const queryClient = useQueryClient();
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
      description: "payment for class enrollment",
      logo: "https://res.cloudinary.com/dfn0senip/image/upload/v1720127002/v5tp1e4dsjx5sidhxoud.png",
    },
    onSuccess: () => {
      toast.success("payment successful, navigate to class in your dashboard");
      studentIDs?.push(data?.user.id!);
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["infiniteclass"] });
        enroll();
      }, 5500);
    },
  };
  const fwConfig = {
    ...config,
    text: "Pay with flutterwave",
    callback: () => {
      closePaymentModal(); // this will close the modal programmatically
      toast.success("payment successful, navigate to class in your dashboard");
      setTimeout(() => {
        enroll();
      }, 5500);
    },
    onClose: () => {},
  };
  return (
    <div>
      <FlutterWaveButton
        className="w-full py-3 flex items-center justify-center bg-green-600 cursor-pointer rounded-sm font-bold text-white"
        {...fwConfig}
      />
    </div>
  );
};

const PopularClasses = () => {
  // function that is called at each step to get the classes based on parameter
  const getItems = async ({ pageParam }: { pageParam: number }) => {
    const response = await fetch(`/api/apply-for-class?page=${pageParam}`);
    return response.json();
  };

  const {
    data,
    status,
    error,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["infiniteclass"],
    queryFn: getItems,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      const nextPage = lastPage.length !== 0 ? allPage.length + 1 : undefined;
      return nextPage;
    },
  });
  // checking if it is loading
  if (status === "pending") {
    return (
      <Container>
        <GetClassLoader />
      </Container>
    );
  }
  // checking for errors
  if (status === "error") {
    return <p>something went wrong, check your network status</p>;
  }
  // flaten the data gotten here
  const queryData = data?.pages.flat();
  return (
    <Container>
      <div className="w-full  mx-auto px-4 pt-16 pb-6">
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center xl:grid-cols-3 gap-6  lgl:px-10">
          {Array.isArray(queryData) &&
            queryData.map((item: Iclass, index) => (
              <PopularClassesCard key={index} item={item} />
            ))}
        </div>
      </div>

      <ToastContainer />
    </Container>
  );
};

export default PopularClasses;
