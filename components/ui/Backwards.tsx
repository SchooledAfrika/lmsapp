"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const Backwards = () => {
  const router = useRouter();
  return (
    <div className=" cursor-pointer" onClick={() => router.back()}>
      <Image src="/closeAlt.svg" alt="cancel" width={15} height={15} />
    </div>
  );
};

export default Backwards;
