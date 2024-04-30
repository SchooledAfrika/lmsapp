import Hero from "@/components/Hero";
import Offer from "@/components/Offers";
import PopularSubjects from "@/components/PopularSubjects";
import Virtual from "@/components/Virtual";
import PrivateSession from "@/components/PrivateSession";
import HomeworkSupport from "@/components/HomeworkSupport";
import PopularClasses from "@/components/PopularClasses";
import GetStarted from "@/components/GetStarted";
import Testimonials from "@/components/Testimonials";
import ParentalControl from "@/components/ParentalControl";


export default function Home() {
  return (
    <div>
     
      <Hero />
      <Offer />
      <PopularSubjects />
      <Virtual />
      <PrivateSession />
      <HomeworkSupport />
      <ParentalControl />
       <div className="w-full  flex flex-col items-center">
          <h2 className="text-2xl font-header text-lightGreen font-bold">
            {" "}
            <span className="hidden  md:inline-flex w-20 md:w-60 mb-2 py-[.5px]  lgl:w-72 h-[.5px] bg-lightGreen mr-6"></span>
            Popular Classes{" "}
            <span className="hidden md:inline-flex mb-2 w-20 py-[.5px] md:w-60 lgl:w-72 h-[.5px] bg-lightGreen ml-6"></span>
          </h2>
        </div>
      <PopularClasses />
      <GetStarted />
      <Testimonials />
      
    </div>
  );
}
