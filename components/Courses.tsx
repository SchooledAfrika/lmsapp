"use client";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
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
import { CircularProgress } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { RiGraduationCapFill } from "react-icons/ri";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Container from "./Container";
import SingleCourses from "./SingleCourses";
import { useConversion } from "@/data-access/conversion";
export interface TeacherInfo {
  id: string;
  name: string;
  profilePhoto: string | null;
  status: string;
}
export interface ICourses {
  id: string;
  byAdmin: boolean;
  grade: string;
  details: string;
  teacherId: number;
  title: string;
  banner: string;
  subject: string;
  previewVideo: string;
  mainVideo: string;
  price: number;
  sellCount: string;
  createdAt: string;
  teacher: TeacherInfo;
  buyersList: string[];
}

export const CourseCreator: React.FC<{
  byAdmin: boolean;
  profilePhoto: string;
  name: string;
}> = ({ byAdmin, profilePhoto, name }) => {
  const { makeSubString } = useClasses();
  return (
    <div className=" flex items-center gap-1">
      {byAdmin ? (
        <RiGraduationCapFill className=" text-[20px]" />
      ) : (
        <Image
          className="w-[25px] inline rounded-full object-cover mr-1 h-[25px]"
          src={profilePhoto}
          alt="background"
          width={200}
          height={200}
        />
      )}
      {/* <FaGraduationCap className="inline mr-1 text-lg" /> */}
      <p className=" text-[14px] font-semibold text-gray-500">
        {byAdmin === true ? "SchooledAfrika" : makeSubString(name)}
      </p>
    </div>
  );
};

const CourseCard = ({ item }: { item: ICourses }) => {
  const { makeSubString } = useClasses();
  const { data, status } = useSession();

  // Add a state to toggle the checkout visibility
  const [isCheckoutVisible, setIsCheckoutVisible] = useState<boolean>(false);
  const [dialogBox, setDialogBox] = useState<boolean>(false);

  // Function to handle course purchase (toggle checkout visibility)
  const handlePurchaseClick = () => {
    setIsCheckoutVisible((prev) => !prev);
  };
  // handle show dialog box
  const showDialogBox = () => {
    setDialogBox((prev) => !prev);
  };
  return (
    <>
      <div className="w-full overflow-hidden     font-header rounded-lg card flex flex-col justify-center gap-3 hover:-translate-y-2 transition-transform duration-300 group">
        <div className="relative text-white w-full h-[200px]">
          <Image
            className="w-full h-full object-cover"
            src={item.banner}
            alt="background"
            width={200}
            height={200}
          />

          <div>
            <Button
              onClick={showDialogBox}
              className="bg-lightGreen cursor-pointer absolute -translate-y-1/2 left-3 rounded-md text-white text-[12px] font-bold px-4 py-2 text-center lg:block"
            >
              Preview Course
            </Button>
            <SingleCourses
              title={item.title}
              details={item.details}
              teacherPhoto={item.teacher.profilePhoto}
              teacher={item.teacher.name}
              banner={item.banner}
              previewVideo={item.previewVideo}
              mainVideo={item.mainVideo}
              showDialogBox={showDialogBox}
              dialogBox={dialogBox}
              isCheckoutVisible={isCheckoutVisible}
              handlePurchaseClick={handlePurchaseClick}
              price={item.price}
              id={item.id}
              isAdmin={item.byAdmin}
            />
          </div>
          {/* checking if the user already purchase the course before */}
          {status === "authenticated" &&
          item.buyersList.includes(data?.user.id!) ? (
            <Button className=" bg-green-700 cursor-pointer absolute -translate-y-1/2 right-3 rounded-md text-white text-[12px] font-bold px-4 py-2 text-center lg:block">
              Purchased
            </Button>
          ) : (
            <Button
              onClick={() => {
                if (status === "unauthenticated")
                  return toast.error("login to purchase courses");
                handlePurchaseClick();
              }}
              className="bg-dimOrange cursor-pointer absolute -translate-y-1/2 right-3 rounded-md text-white text-[12px] font-bold px-4 py-2 text-center lg:block"
            >
              Purchase Course
            </Button>
          )}
        </div>
        <div className="flex justify-between px-2">
          <p className=" font-bold mt-3 bg-[rgba(0,0,0,0.6)] text-white p-1 rounded-md">
            <span className="text-[14px] font-semibold">Sold:</span>{" "}
            {item.sellCount}
          </p>
          <p className=" font-bold mt-3 text-lightGreen">${item.price}</p>
        </div>
        {/* <p className="text-right mr-6 font-bold mt-3 text-lightGreen">${item.price}</p> */}
        <div className="flex flex-col gap-3 mb-8 justify-center mx-4 ">
          <div className=" flex items-center justify-between">
            <div>
              <div className=" flex items-center mb-2 gap-2">
                <p className=" font-bold">{item.title}</p>
              </div>

              <div className=" flex items-center pt-1 gap-2">
                <CourseCreator
                  name={item.teacher.name}
                  byAdmin={item.byAdmin}
                  profilePhoto={item.teacher.profilePhoto!}
                />
              </div>
            </div>
            <div className=" flex items-center gap-1 bg-green-200 px-2 py-1 rounded-md">
              <MdVerified className=" text-green-700" />
              <p className=" text-green-700 text-[10px]">verified</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally render the Checkout component based on isCheckoutVisible */}
      {isCheckoutVisible && (
        <Checkout
          handlePurchaseClick={handlePurchaseClick}
          price={item.price}
          id={item.id}
        />
      )}
    </>
  );
};

