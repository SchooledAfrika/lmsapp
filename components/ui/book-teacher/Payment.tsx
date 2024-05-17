import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import Image from "next/image";
import { MdVerified } from "react-icons/md";

interface PaymentProps {
  onClickPaymentInfo: () => void;
}

const Payment: React.FC<PaymentProps> = ({ onClickPaymentInfo }) => {
  return (
    <ScrollArea className="h-[500px] w-full ">
      <div className="">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">Book Session</h3>
          <h3 className="text-base font-medium">Back</h3>
        </div>

        <div className="flex  mx-auto mt-6 mb-8 max-w-[360px] flex-col gap-3">
          <p className="text-lightGreen text-center text-[15px] ml-8 font-semibold">
            Payment
          </p>
          <p className="text-[14px] text-center ml-8 font-semibold">
            Select a payment method.
          </p>
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
         
            <div className="space-y-4 md:mb-0 mb-8">
               {/* first child */}
            <div className="border md:ml-6 px-4 bg-white justify-between md:pl-4 md:pr-6 flex py-3  rounded-md ">
            <div className="flex space-x-6">
              <Image src="/paystack.png" alt="paystack" width={100} height={100} className="w-[35px] h-[35px]"/>
              <div className="flex space-y-1 flex-col">
                <p className="text-[13px] font-semibold">Paystack</p>
                <p className="text-[11px]">Effortless Payments with Paystack: Simplify Your Online Transactions</p>
              </div>
            </div>

            <input className="w-4 ml-4 accent-lightGreen" type="checkbox" />
          </div>
          {/* second child */}
          <div className="border px-4  md:ml-6 bg-white  justify-between md:pl-4 md:pr-6 flex py-3  rounded-md ">
            <div className="flex space-x-6">
              <Image src="/flutterwave.png" alt="flutterwave" width={100} height={100} className="w-[40px] h-[40px]"/>
              <div className="flex space-y-1 flex-col">
                <p className="text-[13px] font-semibold">Flutterwave</p>
                <p className="text-[11px]">Effortless Payments with Flutterwave: Simplify Your Online Transactions</p>
              </div>
            </div>

            <input className="w-4 ml-4 accent-lightGreen" type="checkbox" />
          </div>
            {/* Third child */}
          <div className="border md:ml-6 px-4 bg-white justify-between md:pl-4 md:pr-6 flex py-3  rounded-md ">
            <div className="flex space-x-6">
              <Image src="/remitta.png" alt="remitta" width={100} height={100} className="w-[35px] h-[35px]"/>
              <div className="flex space-y-1 flex-col">
                <p className="text-[13px] font-semibold">Remita</p>
                <p className="text-[11px]">Effortless Payments with Remita: Simplify Your Online Transactions</p>
              </div>
            </div>

            <input className="w-4 ml-4 accent-lightGreen" type="checkbox" />
          </div>

               
            </div>
            <div className="bg-white rounded-md  mb-12 pt-3 pb-6 px-6">
              <h3 className="font-semibold pb-3 text-[14px]">Summary</h3> 
              <div className="flex text-[12.5px] justify-between">
                <div className="flex flex-col space-y-4">
                  <p>1 on 1 Session count: 1 Session(s)</p>
                  <p>Duration: 45 Minutes/per session</p>
                  <p>Subject: Mathematics</p>
                  <p>Tutor's Language: English</p>
                </div>
                <p className="text-lightGreen text-[13px] font-semibold">$10.00</p>
              </div>

            <div className="flex py-3 space-x-3 items-center">
              <Image src="/tutors.jpg" alt="" width={100} height={100} className="w-[40px] h-[40px] rounded-md"/>
              <h3 className="inline  font-bold text-[12px]">
            David Olushola <MdVerified className="inline text-lightGreen text-[15px]  md:mr-8" />{" "}
            </h3>
            <Link href="" className="text-[12px]  text-lightGreen font-semibold underline">View Class Schedule</Link>
            </div>
            <hr className="text-slate-600"/>
            <div className="flex justify-between mt-3 font-semibold">
              <p className="text-[17px] font-bold">Total</p>
              <p className="text-[15px] text-lightGreen">$10.00</p>
            </div>
            </div>
            
            
         </div>

        <Button
          type="submit"
          onClick={onClickPaymentInfo}
          className="px-4 py-3 mb-4 flex justify-end float-right bg-lightGreen hover:bg-green-700"
        >
          Confirm Payment
        </Button>
      </div>
    </ScrollArea>
  );
};

export default Payment;
