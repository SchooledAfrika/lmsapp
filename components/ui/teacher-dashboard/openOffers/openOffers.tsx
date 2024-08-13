"use client";
import { offers } from "@/constants/offers";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ViewOffer from "./viewOffer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Props {
  icon: string;
  title: string;
  institution: string;
  grade: string;
  type: string;
  location: string;
  index: number;
}

const OfferCard = ({
  icon,
  title,
  institution,
  grade,
  type,
  location,
}: Props) => {
  return (
    <div className=" w-full  font-header rounded-lg bg-white p-4 flex flex-col justify-evenly gap-3 hover:-translate-y-2 transition-transform duration-300 group">
      <div className="flex justify-center items-center">
        <Image src={`${icon}`} alt="icon" width={50} height={50} />
      </div>
      <div>
        <h2 className="text-[15px] font-titleFont font-bold tracking-wide group-hover:text-textGreen">
          {institution}
        </h2>
        <p className="text-sm font-semibold mt-3">{title}</p>
        <div className="flex text-[13px] font-medium justify-between">
          <p className=" mt-3">{grade}</p>
          <p className=" mt-3 text-end">{type}</p>
        </div>
        <p className="text-[13px] font-medium mt-3">{location}</p>
      </div>
      <ViewOffer />
    </div>
  );
};

const OpenOffers = () => {
  // making use of react query to get all the offers
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["get-offers-for-teacher"],
    queryFn: async () => {
      const response = await fetch("/api/teachers-offer");
      const result = await response.json();
      return result;
    },
  });
  if (isFetching) {
    return <div>loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  console.log(data);
  return (
    <section>
      <div className="max-w-full  py-6">
        <div className="grid  grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 items-center lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10 lgl:px-10">
          {offers.map((offer, index) => (
            <OfferCard key={offer.id} {...offer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenOffers;
