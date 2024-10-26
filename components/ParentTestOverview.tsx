"use client";
import React, { useState } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { modefiedExamType } from "./TeacherTestAndResources";
import { toast, ToastContainer } from "react-toastify";
import { Skeleton } from "@mui/material";
import ParentViewTestDetails from "./ParentViewTestDetails";
import ParentViewQuestions from "./ParentViewQuestions";

const ParentTestOverview = () => {
  const { id } = useParams();
  const [displayComponent, setDisplayComponent] = useState(true);
  const [deleting, setDeleting] = useState<boolean>(false);
  const queryclient = useQueryClient();
  const router = useRouter();
  const handleDisplayComponent = () => {
    setDisplayComponent(false);
  };
  const { data, isFetching, error, isError } = useQuery({
    queryKey: ["getingoneexam"],
    queryFn: async () => {
      const response = await fetch(`/api/wards-all-assessment/${id}`);
      const result = await response.json();
      return result;
    },
  });
  // mutation to delete exam from the database
  const mutation = useMutation({
    mutationKey: ["delete-exam"],
    mutationFn: async () => {
      const response = await fetch("/api/exam-by-teachers", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      return response;
    },
    onSuccess: async (response) => {
      const result = await response.json();
      if (response.ok) {
        queryclient.invalidateQueries({ queryKey: [""] });
        toast.success(result.message);
        setTimeout(() => {
          router.push("/teacher-dashboard/test-and-resources");
        }, 4500);
      } else {
        toast.error(result.message);
      }
    },
  });

  const deleteTest = () => {
    setDeleting(true);
    mutation.mutate();
  };

  // return loading component if is fetching
  if (isFetching) {
    return (
      <div className=" w-full">
        <p className=" text-black font-bold">Details</p>
        <div className=" w-full md:w-2/5">
          <Skeleton
            height={500}
            variant="rectangular"
            animation="wave"
            className=" w-full"
          />
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {displayComponent ? (
        <ParentViewTestDetails
          deleting={deleting}
          deleteTest={deleteTest}
          data={data}
          onClickChange={handleDisplayComponent}
        />
      ) : (
        <ParentViewQuestions
          data={data}
          deleting={deleting}
          deleteTest={deleteTest}
          onClickChange={handleDisplayComponent}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default ParentTestOverview;
