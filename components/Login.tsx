"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Footer from "./Footer";
import Link from "next/link";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/data-access/authentication";
import { useSearchParams } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// creating a schema for zod
const loginSchema = z.object({
  email: z.string().email({ message: "provide a valid email address" }),
  password: z
    .string()
    .min(8, { message: "password should be at least 8 characters" }),
});

const Login: React.FC = () => {
  const { handleLogin, loading } = useAuth();
  const params = useSearchParams();
  const newUser = Boolean(params.get("newAccount"));
  useEffect(() => {
    if (newUser === true) {
      toast.success("account creation successful!!!");
    }
  }, []);
  // our login type
  type Ilogin = z.infer<typeof loginSchema>;
  // our hook for functions
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Ilogin>({ resolver: zodResolver(loginSchema) });
  // handle login with credentials
  const onSubmit = (data: Ilogin) => {
    handleLogin("credentials", data.email, data.password);
  };
  return (
    <div className="w-full font-subtext">
      <div className="flex flex-col md:flex-row justify-between items-center px-[1rem] md:px-[10rem] py-[1rem] md:py-[5rem] w-full">
        <div className="sm:w-full md:w-[45%]">
          <Link href="/">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={100}
              height={100}
              className="w-[100px] mb-4 "
            />
          </Link>
          <span className="font-bold text-[22px]">
            Welcome to SchooledAfrika !
          </span>
          <p className="text-gray-500 py-6 text-[14px]">
          SchooledAfrika is a dynamic and innovative educational platform dedicated to nurturing young
          minds and fostering a love for learning.<br/>
          Our mission is to provide children with engaging and interactive learning experiences that
          inspire creativity, critical thinking, and curiosity. Through our carefully curated curriculum and
          hands-on approach, we aim to empower children to reach their full potential and thrive
          academically, socially, and emotionally.
          </p>
          <span className="text-gray-500 text-[12px]">
            New User?
            <Link href="/register">
              <span className="font-bold text-black underline pl-2 text-[14px]">
                Register
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
          <p className="font-bold mb-2">Provide Details</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" w-full flex flex-col gap-2"
          >
            <div>
              <input
                {...register("email")}
                name="email"
                placeholder="Enter Email Address"
                className=" p-4  outline-none rounded-[8px] w-full bg-white"
              />
              {errors.email && (
                <small className=" text-red-600">{errors.email.message}</small>
              )}
            </div>
            <div>
              <input
                {...register("password")}
                type="password"
                name="password"
                placeholder="Enter Password"
                className=" p-4  outline-none rounded-[8px] w-full bg-white"
              />
              {errors.password && (
                <small className=" text-red-600">
                  {errors.password.message}
                </small>
              )}
            </div>
            <Button
              type="submit"
              disabled={loading}
              className={` bg-secondary hover:bg-secondary w-full text-white text-[16px] px-6 py-7 my-3`}
            >
              {loading ? "logging in..." : "login"}
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
            <Button className="flex items-center bg-white hover:bg-lightGreen text-black w-full text-[16px] px-6 py-7">
              Sign in with Apple ID{" "}
              <Image
                src="/svgs/apple.svg"
                alt="Apple"
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

export default Login;
