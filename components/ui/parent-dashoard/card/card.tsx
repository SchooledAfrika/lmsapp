'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AddWard from '../AddWard/AddWard';
import { useQuery} from '@tanstack/react-query';


// Define interfaces for type safety 
interface TotalClasses {
  classNo: number;
}

interface TotalTeachers {
  teachersNo: number;
}

interface TotalAssessments {
  totalExams: number;
}

const Card = () => {
 
  const [wardId, setWardId] = useState<string | null>(null);

  

  // Retrieve wardId from localStorage on component mount
  useEffect(() => {
    const storedWardId = localStorage.getItem('selectedWardId');
    setWardId(storedWardId);
  }, []);

  // Fetch total classes
  const { data: totalClassesData, isLoading: loadingClasses, isError: errorClasses } = useQuery<TotalClasses>({
    queryKey: ["totalClasses", wardId],
    queryFn: async () => {
      const response = await fetch(`/api/parent-info/parents-child-overview/total-classes?childId=${wardId}`);
      if (!response.ok) throw new Error('Failed to fetch total classes');
      return response.json();
    },
    enabled: !!wardId, // Ensure the query only runs if id is present
  });

  // Fetch total teachers
  const { data: totalTeachersData, isLoading: loadingTeachers, isError: errorTeachers } = useQuery<TotalTeachers>({
    queryKey: ["totalTeachers", wardId],
    queryFn: async () => {
      const response = await fetch(`/api/parent-info/parents-child-overview/total-teacher?childId=${wardId}`);
      if (!response.ok) throw new Error('Failed to fetch total teachers');
      return response.json();
    },
    enabled: !!wardId, // Ensure the query only runs if id is present
  });

  // Fetch total assessments
  const { data: totalAssessmentsData, isLoading: loadingAssessments, isError: errorAssessments } = useQuery<TotalAssessments>({
    queryKey: ["totalAssessments", wardId],
    queryFn: async () => {
      const response = await fetch(`/api/parent-info/parents-child-overview/total-exams?childId=${wardId}`);
      if (!response.ok) throw new Error('Failed to fetch total assessments');
      return response.json();
    },
    enabled: !!wardId, // Ensure the query only runs if id is present
  });

  // Loading states for individual queries
  if (loadingClasses || loadingTeachers || loadingAssessments) {
    return <div className='text-[14px]'>Fetching Ward Data...</div>; // Loading indicator while fetching data
  }

  // Error handling for each query
  if (errorClasses) {
    return <div>Error loading total classes data.</div>;
  }

  if (errorTeachers) {
    return <div>Error loading total teachers data.</div>;
  }

  if (errorAssessments) {
    return <div>Error loading total assessments data.</div>;
  }
  

  return (
    <div className="w-full bg-stone-100 ">
      {/* Card section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3  gap-3">
        {/* Total Classes Card */}
        <div className="flex text-sm p-3 justify-between space-x-2 py-6 bg-white rounded-md">
          <div className="flex flex-col justify-evenly">
            <h3 className="font-bold text-xl pb-3">{totalClassesData?.classNo ?? 0}</h3>
            <p className="font-semibold pb-2">Total Sessions</p>
          </div>
          <Image
            src="/book.png"
            alt="Total Sessions"
            width={100}
            height={100}
            className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
          />
        </div>

        {/* Total Teachers Card */}
        <div className="flex text-sm p-3 justify-between space-x-2 bg-white rounded-md">
          <div className="flex flex-col justify-evenly">
            <h3 className="font-bold text-xl pb-3">{totalTeachersData?.teachersNo ?? 0}</h3>
            <p className="font-semibold pb-2">Total Teachers</p>
          </div>
          <Image
            src="/teach.png"
            alt="Total Teachers"
            width={100}
            height={100}
            className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
          />
        </div>

        {/* Total Assessments Card */}
        <div className="flex  text-sm p-3 justify-between space-x-2 bg-white rounded-md">
          <div className="flex flex-col justify-evenly">
            <h3 className="font-bold text-xl pb-3">{totalAssessmentsData?.totalExams ?? 0}</h3>
            <p className="font-semibold pb-2">Total Assessments</p>
          </div>
          <Image
            src="/resources.png"
            alt="Total Assessments"
            width={50}
            height={50}
            className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
          />
        </div>

        
      </div>
    </div>
  );
};

export default Card;
