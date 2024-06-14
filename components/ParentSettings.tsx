"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

const ParentSettings = () => {
  const [wards, setWards] = useState([{ name: "", phone: "", accessId: "" }]);

  const addWard = (event: any) => {
    event.preventDefault();
    setWards((prevWards) => [
      ...prevWards,
      { name: "", phone: "", accessId: "" },
    ]);
  };

  const handleChange = (
    index: number,
    { target: { name, value } }: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWards((prevWards) =>
      prevWards.map((ward, i) =>
        i === index ? { ...ward, [name]: value } : ward
      )
    );
  };

  return (
    <section className="flex flex-col md:flex-row mt-[100px] md:mt-[30px] gap-4">
      <div className="flex-5 bg-[#FFFFFF] rounded-[5px] p-5 h-[100vh] overflow-y-scroll scrollbar-hide">
        <hr className="my-4" />
        <form>
          <label className="font-bold text-[14px] text-[#9F9F9F]">
            Personal Information
          </label>
          <br />
          <div className="flex gap-[10px] pt-4">
            <input
              type="text"
              className="outline-none p-3 rounded-[5px]  border-2 w-[50%]"
              placeholder="Full Name"
            />
            <input
              type="text"
              className="outline-none p-3 rounded-[5px] border-2 w-[50%]"
              placeholder="Phone Number"
            />
          </div>
          <br />
          <div className="flex gap-[10px]">
            <input
              type="text"
              className="outline-none p-3 rounded-[5px]  border-2 w-[50%]"
              placeholder="Grade"
            />
            <input
              type="text"
              className="outline-none p-3 rounded-[5px] border-2 w-[50%]"
              placeholder="Gender"
            />
          </div>
          <br />
          <input
            type="text"
            className="outline-none p-3 mb-4 rounded-[5px] border-2 w-full"
            placeholder="Email Address"
          />
          <hr className="my-4" />
          <label className="font-bold text-[14px] text-[#9F9F9F] my-4">
            Address Details
          </label>
          <input
            type="text"
            className="outline-none p-3 my-4 rounded-[5px] border-2 w-full"
            placeholder="Permanent House Address"
          />
          <hr className="my-4" />

          <div>
            <label className="font-bold text-[14px] text-[#9F9F9F] my-4">
              Ward Information
            </label>
            {wards.map((ward, index) => (
              <div key={index}>
                <div className="flex gap-[10px] mt-4">
                  <input
                    type="text"
                    name="name"
                    className="outline-none p-3 rounded-[5px] border-2 w-[50%]"
                    placeholder="Full Name"
                    value={ward.name}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <input
                    type="text"
                    name="phone"
                    className="outline-none p-3 rounded-[5px] border-2 w-[50%]"
                    placeholder="Phone Number"
                    value={ward.phone}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <input
                  type="text"
                  name="accessId"
                  className="outline-none p-3 my-4 rounded-[5px] border-2 w-full"
                  placeholder="Access ID"
                  value={ward.accessId}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
            ))}
            <button
              onClick={addWard}
              className="font-bold text-[12px] hover:bg-green-200 w-full rounded p-4 mt-2"
            >
              Add Another Ward +
            </button>
          </div>
        </form>

        <div className="my-5">
          <p className="font-bold pb-2">Need Plan ?</p>
          <p className="text-[14px] font-medium">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo.
          </p>
          <Button className="bg-transparent text-[#359C71] border border-[#359C71] mt-4 font-bold px-2">
            <Image
              src="/svgs/contact-support.svg"
              width={20}
              height={20}
              alt="View Plans"
              className="mr-2"
            />
            Contact Support
          </Button>
        </div>
      </div>

      <div className="flex-4 rounded-[5px]">
        <div>
          <form className="h-[55%] bg-[#FFFFFF] rounded-[5px] p-4 my-4">
            <hr className="my-4" />
            <label className="font-bold text-[#9F9F9F] my-4">Security</label>
            <input
              type="password"
              className="outline-none p-3 my-4 rounded-[5px] border-2 w-full"
              placeholder="Current Password"
            />
            <input
              type="password"
              className="outline-none p-3 mb-4 rounded-[5px] border-2 w-full"
              placeholder="New Password"
            />
            <input
              type="password"
              className="outline-none p-3 mb-4 rounded-[5px] border-2 w-full"
              placeholder="Confirm Password"
            />
          </form>
          <Link href="/">
            <Button className="bg-secondary w-full text-white text-[16px] py-7 my-3 ">
              Save Changes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ParentSettings;
