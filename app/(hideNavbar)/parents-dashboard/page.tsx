import Card from '@/components/ui/parent-dashoard/card/card'
import Chart from '@/components/ui/parent-dashoard/chart/chart'
import Overall from '@/components/ui/parent-dashoard/overall/overall'
import React from 'react'

const page = () => {
  return (
    <div className='mt-[100px]  md:mt-6'>
      <Card/>
      <Chart/>
      <Overall/>
    </div>
  )
}

export default page