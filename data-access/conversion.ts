import { format } from "timeago.js";

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

  return { getTimeAgo, handleTime, handleDate, makeSubstring };
};
