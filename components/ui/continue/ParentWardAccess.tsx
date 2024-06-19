import React from "react";

const ParentWardAccess = () => {
  return (
    <div className=" flex flex-col w-[55%]">
      <label className="font-bold text-[16px]">Pre-existing Account</label>
      <input
        autoFocus
        type="text"
        name="text"
        placeholder="Enter Ward Access ID"
        className="my-2 px-4 py-5 outline-none rounded-[8px] w-full bg-white"
      />
      <span className="text-[14px] font-medium">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </span>

      <br />

      <div className="mt-2">
        <label className="font-bold text-[16px]">New Account</label>
        <input
          type="text"
          name="text"
          placeholder="Wards Email Address"
          className="mt-4 mb-2 p-4 outline-none rounded-[8px] w-full bg-white"
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="my-2 p-4 outline-none rounded-[8px] w-full bg-white"
        />
        <br />
        <input
          type="Cpassword"
          name="password"
          placeholder="Confirm Password"
          className="my-2 p-4 outline-none rounded-[8px] w-full bg-white"
        />
      </div>
    </div>
  );
};

export default ParentWardAccess;
