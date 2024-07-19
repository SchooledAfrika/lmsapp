"use client";

import React from "react";
import Container from "./Container";
import { useQuery } from "@tanstack/react-query";
import { PopularClassesCard, Iclass } from "./PopularClasses";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SampleClass = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["home-class"],
    queryFn: async () => {
      const response = await fetch("/api/sample-class");
      const result = await response.json();
      return result;
    },
  });
  if (isLoading) {
    return (
      <Container>
        <p>loading classes</p>
      </Container>
    );
  }
  return (
    <div className=" mt-6">
      <Container>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.isArray(data) &&
            data.map((item: Iclass, index) => (
              <PopularClassesCard key={index} item={item} />
            ))}
        </div>
        <div className=" w-full flex items-center justify-center mt-3">
          <Link
            className=" px-4 py-2 rounded-md bg-orange-500 text-white"
            href={"/find-classes"}
          >
            More classes
          </Link>
        </div>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default SampleClass;
