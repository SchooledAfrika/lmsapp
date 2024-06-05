
import React from 'react'
import Image from 'next/image'
import { MdVerified } from 'react-icons/md'
import MultipleClassTable from './MultipleClassTable'
import Link from "next/link"

const AllTeachDeals = () => {
  return (
    <div className="  md:flex md:flex-row grid grid-cols-1 items-center  text-[15px] gap-3   md:gap-2 rounded-md">
      <div className="flex md:flex-5 overflow-x-auto    rounded-md   flex-col">
        <MultipleClassTable/>

      </div>
       <div className='flex md:mb-0 mb-6 py-3 px-3 rounded-md   bg-white flex-3'>
       <div className='w-full'>
        <h3 className='text-slate-600 font-bold'>Class Details</h3>
        <div className='flex justify-between  mt-4'>
            <p className='text-[13px]'>Subject</p>
            <div className='flex '>
                <Image src="/maths.png" alt="" width={100} height={100} className='w-[30px] mr-1  h-[30px]'/>
            <p className='font-semibold text-[14px]'>Mathematics</p>
           
            </div>
        </div>

        <div className='flex justify-between  mt-4'>
            <p className='text-[13px]'>Total Students</p>
            <div className='flex '>
                
            <p className='font-semibold text-[14px]'>14</p>
           
            </div>
        </div>

        <div className='flex justify-between  mt-4'>
            <p className='text-[13px]'>End of Session</p>
            <div className='flex '>
                
            <p className='font-semibold text-[14px]'>May 24, 2024</p>
           
            </div>
        </div>
         <p className='underline mx-auto my-4 font-semibold text-center text-[13px] text-lightGreen'>
             <Link href="/" className=''>View Class Schedule</Link>
         </p>

         <div className="flex font-subtext  flex-col">
    <div className="flex items-center mt-4 space-x-2">
    <input className="w-4 h-4 px-2 accent-lightGreen" type="checkbox" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Public class
      </label>
      
    </div>
     <p className="text-[12px] my-3">Your class is visible and open to all on the platform dolor sit amet, consectetuer adipiscing elLorem ipsum dolor until <span className='text-lightGreen text-[13px] font-semibold'>May 5, 2024</span> </p>
    </div>
       
       
          
          

       
           
          
          
           </div>
        
          
   </div>
      
      </div>
  )
}

export default AllTeachDeals