'use client'
import { feedbacks} from "@/constants/index"
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

interface Props {
  content: string;
  rating: string;
  name: string;
  index: number;
}

const FeedbackCard = ({content, rating, name, index  }:Props) => {
    return (
        <div className="w-full h-full font-subtext  rounded-lg bg-white p-7 flex flex-col justify-center gap-6 hover:-translate-y-2 transition-transform duration-300 group">
        <div className="flex justify-between text-lightGreen items-center">
        <FaQuoteLeft />
          
        </div>
        <div>
          <h2 className="text-[16px]  font-normal tracking-wide leading-[25.6px] group-hover:text-textGreen">
            {content}
          </h2>
          <p className="text-sm mt-3">{rating}</p>
          <div className="flex justify-between">
              <p className="text-[18px] leading-[24.55px] font-extrabold mt-3">{name}</p>
              
          </div>
          
        </div>
       
     </div>
     
        

          

           
         
      
     
     
    )
  }
  


const Testimonials = () => {
    
    return (
      <div className="max-w-full  mx-auto px-4 py-24">
        <div className="w-full  flex flex-col items-center">
       
          <h2 className="text-2xl font-header text-lightGreen font-bold"> <span className="hidden  md:inline-flex w-20 md:w-60 mb-2 py-[.5px]  lgl:w-72 h-[.5px] bg-lightGreen mr-6"></span>
            Testimonials  <span className="hidden md:inline-flex mb-2 w-20 py-[.5px] md:w-60 lgl:w-72 h-[.5px] bg-lightGreen ml-6"></span>
          </h2>
         
        </div>
        <div className="grid  grid-cols-1 md:grid-cols-3 items-center xl:grid-cols-3 gap-6 mt-10 lgl:px-10">

        {feedbacks.map((feedback, index) => (
        <FeedbackCard key={feedback.id} {...feedback} index={index} />
      ))}
       </div>
      </div>
       
     
     
  );
};

export default Testimonials