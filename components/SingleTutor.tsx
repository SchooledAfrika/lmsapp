"use client";
import Image from "next/image";
import React, { useState } from "react";
import { MdVerified } from "react-icons/md";
import { FaShareAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import { DialogButton } from "./Dialog";
import { ShareButton } from "./ShareButton";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Container from "./Container";
import Backwards from "./ui/Backwards";
import { Iratter, ISessionShow } from "./AllTutors";
import { useClasses } from "@/data-access/class";
import { IoIosStar } from "react-icons/io";
import { MdShare } from "react-icons/md";
import { useSession } from "next-auth/react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoClose } from "react-icons/io5";
import ShareLink from "./Share";
import { CircularProgress } from "@mui/material";

// this is to show that item is not submitted yet
const BeforeReviewSubmit: React.FC<{
  setShowratting: React.Dispatch<React.SetStateAction<boolean>>;
  teacherId: string;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowratting, teacherId, setSubmitted }) => {
  const starArray = [1, 2, 3, 4, 5];
  const [comment, setcomment] = useState<string | undefined>(undefined);
  const [rateValue, setRateValue] = useState<number>(0);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const queryclient = useQueryClient();
  const { data } = useSession();
  // the function that handles review
  const handleReview = (index: number) => {
    setRateValue(index);
  };
  const mutation = useMutation({
    mutationKey: ["make-review"],
    mutationFn: async () => {
      const response = await fetch("/api/make-review", {
        method: "POST",
        body: JSON.stringify({
          comment,
          rateValue,
          teacherId,
        }),
      });
      return response;
    },
    onSuccess: async (response) => {
      const result = await response.json();
      if (response.ok) {
        setSubmitted(true);
        queryclient.invalidateQueries({ queryKey: ["get-one-session"] });
      } else {
        return toast.error(result.message);
      }
    },
  });
  // make submit to handle review
  const handleSubmitReview = () => {
    if (comment === undefined || rateValue < 1) {
      return toast.error("Both comment and the rating is required");
    }
    if (data?.user.role !== "Student") {
      return toast.error("Only student are allowed to review");
    }
    setSubmitting(true);
    mutation.mutate();
  };

  return (
    <div className=" w-full flex flex-col gap-3 items-center">
      <div className=" w-[100px] aspect-square rounded-full border flex items-center justify-center border-orange-500 p-4">
        <Image
          src="/like.jpg"
          alt="like"
          width={200}
          height={200}
          className=" w-[80px]"
        />
      </div>
      <div className=" flex flex-col items-center -space-y-2 font-semibold">
        <p>How would you rate this tutor?</p>
        <p>your review is important</p>
      </div>
      <div className=" w-4/5 px-2 py-2 border border-orange-500 rounded-md flex flex-col gap-2">
        <textarea
          onChange={(e) => setcomment(e.target.value)}
          className=" w-full h-[100px] focus:outline-none text-black border-0"
          placeholder="make a review comment..."
        />
      </div>
      <div className=" items-center flex">
        <div className=" flex items-center gap-2">
          {starArray.map((star, index) => (
            <IoIosStar
              onClick={() => handleReview(star)}
              className={` text-[27px] cursor-pointer ${
                star <= rateValue ? "text-orange-500" : " text-slate-600"
              } `}
              key={index}
            />
          ))}
        </div>
      </div>
      <div className=" w-3/4 flex flex-col gap-2">
        <button
          disabled={submitting}
          onClick={handleSubmitReview}
          className=" cursor-pointer w-full bg-green-800 py-3 rounded-2xl flex items-center justify-center text-white"
        >
          {submitting ? <p>Submitting...</p> : <p>Submit</p>}
        </button>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShowratting(false);
          }}
          className=" w-full items-center justify-center py-2 flex text-[16px] cursor-pointer text-slate-500 "
        >
          <p>No thanks</p>
        </div>
      </div>
    </div>
  );
};
// this is the component to show after review submission
const AfterReviewSubmit: React.FC<{
  setShowratting: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowratting }) => {
  return (
    <div className=" w-full py-10 items-center flex justify-center flex-col relative">
      <div
        onClick={(e) => {
          e.stopPropagation();
          setShowratting(false);
        }}
        className=" absolute top-0 right-0 text-[25px] cursor-pointer"
      >
        <IoClose />
      </div>
      <Image
        src="/success.jpg"
        alt="successful"
        width={200}
        height={200}
        className=" w-[150px]"
      />
      <p className=" font-bold text-green-800 text-[20px]">successful!!!</p>
    </div>
  );
};

