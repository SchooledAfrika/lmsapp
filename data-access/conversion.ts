import { format } from "timeago.js";
import { useEffect, useState } from "react";
export const useConversion = () => {
  // const get the date
  function handleDate(time: string) {
    const fullTime = new Date(time);
    const formattedDate = fullTime.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  }
  // here we get time
  function handleTime(time: string) {
    const singleTime = new Date(time);
    const gottenTime = singleTime.toLocaleDateString("en-Us", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const showTime = gottenTime.split(",")[1]?.trim();
    return showTime;
  }
  // handle timeago dot js
  function getTimeAgo(time: string) {
    const date = new Date(time);
    const timeAgo = format(date);
    return timeAgo;
  }

  function makeSubstring(link: string, amt: number) {
    const substring = link.substring(0, amt);
    if (link.length > amt) {
      const total = `${substring}...`;
      return total;
    } else {
      return link;
    }
  }

  function convertMoney(item: number) {
    const newAmount = item.toLocaleString();
    return newAmount;
  }
  const downloadDoc = async (resourceUrl: string, name: string) => {
    const splitName = name.split(" ");
    const joinName = splitName.join("-");
    try {
      const response = await fetch(resourceUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${joinName}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const getInitials = (fullName: string): string => {
    if (!fullName) return ""; // Check if fullName is undefined or empty

    const nameArray = fullName.split(" ");
    const firstInitial = nameArray[0]?.split("")[0] || ""; // Safe check for first initial and fallback
    const secondInitial = nameArray[1]?.split("")[0] || ""; // Safe check for second initial and fallback
    const fullInitial = `${firstInitial}${secondInitial}`;
    return fullInitial;
  };
  const joinByComma = (item: string[]): string => {
    const arrayItem = item.join(", ");
    return arrayItem.toLocaleLowerCase();
  };
  const joinGrades = (item: string[]): string => {
    const newArray = item.map((subItem) =>
      subItem.substring(5, subItem.length)
    );
    let joined = newArray.join(",");
    return joined;
  };
  // here we will calculate the amt to pay for the session
  const totalSessionPayment = (
    selectedDays: string[],
    duration: string,
    hours: number,
    payType: string
  ): number => {
    let totalAmt: number;

    console.log("selectedDays", selectedDays);
    console.log("duration", duration);
    console.log("hours", hours);

    // Return early if billing duration or required parameters are missing
    if (selectedDays.length < 1) return 0;
    if (duration === "Billing period") return 0;
    if (payType === "Private Session" && !hours) return 0;

    // Set base rate
    const baseRate = 35;

    // Determine multiplier for yearly payments
    const multiplier = duration === "monthly" ? 1 : 12;

    // Calculate discount per hour based on the number of selected days
    let discountRate = 0;
    switch (selectedDays.length) {
      case 1:
        discountRate = 0; // No discount for one day
        break;
      case 2:
        discountRate = 5; // 5 per hour discount for two days
        break;
      case 3:
        discountRate = 10; // 10 per hour discount for three days
        break;
      case 4:
        discountRate = 20; // 20 per hour discount for four days
        break;
      default:
        discountRate = 20; // Max discount per hour for five or more days
        break;
    }

    // Calculate total amount, with discount applied per day and per hour
    totalAmt = baseRate * hours * multiplier - discountRate * hours;

    console.log("totalAmt", totalAmt);
    return totalAmt;
  };

  return {
    getTimeAgo,
    handleTime,
    handleDate,
    makeSubstring,
    convertMoney,
    downloadDoc,
    getInitials,
    joinByComma,
    joinGrades,
    totalSessionPayment,
  };
};

export const useGetDocument = (item: string) => {
  console.log(item);
  const [dataSize, setDataSize] = useState<any>(null);
  useEffect(() => {
    const fileSize = async () => {
      const imgRequest = await fetch(item, {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(
            "639554881177297" + ":" + "9Phw6Ugnn7g2NdMEMPPWyoXpcYw"
          )}`,
        },
      });
      const imgSize = imgRequest.headers.get("Content-Length");
      const convertToMb = (Number(imgSize) / 1024).toFixed(2);
      setDataSize(convertToMb);
    };
    fileSize();
  });

  return { dataSize };
};
