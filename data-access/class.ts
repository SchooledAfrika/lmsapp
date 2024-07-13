import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

// creating a custome hook for functionality in the get classroom in the website
export const useClasses = () => {
  const [showpayments, setshowpayment] = useState<boolean>(false);
  const [payMethods, setPayMethod] = useState<string[]>([
    "Paystack",
    "Flutter wave",
    "Remitta",
  ]);
  const { status } = useSession();
  // creating a substring
  const makeSubString = (value: string): string => {
    if (value.length > 17) {
      const substring = value.substring(0, 17) + "...";
      return substring;
    }
    return value;
  };
  const capitalizeString = (value: string): string => {
    let capitalize = [];

    for (let i = 0; i < value.length; i++) {
      let currentItem = value[i];
      if (i == 0) {
        capitalize.push(currentItem);
      } else {
        const small = currentItem.toLowerCase();
        capitalize.push(small);
      }
    }
    const convertedString = capitalize.join("");

    return convertedString;
  };
  const convertArray = (schedules: string[]): string => {
    // make new array to hold all the substrings
    const newArray: string[] = [];
    // loop to convert to substrings
    for (let i = 0; i < schedules.length; i++) {
      const currentItem = schedules[i];
      if (currentItem === "THURSDAY") {
        const subtext = currentItem.substring(0, 4);
        newArray.push(subtext);
      } else {
        const subtext = currentItem.substring(0, 3);
        newArray.push(subtext);
      }
    }
    // convert the substring array to a single sting
    const singleString = newArray.join(",");
    return singleString;
  };
  //   function to check if the user is logged in before enrolling for the class
  const enroll = () => {
    if (status === "unauthenticated") {
      return toast.error("register or login to enroll for the class");
    }
    setshowpayment((prev) => !prev);
  };
  return {
    convertArray,
    capitalizeString,
    makeSubString,
    showpayments,
    setshowpayment,
    payMethods,
    setPayMethod,
    enroll,
  };
};