// this component contains the dialog box to display ratting
const ShowRatting: React.FC<{
  showratting: boolean;
  setShowratting: React.Dispatch<React.SetStateAction<boolean>>;
  teacherId: string;
}> = ({ showratting, setShowratting, teacherId }) => {
  // this state tuggles to show successfully review
  const [submitted, setSubmitted] = useState<boolean>(false);
  return (
    <Dialog open={showratting} onOpenChange={() => setShowratting(false)}>
      <DialogTrigger className=" w-full" asChild>
        <div className="w-full font-bold  py-3 text-green-800 max-md:text-[12px] flex justify-center items-center rounded-lg border border-green-800">
          rate
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        {submitted ? (
          <AfterReviewSubmit setShowratting={setShowratting} />
        ) : (
          <BeforeReviewSubmit
            setShowratting={setShowratting}
            teacherId={teacherId}
            setSubmitted={setSubmitted}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

const ProfileShow: React.FC<{
  dp: string;
  name: string;
  teacherId: string;
}> = ({ dp, name, teacherId }) => {
  const [showRatting, setShowratting] = useState<boolean>(false);
  const { status } = useSession();
  const handleRattingShow = () => {
    if (status === "unauthenticated") {
      return toast.error("login to rate this tutor");
    }
    setShowratting(true);
  };
  return (
    <div className=" w-full  bg-white flex flex-col gap-4 py-8 items-center rounded-lg">
      <div className=" w-[200px] h-[200px] rounded-lg overflow-hidden">
        <Image
          src={dp}
          width={200}
          height={200}
          alt=""
          className=" w-full h-full object-cover"
        />
      </div>
      <div className=" flex items-center gap-2">
        <p className=" font-bold text-[20px]">{name}</p>
        <MdVerified className=" text-[20px] text-green-800" />
      </div>
      <div className=" flex flex-col gap-3 items-center w-full">
        <div className=" w-1/3 py-3 bg-green-800 text-white max-md:text-[12px] flex items-center justify-center rounded-lg">
          <p>Book a session</p>
        </div>
        <div onClick={handleRattingShow} className=" w-1/3 cursor-pointer">
          <ShowRatting
            showratting={showRatting}
            setShowratting={setShowratting}
            teacherId={teacherId}
          />
        </div>
      </div>
    </div>
  );
};

const Desc: React.FC<{
  name: string;
  desc: string;
  subjects: string[];
  preferences: string[];
  ratting: any;
}> = ({ name, desc, subjects, preferences, ratting }) => {
  const { capitalizeString } = useClasses();
  return (
    <div>
      <div className=" flex flex-col gap-4">
        <p className=" font-bold text-[20px] max-sm:text-[16px]">
          About {name}
        </p>
        <p className=" text-slate-600">{desc}</p>
        <div className=" flex flex-col gap-2">
          <div className=" flex flex-wrap items-center gap-3 font-bold">
            <p>Subjects:</p>
            {subjects.map((subject, index) => (
              <div key={index} className=" flex items-center gap-1 ">
                <Image
                  src={`/${subject.toLowerCase()}.png`}
                  alt=""
                  width={200}
                  height={200}
                  className=" w-[20px] aspect-square"
                />
                <p>{capitalizeString(subject)}</p>
              </div>
            ))}
          </div>
          <div className=" flex items-center gap-3">
            {preferences.map((preference, index) => (
              <div
                className=" text-[12px] px-3 py-2 bg-orange-200 rounded-lg border border-orange-600 text-black"
                key={index}
              >
                <p>{preference}</p>
              </div>
            ))}
          </div>
        </div>
        <Share ratting={ratting} />
      </div>
    </div>
  );
};

const Share: React.FC<{ ratting: number }> = ({ ratting }) => {
  return (
    <div className=" w-full flex items-center justify-between">
      <div className=" flex items-center gap-3">
        <p className=" font-bold text-[20px]">Review</p>
        <div className=" flex items-center gap-1">
          <IoIosStar className=" text-orange-500" />
          {ratting === null ? <p>0</p> : <p>{ratting.toFixed(2)}</p>}
        </div>
      </div>
      <ShareLink />
    </div>
  );
};

const Rattings: React.FC<{
  rate: Iratter;
}> = ({ rate }) => {
  return (
    <div className=" flex flex-col w-full px-5 py-2 bg-white rounded-md ">
      <div className=" w-full flex gap-4 items-center">
        <div className=" flex-1 aspect-square border border-orange-600 rounded-sm p-1">
          <Image
            src={rate.ratter.profilePhoto}
            alt="dp"
            width={200}
            height={200}
            className=" w-full h-full"
          />
        </div>
        <div className=" flex-11">
          <div className=" flex items-center justify-between">
            <p className=" text-black font-bold max-sm:text-[14px] text-[20px]">
              {rate.ratter.name}
            </p>
            <div className=" flex md:gap-1 items-center max-sm:text-[12px]">
              <IoIosStar className=" text-orange-600" />
              <p>{rate.rateValue}</p>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <div className=" w-full flex gap-4">
        <div className=" flex-1 aspect-square rounded-sm p-1"></div>
        <div className=" flex-11 leading-tight max-sm:text-[12px]">
          <p>{rate.comment}</p>
        </div>
      </div>
    </div>
  );
};

export const FullPageLoading = () => {
  return (
    <div className=" w-full h-[calc(100vh-70px)] bg-slate-100 flex items-center justify-center">
      <CircularProgress size={80} color="success" />
    </div>
  );
};

const SingleTutor = () => {
  const { id } = useParams();
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["get-one-session"],
    queryFn: async () => {
      const response = await fetch(
        `/api/apply-for-section/single-section/${id}`
      );
      const result = await response.json();
      return result;
    },
  });
  if (isLoading) {
    return <FullPageLoading />;
  }
  const SingleData: ISessionShow = data;
  return (
    <Container>
      <div className=" w-full mt-16">
        <div className=" w-full flex items-end justify-end">
          <Backwards />
        </div>
        <div className=" flex mt-4 gap-10 sm:flex-row flex-col">
          <div className=" flex-4">
            <ProfileShow
              dp={SingleData.teacher.profilePhoto}
              name={SingleData.teacher.name}
              teacherId={SingleData.teacherId}
            />
          </div>
          <div className=" flex-6 flex flex-col gap-4">
            <Desc
              name={SingleData.teacher.name}
              desc={SingleData.aboutTutor}
              subjects={SingleData.subjects}
              preferences={SingleData.preference}
              ratting={SingleData.teacher.rating}
            />
            <div className=" w-full flex flex-col gap-2">
              {SingleData.teacher.Ratting?.map((rate, index) => (
                <Rattings key={index} rate={rate} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default SingleTutor;
