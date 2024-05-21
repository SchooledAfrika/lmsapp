import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Container from "./Container";

const Offers = () => {
  return (
    <Container>
      <section className="grid font-subtext  grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center xl:grid-cols-4 gap-3  mt-10">
        <div>
          <h3 className="text-3xl sm:text-[24px] font-header font-bold">Our Offers</h3>
          <p className="mt-2 text-[16px]">
            Lorem ipsum dolor sit amet, consectetur
          </p>
        </div>
        <div className="bg-white  md:bg-stone-100 py-3 pl-4 rounded-xl">
          <Image
            alt=""
            src={"/offer1.png"}
            width={50}
            height={50}
            className="w-1/3"
          />
          <h3 className="text-[18px] mt-3 font-bold">Expert tutoring</h3>

          <p className="mb-3 mt-1 text-[16px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
            interdum sapien, id aliquam ligula. 
          </p>
          
        </div>
        <div className="bg-white md:bg-stone-100 py-3 pl-3 rounded-xl">
          <Image
            alt=""
            src={"/offer2.png"}
            width={50}
            height={50}
            className="w-1/6"
          />
          <h3 className="text-[18px] mt-3 font-bold">
            Virtual Quiz & Test
          </h3>

          <p className="mb-3 mt-1 text-[16px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
            interdum sapien, id aliquam ligula.
          </p>
          
        </div>
        <div className="bg-white md:bg-stone-100 py-3 pl-6 rounded-xl">
          <Image
            src={"/offer3.png"}
            width={50}
            height={50}
            alt=""
            className="w-1/3"
          />
          <h3 className="text-[18px] mt-3  font-bold">
            Parental Accessibility
          </h3>

          <p className="mb-3 mt-1 text-[16px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
            interdum sapien, id aliquam ligula. 
          </p>
          
        </div>
       
      </section>
    </Container>
  );
};

export default Offers;
