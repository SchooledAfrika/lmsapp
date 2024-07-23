"use client";
import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Container from "@/components/Container";
import Link from "next/link";
import { IKycSub } from "./DocumentUpload";
import { FaCheck } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const TakePicture: React.FC<IKycSub> = ({ setValue, errors, clearErrors }) => {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam | null>(null);
  const [verifiedImg, setVerifiedImg] = useState<string | undefined>(undefined);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setVerifiedImg(imageSrc);
    }
    setValue("verifiedImg", imageSrc as string);
    clearErrors("verifiedImg");
  };
  // this button handles setting up the camera for webcam
  const handleSwitchToWebCam = () => {
    setCaptureEnable(true);
  };

  const handleCancel = () => {
    setVerifiedImg(undefined);
    setValue("verifiedImg", "");
  };

  const videoConstraints = {
    width: 450,
    height: 250,
    facingMode: "user",
  };
  return (
    <section className="py-[1rem] font-header md:pt-[3rem]">
      <Container>
        <h3 className="font-bold text-[18px] ">
          Complete Your KYC Verification
        </h3>
        <p className="md:w-[450px] text-[13.5px] py-2">
          We want to be sure it's you. Upload or take a recent picture.
        </p>
        <div className=" w-full md:w-[450px]">
          {isCaptureEnable ? (
            <div>
              {verifiedImg ? (
                <div className=" w-full h-[300px] relative">
                  <Image
                    src={verifiedImg}
                    alt=""
                    width={200}
                    height={200}
                    className=" w-full h-full object-cover"
                  />
                  <div
                    onClick={handleCancel}
                    className=" cursor-pointer transition-all ease-in-out duration-700 hover:bg-red-600 w-[50px] aspect-square transform -translate-x-1/2 rounded-full bg-red-700 absolute bottom-2 left-1/2 flex items-center justify-center "
                  >
                    <AiOutlineClose className=" text-white text-[25px]" />
                  </div>
                </div>
              ) : (
                <div className=" w-full relative ">
                  <Webcam
                    className=" w-full h-full"
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                  />
                  <div
                    onClick={capture}
                    className=" cursor-pointer transition-all ease-in-out duration-700 hover:bg-green-600 w-[50px] aspect-square transform -translate-x-1/2 rounded-full bg-green-700 absolute bottom-2 left-1/2 flex items-center justify-center "
                  >
                    <FaCheck className=" text-white text-[25px]" />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleSwitchToWebCam}
              className=" px-4 py-2 bg-green-700 text-white rounded-md"
            >
              Take a pix
            </button>
          )}
        </div>
        {errors.verifiedImg && (
          <small className=" text-red-600">{errors.verifiedImg.message}</small>
        )}
      </Container>
    </section>
  );
};
export default TakePicture;
