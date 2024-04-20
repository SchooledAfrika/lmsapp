"use client";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import Button from "./Button";
import { Popover } from "@headlessui/react";
import { TbMenu2 } from "react-icons/tb";
import { IoIosArrowUp } from "react-icons/io";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { navData } from "@/constants";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const MobileNavLink = ({ children, ...props }) => {
  return (
    <Popover.Button
      as={Link}
      className="block text-base leading-7 mx-6 my-3 tracking-tight text-black"
      {...props}
    >
      {children}
    </Popover.Button>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = () => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 50);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);

      // Clean up the scroll event listener when the component unmounts
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);
  return (
    <header
      className={`w-full my-0 bg-white font-header font-semibold  top-0 z-50   ${
        isScrolled && " shadow-gray-100"
      }`}
    >
      <nav>
        <Container className="relative  z-50 flex justify-between ">
          {/* Logo */}
          <div className="relative z-10 flex items-center gap-16">
            <Logo />
          </div>
          {/* NavLinks */}
          <div className="hidden lg:flex lg:gap-10 items-center">
            <NavLinks />
          </div>
          {/* Buttons */}
          <div className="flex items-center gap-6">
            <Button
              href="/register"
              className="hidden bg-secondary text-white  text-[16.5px] px-6 py-3 lg:block"
            >
              Register
            </Button>
            <Button
              href="/login"
              className="hidden bg-dimOrange text-white  text-[16.5px] px-6 py-3 lg:block"
            >
              Login
            </Button>
            {/* Mobile NavLinks */}
            <Popover className="lg:hidden text-black ">
              {({ open }) => (
                <>
                  <Popover.Button
                    className="relative z-10 -m-2 inline-flex  items-center rounded-lg stroke-gray-900 p-2 hover:bg-gray-200/50 hover:stroke-gray-600 active:stroke-gray-900 [&:not(:focus-visible)]:focus:outline-none outline-none"
                    aria-label="Toggle site navigation"
                  >
                    {({ open }) =>
                      open ? (
                        <IoIosArrowUp className="text-3xl" />
                      ) : (
                        <HiOutlineMenuAlt3 className="text-3xl" />
                      )
                    }
                  </Popover.Button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <>
                        <Popover.Overlay
                          static
                          as={motion.div}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-0 bg-gray-100   backdrop-blur"
                        />
                        <Popover.Panel
                          static
                          as={motion.div}
                          initial={{ opacity: 0, y: -32 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{
                            opacity: 0,
                            y: -32,
                            transition: { duration: 0.2 },
                          }}
                          className="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl  px-6 pb-6 pt-32 shadow-2xl shadow-gray-900/20"
                        >
                          <div className="space-y-4 ">
                            {navData.map(({ _id, title, href }) => (
                              <MobileNavLink href={href} key={_id}>
                                {title}
                              </MobileNavLink>
                            ))}
                          </div>
                          <div className="mt-8 flex flex-col gap-4">
                            <Button
                              href="/register"
                              className="bg-secondary text-white"
                              variant="outline"
                            >
                              Register
                            </Button>
                            <Button
                              className="bg-dimOrange text-white"
                              href="/login"
                            >
                              Login
                            </Button>
                          </div>
                        </Popover.Panel>
                      </>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Popover>
          </div>
        </Container>
      </nav>
    </header>
  );
};

export default Header;
