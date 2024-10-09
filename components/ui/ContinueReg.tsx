"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import Footer from "@/components/Footer";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/data-access/authentication";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signIn } from "next-auth/react";

// creating our zod schema for registration using credential means
const CredentialReg = z
  .object({
    email: z.string().email({ message: "enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "password do not match",
  });

const ContinueReg: React.FC = () => {
  const router = useRouter();
  const { handleCredentialReg, handleLogin, loading } = useAuth();
  //   creating instance of the hook form
  // lets first get the credentialReg type that we need
  type ICredentials = z.infer<typeof CredentialReg>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICredentials>({ resolver: zodResolver(CredentialReg) });
  //   here we handle form submission
  const onSubmit = (data: ICredentials) => {
    const { email, password } = data;
    handleCredentialReg(email, password);
  };

  return (
    <div className="w-full font-subtext">
      <div className="flex flex-col md:flex-row justify-between items-center px-[1rem] md:px-[10rem] py-[1rem] md:pt-[2rem] md:pb-[5rem] w-full">
        <div className="sm:w-full md:w-[45%]">
          <Link href="/">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={100}
              height={100}
              className="w-[100px] mb-4 "
              priority
            />
          </Link>
          <span className="font-bold text-[22px]">
            Welcome to Schooled Afrika !
          </span>
          <p className="text-gray-500 py-6 text-[14px]">
            SchooledAfrika is a dynamic and innovative educational platform
            dedicated to nurturing young minds and fostering a love for
            learning.
            <br />
            Our mission is to provide children with engaging and interactive
            learning experiences that inspire creativity, critical thinking, and
            curiosity. Through our carefully curated curriculum and hands-on
            approach, we aim to empower children to reach their full potential
            and thrive academically, socially, and emotionally.
          </p>
          <span className="text-gray-500 text-[12px]">
            Have an account ?
            <Link href="/login">
              <span className="font-bold text-black underline pl-2 text-[14px]">
                Login
              </span>
            </Link>
          </span>
        </div>

        <div className="w-full md:w-[45%]">
          <div className="flex justify-end mb-[50px]">
            <Link href="/">
              <Image
                src="/svgs/close.svg"
                alt="close"
                width={100}
                height={100}
                className="w-[15px]"
              />
            </Link>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" w-full flex flex-col gap-2"
          >
            <label className="font-bold">Provide Details</label>

            <div>
              <input
                {...register("email")}
                name="email"
                placeholder="Enter Email Address"
                className={`mt-3 p-4  outline-none ${
                  errors.email && "border-red-600 border"
                }  rounded-[8px] w-full bg-white`}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div>
              <input
                {...register("password")}
                type="password"
                name="password"
                placeholder="enter Password"
                className={`mt-3 p-4  outline-none ${
                  errors.password && "border-red-600 border"
                }  rounded-[8px] w-full bg-white`}
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
            <div>
              <input
                {...register("confirmPassword")}
                type="password"
                name="confirmPassword"
                placeholder="confirm Password"
                className={`mt-3 p-4  outline-none ${
                  errors.confirmPassword && "border-red-600 border"
                }  rounded-[8px] w-full bg-white`}
              />
              {errors.confirmPassword && (
                <span className="text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="bg-secondary w-full text-white text-[16px] px-6 py-7 my-3"
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>
          <div className="flex flex-col justify-center">
            <Button
              onClick={() => handleLogin("google")}
              className="flex items-center bg-white hover:bg-lightGreen text-black w-full text-[16px] px-6 py-7 my-3"
            >
              Sign in with Google{" "}
              <Image
                src="/svgs/google.svg"
                alt="Google"
                width={30}
                height={30}
                className="pl-2"
              />
            </Button>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default ContinueReg;
