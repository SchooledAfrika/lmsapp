import React from "react";
import { IparentSub } from "./ParentInfo";

const ParentWardAccess: React.FC<IparentSub> = ({ register, errors }) => {
  return (
    <div className=" flex flex-col w-full md:w-[55%] gap-2">
      <label className="font-bold text-[16px]">Pre-existing Account</label>
      <div>
        <input
          {...register("wardId")}
          autoFocus
          type="text"
          name="wardId"
          placeholder="Enter Ward Access ID"
          className=" px-4 py-5 outline-none rounded-[8px] w-full bg-white"
        />
        {errors.wardId && (
          <small className=" text-red-600">{errors.wardId.message}</small>
        )}
      </div>

      <span className="text-[14px] font-medium">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.
      </span>
      <div className="mt-2 flex flex-col gap-2">
        <label className="font-bold text-[16px]">New Account</label>
        <div>
          <input
            {...register("wardEmail")}
            type="text"
            name="wardEmail"
            placeholder="Wards Email Address"
            className="p-4 outline-none rounded-[8px] w-full bg-white"
          />
          {errors.wardEmail && (
            <small className=" text-red-600">{errors.wardEmail.message}</small>
          )}
        </div>
        <div>
          <input
            {...register("password")}
            type="password"
            name="password"
            placeholder="Password"
            className=" p-4 outline-none rounded-[8px] w-full bg-white"
          />
          {errors.password && (
            <small className=" text-red-600">{errors.password.message}</small>
          )}
        </div>
        <div>
          <input
            {...register("confirmPassword")}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className=" p-4 outline-none rounded-[8px] w-full bg-white"
          />
          {errors.confirmPassword && (
            <small className=" text-red-600">
              {errors.confirmPassword.message}
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentWardAccess;
