import Image from "next/image";
import React from "react";

const HandleComingSoon = () => {
  return (
    <div className="my-12 flex flex-col items-center ">
      <p className="text-2xl font-bold ">Feature Coming Soon...</p>
      <Image
        src="/unavailable.svg"
        alt="unavailable"
        width={200}
        height={200}
        className="w-[400px] h-[400px] mx-auto"
      />
    </div>
  );
};

export default HandleComingSoon;