// component that display a dialogue box for payment method based on the class selected
export const Checkout: React.FC<{
  handlePurchaseClick: () => void;
  id: string;
  price: number;
}> = ({ id, handlePurchaseClick, price }) => {
  // this state manages the payment method the user has selected
  const [selected, setSelected] = useState<string | undefined>(undefined);
  // method to update the payment
  const updatePayMethod = (method: string) => {
    setSelected(method);
  };
  return (
    <div
      onClick={handlePurchaseClick}
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
                <PayStackBtn
                  id={id}
                  price={price}
                  enroll={handlePurchaseClick}
                />
              ) : (
                <FlutterWaveBtn
                  id={id}
                  price={price}
                  enroll={handlePurchaseClick}
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
export const PayStackBtn: React.FC<{
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
      toast.success(
        "payment successful, navigate to courses in your dashboard"
      );
      enroll();
    },
    metadata: {
      custom_fields: [
        {
          display_name: data?.user.id as string, //students id
          variable_name: id, //class id
          value: `${price}-courses`, //for the price and class specified payment
        },
      ],
      plan: {
        courseId: id,
        payerId: data?.user.id,
        userType: data?.user.role,
      },
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
export const FlutterWaveBtn: React.FC<{
  id: string;
  price: number;
  // studentIDs: string[] | undefined;
  enroll: () => void;
}> = ({ id, price, enroll }) => {
  const { data } = useSession();
  const queryClient = useQueryClient();
  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERPUBKEY!,
    tx_ref: Date.now().toString(),
    amount: price,
    currency: "USD",
    payment_options: "card",
    customer: {
      email: data?.user.email as string,
      phone_number: data?.user.id as string, //id of the student or user that want to make payment,
      name: `${id}-courses`, // field for id of the class and the payment type
    },
    customizations: {
      title: "school afrika",
      description: "payment for course enrollment",
      logo: "https://res.cloudinary.com/dfn0senip/image/upload/v1720127002/v5tp1e4dsjx5sidhxoud.png",
    },
    onSuccess: () => {
      toast.success(
        "payment successful, navigate to courses in your dashboard"
      );

      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ["infinitecourse", "home-course"],
        });
        enroll();
      }, 5500);
    },
    meta: {
      courseId: id,
      payerId: data?.user.id,
      userType: data?.user.role,
    },
  };
  const fwConfig = {
    ...config,
    text: "Pay with flutterwave",
    callback: () => {
      closePaymentModal(); // this will close the modal programmatically
      toast.success(
        "payment successful, navigate to courses in your dashboard"
      );
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

const Courses = () => {
  // creating our useref for watching the button when displayed
  const { ref, inView } = useInView();
  // function that is called at each step to get the classes based on parameter
  const getItems = async ({ pageParam }: { pageParam: number }) => {
    const response = await fetch(`/api/courses-teacher?page=${pageParam}`);
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
    queryKey: ["infinitecourse"],
    queryFn: getItems,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      const nextPage = lastPage.length !== 0 ? allPage.length + 1 : undefined;
      return nextPage;
    },
  });
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  console.log(data);
  // checking if it is loading
  if (status === "pending") {
    return (
      <Container>
        <GetClassLoader />
      </Container>
    );
  }
  // checking for errors
  if (isError) {
    return <p>{error.message}</p>;
  }
  // flaten the data gotten here
  const queryData = data?.pages.flat();
  console.log(queryData);
  return (
    <Container>
      <div className="w-full  mx-auto px-4 pt-16 pb-6">
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center xl:grid-cols-3 gap-6  lgl:px-10">
          {Array.isArray(queryData) &&
            queryData.map((item: ICourses, index) => (
              <CourseCard key={index} item={item} />
            ))}
        </div>
      </div>
      <div className=" w-full flex items-center justify-center">
        {hasNextPage && (
          <div
            ref={ref}
            className=" px-4 py-2 rounded-md border bg-white w-fit flex items-center gap-2"
          >
            <CircularProgress color="success" />
            <p className=" text-green-800 font-bold">loading...</p>
          </div>
        )}
      </div>
      <ToastContainer />
    </Container>
  );
};

export default Courses;
