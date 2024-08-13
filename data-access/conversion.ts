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
    const nameArray = fullName.split(" ");
    const firstInitial = nameArray[0].split("")[0];
    const secondInitial = nameArray[1].split("")[0];
    const fullInitial = `${firstInitial}${secondInitial}`;
    return fullInitial;
  };
  const joinByComma = (item: string[]): string => {
    const arrayItem = item.join(", ");
    return arrayItem.toLocaleLowerCase();
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
