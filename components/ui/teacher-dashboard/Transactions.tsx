import TransactionTable from '@/components/TransactionTable'
import React from 'react'
import Image from 'next/image'
import { MdVerified } from 'react-icons/md'

const Transactions = () => {
  return (
    <div className="  md:flex md:flex-row grid grid-cols-1 items-center  text-[15px] gap-3   md:gap-2 rounded-md">
      <div className="flex md:flex-5 overflow-x-auto    rounded-md   flex-col">
        <TransactionTable/>

      </div>
       <div className='flex md:mb-0 mb-6 py-6 px-3 rounded-md  bg-white flex-3'>
       <div className=''>
        <h3 className='text-slate-600 font-bold'>Recently Added</h3>
        <div className='flex space-x-2 mt-4'>
           <Image src="/green-book.png" alt="" width={100} height={100} className='w-[30px] h-[30px]'/>
           <div className='flex flex-col'>
               <p className='font-bold'>How Europe Underdeveloped Africa</p>
               <p className='text-[13px] pt-2'>Walter Rodney</p>
              <p className='text-rose-500 text-[14px] pt-2'>Grade 12</p>
               <p className='font-bold pt-2 inline'>Government<Image src="/govt.png" alt="" width={100} height={100} className='w-[30px] h-[30px] inline-block'/>  </p>
           </div>
          

        </div>
        <hr className="my-3"/>
        <div className="mt-2 flex items-center md:space-x-6 py-3 space-x-4">
           <div className="flex flex-col space-y-3 ">
            <p className='text-slate-500 font-semibold text-[13px]'>Tutor</p>
            <div className="flex space-x-2 items-center">
               <Image src="/tutors.jpg" alt="" width={100} height={100} className="w-[40px] h-[40px] rounded-md"/>
            <h3 className="inline  font-bold text-[12px]">
            David Olushola <MdVerified className="inline text-lightGreen text-[15px]  md:mr-8" />{" "}
            </h3>
            </div>
           
           </div>
           <div className="flex flex-col space-y-2">
            <p className='text-slate-500 text-[13px] font-semibold'>Time</p>
            <div className="flex space-x-2">
              <p className="text-[12px] font-semibold">2:30PM</p>
            </div>
           
           </div>
           <div className="flex flex-col space-y-2">
            <p className='text-slate-500 text-[13px] font-semibold'>Date</p>
            <div className="flex space-x-2">
              <p className="text-[12px] font-semibold">July 15, 2024</p>
            </div>
           
           </div>
           </div>
        
          
   </div>
       </div>
      </div>
  )
}

export default Transactions