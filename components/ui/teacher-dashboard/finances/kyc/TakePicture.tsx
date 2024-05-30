"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image";
import Container from "@/components/Container";
import Link from "next/link";
import { KycSuccess } from "./KycSuccess";


const TakePicture: React.FC = () => {
 



  return (
    <section className="py-[1rem] font-header md:pt-[3rem]">
      <Container>
      <div className="flex my-6 justify-between ml-[0] md:ml-[40px]">
            <p className="font-bold text-lg">Details</p>
            <Link href="/teacher-dashboard/finance/" className="cursor-pointer"> 
            <Image src="/closeAlt.svg" alt="cancel" width={100} height={100} className="w-[20px] h-[20px]"  />
            </Link>
           
           
        </div>
        
       
        <div className="flex flex-col md:flex-row ml-[0] md:ml-[40px] mb-[50px]">
          <div>
            <div className="flex gap-10">
              <span className="bg-dimWhite text-[13px] text-center rounded-[50%] px-[8px] text-white">
                1
              </span>
              <p className="">Document Upload</p>
            </div>
            <p className="border-dimWhite border-l-2 h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="rounded-[50%] text-[13px] bg-[#359C71] px-[8px] text-white">
                2
              </span>
              <p className="text-[#359C71] font-bold">Take Photo</p>
            </div>
          </div>

          <form  className="pl-[0] md:pl-[100px] relative mt-[40px] md:mt-[0]">
          <label className="font-bold text-[16px]">Complete Your KYC verification</label>
            <p className="md:w-[450px] text-[13.5px] py-2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
            
            <br />

            <div className=" w-full rounded-md  font-header  bg-transparent flex items-center text-black justify-between px-2 ">
            <div className=" w-[150px] bg-dimWhite cursor-pointer mr-3 text-[13px] aspect-square rounded-full flex items-center  justify-center">
           <div className="w-[100px] h-[100px] bg-dimWhite rounded-full pt-6 text-center">Image</div>
      </div>
      <input
      type="file"
        placeholder="Upload Document"
        className=" w-full text-[14px] text-black bg-transparent focus:outline-none"
      />
     
    </div>
            
            <br />
            <KycSuccess/>
           
            {/* <Link href="/">
              <Button >
                Proceed
              </Button>
            </Link> */}
          </form>
        </div>
      
      </Container>
    </section>
  );
};
export default TakePicture;
