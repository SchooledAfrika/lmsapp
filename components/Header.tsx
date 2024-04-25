"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Menu from "@/images/menu.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  {name: "Find Tutors", href: "/find-tutors"},
  {name: "Classes", href: "/find-classes"},
  {name: "Apply to teach", href: "/apply-to-teach"},
  {name: "Contact", href: "/contact"},
]

const Header = () => {
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };
  const pathname = usePathname();
 

 

  return (
    <div className=" bg-white sticky md:top-0 font-subtext border-b-2 font-semibold h-[75px]   md:shadow-none z-[999] ">
      {/* DESKTOP */}
      <div className=" hidden lg:block p-4 ">

        <div className="flex justify-between items-center">
          <Link href="/">
          <div>
            <Image
              src={"/logo.png"}
              alt="logo"
              width={100}
              height={100}
              className="w-[100px] ml-10 "
            />
          </div>
          </Link>
          
          <div className="flex gap-[20px] xl:gap-[50px] text-[16.5px] space-x-6 justify-center items-center select-none">
            {navLinks.map((link)=> {
               const isActive = pathname.startsWith(link.href)
              return(
                <Link href={link.href} key={link.name}
                  className={isActive ? "font-bold border-b-2 leading-[57px]  border-lightGreen" : "normal leading-[20px]"}
                
                >
                  {link.name}
                </Link>
              )

            })}
            
          </div>

          <div className="flex items-center mr-2 gap-6">
            <Button
              asChild
              className="hidden bg-secondary items-center hover:bg-green-600 text-white   text-[16.5px] px-6 py-2 lg:block"
            >
              <Link href="/register">Register</Link>
            </Button>

            <Button
              asChild
              className="hidden bg-dimOrange hover:bg-orange-600 text-white  text-[16.5px] px-6 py-2 lg:block"
            >
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </div>
      {/* MOBILE */}
      <div
        className={` block lg:hidden  rounded-xl   fixed top-0 w-full z-[999]   py-6 animate-in fade-in zoom-in  ${
          menu ? " bg-white py-2" : "bg-white"
        } `}
      >
        <div className="flex justify-between  mx-[10px]">
          <div className="flex gap-[50px] text-[16px] items-center select-none">
            <Link href="/">
            <Image
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
              <div className="flex gap-[20px] xl:gap-[50px] text-[16px] flex-col select-none ">
                <Link href="/find-tutors">Find Tutors</Link>
                <Link href="/classes">Classes</Link>
                <Link href="/apply-to-teach">Apply to teach</Link>
                <Link href="/contact">Contact</Link>
              </div>

              <div className="flex flex-col  items-center mr-2 gap-6">
                <Button
                  asChild
                  className=" bg-secondary w-full items-center hover:bg-green-600 text-white   text-[16.5px] px-6 py-2 lg:block"
                >
                  <Link href="/register">Register</Link>
                </Button>

                <Button
                  asChild
                  className=" bg-dimOrange w-full hover:bg-orange-600 text-white  text-[16.5px] px-6 py-2 lg:block"
                >
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
    // const [toggle, setToggle] = useState(false);
    // return (
    //   <nav className=" bg-black font-subtext text-[16.5px]  w-full text-white font-semibold cursor-pointer py-6 flex justify-between items-center navbar ">
    //     <Image src={Logo} alt="logo" className="w-[180px] z-[5] mr-20 h-[180px]  " />

    //       <div className="sm:flex hidden space-x-6 justify-center flex-1 items-center ">
    //         <Link href="/find-tutors">Find Tutors</Link>
    //         <Link href="/classes">Classes</Link>
    //         <Link href="/apply-to-teach">Apply to teach</Link>
    //         <Link href="/contact">Contact</Link>

    //       </div>
    //       <div className="flex items-center mr-2 gap-6">
    //         <Button
    //           asChild
    //           className="hidden bg-secondary items-center hover:bg-green-600 text-white   text-[16.5px] px-6 py-2 lg:block"
    //         >
    //           <Link href="/register">Register</Link>
    //         </Button>

    //         <Button
    //           asChild
    //           className="hidden bg-dimOrange hover:bg-orange-600 text-white  text-[16.5px] px-6 py-2 lg:block"
    //         >
    //           <Link href="/login">Login</Link>
    //         </Button>
    //       </div>

    //     <div className="sm:hidden z-[5] flex flex-1 mr-4 justify-end  items-center">
    //       <Image
    //         src={toggle ? close : menu}
    //         alt="menu"
    //         className="w-[28px]  h-[28px] object-contain"
    //         onClick={() => setToggle((prev) => !prev)}
    //       />
    //     <div className="sm:hidden z-[5] flex flex-1 mr-4 justify-end  items-center">
    //       <Image
    //         src={toggle ? close : menu}
    //         alt="menu"
    //         className="w-[28px]  h-[28px] object-contain"
    //         onClick={() => setToggle((prev) => !prev)}
    //       />

    //       {/* MOBILE NAVBAR */}
    //       <div
    //         className={`${
    //           toggle ? "flex" : "hidden"
    //         } text-black z-[6] p-6 bg-white absolute top-20 right-0  mx-4 my-12 min-w-[200px] rounded-xl sidebar`}
    //       >
    //         <div className="flex flex-col  justify-end items-center   flex-1 text-[16px] text-black    ">
    //           <div className="flex flex-col  justify-end items-center   flex-1 text-[16px] z-[6]">
    //             <Link href="/find-tutors">Find Tutors</Link>
    //             <Link href="/classes">Classes</Link>
    //             <Link href="/apply-to-teach">Apply to teach</Link>
    //             <Link href="/contact">Contact</Link>

    //         </div>
    /* <div className="flex items-center mr-2 gap-6">
          <Button
            asChild
            className="hidden bg-secondary items-center hover:bg-green-600 text-white   text-[16.5px] px-6 py-2 lg:block"
          >
            <Link href="/register">Register</Link>
          </Button>

          <Button
            asChild
            className="hidden bg-dimOrange hover:bg-orange-600 text-white  text-[16.5px] px-6 py-2 lg:block"
          >
            <Link href="/login">Login</Link>
          </Button>
        </div>
            */

    //     </div>
    //   </div>
    // </nav>
  );
};

export default Header;
