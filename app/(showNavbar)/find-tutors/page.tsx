import React from 'react'
import FindTutors from '@/components/FindTutors'
import Search from '@/components/Search'
import PageNav from '@/components/PageNav'


const page = () => {
  return (
    <div>
        
        <h2 className="font-bold my-20 text-2xl text-center">Tutors Listing</h2>
        <Search/>
        <FindTutors />
        <FindTutors />
        <FindTutors />
        <FindTutors />
        <FindTutors />
        <PageNav/>
    </div>
  )
}

export default page