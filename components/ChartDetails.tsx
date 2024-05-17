import React from 'react'

const ChartDetails = () => {
  return (
    <div className='px-4'>
        <div className='flex justify-between my-2'>
            <div>
                <h3 className='text-lightGreen font-bold'>70% - 100%</h3>
                <p className='text-[12px]'><span className='text-lightGreen text-[13px] font-semibold'>15%</span> more than last month's average</p>
            </div>
            <div className=''>
                <h3 className='font-semibold'>5 Students</h3>
                <p className='text-[12px]'>Monthly average</p>
            </div>
        </div>

        <div className='flex justify-between my-2'>
            <div>
                <h3 className='text-rose-400 font-bold'>50% - 69%</h3>
                <p className='text-[12px]'><span className='text-lightGreen text-[13px] font-semibold'>15%</span> more than last month's average</p>
            </div>
            <div className=''>
                <h3 className='font-semibold'>7 Students</h3>
                <p className='text-[12px]'>Monthly average</p>
            </div>
        </div>

        <div className='flex justify-between my-2'>
            <div>
                <h3 className='text-dimYellow font-bold'>40% - 49%</h3>
                <p className='text-[12px]'><span className='text-lightGreen text-[13px] font-semibold'>15%</span> more than last month's average</p>
            </div>
            <div className=''>
                <h3 className='font-semibold'>8 Students</h3>
                <p className='text-[12px]'>Monthly average</p>
            </div>
        </div>

        <div className='flex justify-between my-2'>
            <div>
                <h3 className='text-red-600 font-bold'>0% - 39%</h3>
                <p className='text-[12px]'><span className='text-lightGreen text-[13px] font-semibold'>15%</span> more than last month's average</p>
            </div>
            <div className=''>
                <h3 className='font-semibold'>4 Students</h3>
                <p className='text-[12px]'>Monthly average</p>
            </div>
        </div>
       
    </div>
  )
}

export default ChartDetails