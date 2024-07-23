"use client";
import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Container from "@/components/Container";
import Link from "next/link";
import { IKycSub } from "./DocumentUpload";

const TakePicture: React.FC<IKycSub> = ({
  register,
  errors,
  control,
  clearErrors,
  watch,
}) => {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [verifiedImg, setVerifiedImg] = useState<string | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setVerifiedImg(imageSrc);
    }
  }, [webcamRef]);

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

        <br />
        {isCaptureEnable || (
          <Button
            className="bg-lightGreen hover:bg-green-600"
            onClick={() => setCaptureEnable(true)}
          >
            Start Capture
          </Button>
        )}
        {isCaptureEnable && (
          <>
            <div>
              <Button
                className="bg-red-500 hover:bg-red-400 my-1"
                onClick={() => setCaptureEnable(false)}
              >
                End Capture
              </Button>
            </div>
            <Webcam
           
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
            <div className="flex space-x-2 justify-center max-w-[450px] mt-2 font-bold text-white">
              <Button
                className="bg-lightGreen text-[13px] rounded-md py-2 px-6"
                onClick={capture}
              >
                Capture
              </Button>
              <Button
                className="bg-red-500 text-[13px] rounded-md py-2 px-6"
                onClick={() => setVerifiedImg(null)}
              >
                Refresh
              </Button>
            </div>
          </>
        )}

        {verifiedImg && (
          <div>
            <Image
              src={verifiedImg}
              alt="Screenshot"
              width={450}
              height={250}
              className="my-3 shadow-xl"
            />
          </div>
        )}
      </Container>
    </section>
  );
};
export default TakePicture;
