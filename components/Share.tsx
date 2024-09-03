import React, { useState, useEffect } from "react";
import { MdShare } from "react-icons/md";
import { IoCopyOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";

const ShareLink = () => {
  const [supportshare, setsupportshare] = useState<boolean>(false);
  const [copy, setcopy] = useState<string>("link");

  //    type guard function
  function isnavigator(): boolean {
    return "share" in navigator;
  }
  // this useeffect is for checking if the browser supports
  // window.navigtor.share()
  useEffect(() => {
    setsupportshare(isnavigator());
  }, []);

  // here we will handleshare
  const handleshare = () => {
    window.navigator.share({ url: window.location.href });
  };
  // here we handle copy
  // for browsers that does not support share
  const handlecopy = async () => {
    try {
      setcopy("copied");
      // here we copy the corrent url to the clipboard
      await window.navigator.clipboard.writeText(window.location.href);
      // we reset the state to copy after 3 seconds
      setTimeout(() => {
        setcopy("link");
      }, 3000);
    } catch (error) {
      alert("copy not supported in your browser, use chrome for share");
    }
  };

  return (
    <div className="text-white">
      {supportshare ? (
        <div
          onClick={handleshare}
          className=" px-2  md:px-4 py-2 border flex border-black text-black   space-x-1 items-center rounded-md cursor-pointer"
        >
          <MdShare />
          <p>share</p>
        </div>
      ) : (
        <div
          onClick={handlecopy}
          className={` transform duration-700 ease-in-out ${
            copy == "link" ? "text-black" : "text-green-700"
          } px-2 py-1  flex space-x-1 items-center rounded-md border border-black cursor-pointer`}
        >
          <IoCopyOutline />
          <p>{copy}</p>
        </div>
      )}
    </div>
  );
};

export default ShareLink;
