"use client";

import { useState } from "react";
import Duration from "@/components/ui/book-teacher/Duration";
import Payment from "@/components/ui/book-teacher/Payment";
import Scheduling from "@/components/ui/book-teacher/Scheduling";
import SessionDetails from "@/components/ui/book-teacher/SessionDetails";


import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const BookSession: React.FC = () => {
  const [showDuration, setDuration] = useState(true);
  const [sessionDetails, setSectionDetails] = useState(false);
  const [scheduling, setScheduling] = useState(false);
  const [payment, setPayment] = useState(false);

  const handleDuration = () => {
    setDuration(false);
    setSectionDetails(true);
    setScheduling(false);
    setPayment(false);
  };

  const handleSectionDetails = () => {
    setDuration(false);
    setSectionDetails(false);
    setScheduling(true);
    setPayment(false);
  };

  const handleScheduling = () => {
    setDuration(false);
    setSectionDetails(false);
    setScheduling(false);
    setPayment(true);
  };

  const handlePayment = () => {
    setDuration(false);
    setSectionDetails(false);
    setScheduling(false);
    setPayment(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" bg-lightGreen  rounded-lg hover:bg-green-500 text-white text-sm mt-6 px-3 w-32 mr-2  py-2 text-center lg:block">
          Book Session
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:w-[800px] bg-stone-100 overflow-x-auto    w-full font-subtext">
        <div className="grid gap-4 font-header py-4">
          {showDuration ? (
            <Duration onClickDurationInfo={handleDuration} />
          ) : sessionDetails ? (
            <SessionDetails onClickSessionInfo={handleSectionDetails} />
          ) : scheduling ? (
            <Scheduling onClickSchedulingInfo={handleScheduling} />
          ) : (
            <Payment onClickPaymentInfo={handlePayment} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookSession;
