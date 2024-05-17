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
  {name: "Vacancies", href: "/vacancies"},
  
  {name: "Contact Us", href: "/contact"},
]

const Header = () => {
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };
  const pathname = usePathname();
 

 

  return (
    <div className=" bg-white sticky md:top-0 font-subtext border-b-2 font-semibold h-[75px]   md:shadow-none z-50 ">
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
                <Link href="/find-classes">Classes</Link>
                <Link href="/apply-to-teach">Apply to teach</Link>
                <Link href="/vacancies">Vacancies</Link>
                <Link href="/contact">Contact Us</Link>
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
    
  );
};

export default Header;