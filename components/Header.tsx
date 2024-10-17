"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Menu from "@/images/menu.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import ShowProfile from "./ShowProfile";

const navLinks = [
  { name: "Find Tutors", href: "/find-tutors" },
  { name: "Classes", href: "/find-classes" },
  { name: "Apply to teach", href: "/apply-to-teach" },
  { name: "Vacancies", href: "/vacancies" },
  { name: "Courses", href: "/courses" },

  { name: "Contact Us", href: "/contact" },
];

const Header = () => {
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };
  const closeMenu = () => {
    setMenu(false);
  };
  const pathname = usePathname();
  const { status, data } = useSession();

  return (
    <div className=" bg-white h-[75px] sticky sm:top-0 font-subtext border-b-2 font-semibold    md:shadow-none z-50 ">
      {/* DESKTOP */}

      <div className=" hidden w-full h-full sm:flex justify-between items-stretch px-2 md:px-4 ">
        <div className=" flex items-center">
          <Link href="/">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={100}
              height={100}
              priority={true}
              className="w-[100px]"
            />
          </Link>
        </div>

        <div className=" flex h-full pt-[30px] ">
          <div className="flex gap-8 font-header xl:gap-[50px] sm:text-[14px] md:text-[14px] ">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  href={link.href}
                  key={link.name}
                  className={
                    isActive
                      ? "font-bold border-lightGreen border-b-2 "
                      : "font-semibold"
                  }
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        {status === "unauthenticated" ? (
          <div className="flex items-center  gap-1 md:gap-3 lg:gap-4">
            <div className=" bg-secondary rounded-md  md:rounded-[10px] flex items-center hover:bg-green-600 text-white text-[12px] md:text-[13px] px-4 md:px-6 justify-center py-2 md:py-[11px] sm:block">
              <Link href="/login">Login</Link>
            </div>

            <div className=" flex rounded-[10px] justify-center items-center  bg-dimOrange hover:bg-orange-600 text-white text-[12px]  md:text-[14px] md:px-6 px-4 py-2 md:py-[11px] sm:block">
              <Link href="/register">Register</Link>
            </div>
          </div>
        ) : (
          <ShowProfile />
        )}
      </div>

      {/* MOBILE */}
      <div
        className={` block sm:hidden  fixed top-0 w-full z-[999]   py-6 animate-in fade-in zoom-in  ${
          menu ? " bg-white py-2" : "bg-white"
        } `}
      >
        <div className="flex justify-between  mx-[10px]">
          <div className="flex gap-[50px] text-[16px] items-center select-none">
            <Link href="/">
              <Image
                 onClick={closeMenu}
                src={"/logo.png"}
                alt="logo"
                width={100}
                height={100}
                className="w-[100px] "
              />
            </Link>
          </div>
          <div className="flex items-center gap-[40px]">
            {menu ? (
              <X
                className="cursor-pointer animate-in fade-in zoom-in text-black"
                onClick={toggleMenu}
              />
            ) : (
              <Image
              
                src={Menu}
                alt="logo"
                className="cursor-pointer animate-in fade-in zoom-in"
                onClick={toggleMenu}
              />
            )}
          </div>
        </div>
        {menu ? (
          <div className="my-8 select-none animate-in slide-in-from-right ">
            <div className="flex flex-col gap-8 mt-8 mx-4 ">
              <div className="flex gap-[20px] font-header xl:gap-[50px] text-[16px] flex-col select-none ">
              {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                onClick={closeMenu}
                  href={link.href}
                  key={link.name}
                  className={
                    isActive
                      ? "font-bold text-lightGreen "
                      : "font-semibold"
                  }
                >
                  {link.name}
                </Link>
              );
            })}
               
              </div>

              {status === "unauthenticated" ? (
                <div className="flex flex-col  items-center mr-2 gap-6">
                  <Button
                   onClick={closeMenu}
                    asChild
                    className=" bg-secondary w-full items-center hover:bg-green-600 text-white   text-[16.5px] px-6 py-2 lg:block"
                  >
                    <Link href="/register">Register</Link>
                  </Button>

                  <Button
                   onClick={closeMenu}
                    asChild
                    className=" bg-dimOrange w-full hover:bg-orange-600 text-white  text-[16.5px] px-6 py-2 lg:block"
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                </div>
              ) : (
                <ShowProfile />
              )}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Header;
