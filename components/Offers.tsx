import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Container from "./Container";

const Offers = () => {
  return (
    <Container>
      <section className="grid font-subtext  grid-cols-1 sm:px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center xl:grid-cols-4 gap-6 mt-10">
        <div>
          <h3 className="text-3xl sm:text-2xl font-semibold">Our Offers</h3>
          <p className="mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
            interdum sapien, id aliquam ligula. 
          </p>
        </div>
        <div>
          <Image
            alt=""
            src={"/tutor.png"}
            width={50}
            height={50}
            className="w-1/5"
          />
          <h3 className="text-2xl sm:text-xl mt-2 font-semibold">Expert tutoring</h3>

          <p className="my-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
            interdum sapien, id aliquam ligula. 
          </p>
          
        </div>
        <div>
          <Image
            alt=""
            src={"/quiz.png"}
            width={50}
            height={50}
            className="w-1/5"
          />
          <h3 className="text-2xl mt-2 sm:text-xl font-semibold">
            Virtual Quiz & Test
          </h3>

          <p className="my-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
            interdum sapien, id aliquam ligula.
          </p>
          
        </div>
        <div>
          <Image
            src={"/parent.png"}
            width={50}
            height={50}
            alt=""
            className="w-1/5"
          />
          <h3 className="text-2xl mt-2 sm:text-xl font-semibold">
            Parental Accessibility
          </h3>

          <p className="my-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
            interdum sapien, id aliquam ligula. 
          </p>
          
        </div>
        <div>
          <Image
            src={"/homework.png"}
            width={50}
            height={50}
            alt=""
            className="w-1/5"
          />
          <h3 className="text-2xl mt-2 sm:text-xl font-semibold">
            Homework Support
          </h3>

          <p className="my-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
            interdum sapien, id aliquam ligula. 
          </p>
         
        </div>
      </section>
    </Container>
  );
};

export default Offers;
