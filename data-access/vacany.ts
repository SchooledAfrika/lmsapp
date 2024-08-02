import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

// creating a custome hook for functionality in the get vacancies in the website
export const useVacancies = () => {
  const { status } = useSession();
  
 
  //   function to check if the user is logged in before enrolling for the class
  const apply = () => {
    if (status === "unauthenticated") {
      return toast.error("register or login to apply for job");
    }
  };
  return {
   
    apply,
  };
};
