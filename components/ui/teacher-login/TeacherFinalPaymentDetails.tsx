import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ITeacherSub } from "./TeacherInfo";

const TeacherFinalPaymentDetails: React.FC<ITeacherSub> = ({
  register,
  errors,
  watch,
  control,
  clearErrors,
}) => {
  return (
    <div className="flex flex-col w-[55%] gap-2">
      <label className="font-bold text-[16px]">Payment Details</label>
      <input
        {...register("bankName")}
        type="text"
        name="bankName"
        placeholder="Bank Name"
        className=" p-4 outline-none rounded-[8px] w-full bg-white"
        onChange={() => clearErrors("bankName")}
      />
      {errors.bankName && (
        <small className=" text-red-500">{errors.bankName.message}</small>
      )}
      <input
        {...register("accountNo")}
        type="text"
        name="accountNo"
        placeholder="Account Number"
        className=" p-4 outline-none rounded-[8px] w-full bg-white"
        onChange={() => clearErrors("accountNo")}
      />
      {errors.accountNo && (
        <small className=" text-red-500">{errors.accountNo.message}</small>
      )}
      <input
        {...register("accountName")}
        type="text"
        name="accountName"
        placeholder="Account Name"
        className=" p-4 outline-none rounded-[8px] w-full bg-white"
        onChange={() => clearErrors("accountName")}
      />
      {errors.accountName && (
        <small className=" text-red-500">{errors.accountName.message}</small>
      )}
      <div className="flex items-center space-x-2">
        <Checkbox className="" id="terms" name="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept School Afrika{" "}
          <span className=" text-green-600">terms and condition</span>
        </label>
      </div>
    </div>
  );
};

export default TeacherFinalPaymentDetails;
