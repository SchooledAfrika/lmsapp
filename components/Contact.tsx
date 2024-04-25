import React from 'react'
import Image from 'next/image'

const Contact = () => {
  return (
    <div className="font-subtext overflow-hidden bg-stone-100">
     
      <div className="z-40 bg-black md:h-[80%] h-full">
        <div className="relative z-40 h-full  text-white">
          <Image
            className="w-full h-full  z-0 opacity-40   object-cover"
            src={"/contact-bg.jpg"}
            alt="background"
            width={200}
            height={200}
          />
          <div className="flex flex-col z-10 opacity-100 absolute md:top-[100px] top-8 md:left-[40px] left-4 justify-between">
            <p className="font-bold w-[144px]  font-header h-[28px] text-dimYellow">
              Join us today
            </p>
            <h3 className="md:text-[40px] md:leading-[42px] text-xl w-[300px] md:w-[668px] font-bold font-subtext">
              Lorem ipsum dolor sit amet, consectutuer adipsig elit.
            </h3>
            <p className="w-[300px] md:w-[668px] font-subtext md:font-[300px] mt-3 leading-[20px] md:leading-[32px]">
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
              interdum sapien, id aliquam ligula. Maecenas eget neque id ligula
              egestas blandit. Suspendisse potenti. 
            </p>

            
          </div>
        </div>
      </div>
    
    </div>
  )
}

export default Contact