import Image from 'next/image'
import React from 'react'

const RecentlyAdded = () => {
  return (
    <div className='mt-12 w-[35%] hidden md:block absolute -bottom-60 overflow-hidden px-3 bg-white  text-[15px] py-6 rounded-md'>
        <h3 className='text-slate-600 font-bold'>Recently Added</h3>
        <div className='flex space-x-2 mt-3'>
            <Image src="/green-book.png" alt="" width={100} height={100} className='w-[30px] h-[30px]'/>
            <div className='flex flex-col'>
               <p className='font-bold'>How Europe Underdeveloped Africa</p>
               <p className='text-[13px] pt-2'>Walter Rodney</p>
               <p className='text-rose-500 text-[14px] pt-2'>Grade 12</p>
               <p className='font-bold pt-2 inline'>Government<Image src="/govt.png" alt="" width={100} height={100} className='w-[30px] h-[30px] inline-block'/>  </p>
            </div>

        </div>
        
          
    </div>
  )
}

export default RecentlyAdded