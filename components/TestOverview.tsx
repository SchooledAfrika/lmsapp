"use client";
import React, { useState } from "react";
import ViewTestDetails from "./ViewTestDetails";
import ViewAllQuestions from "./ViewAllQuestions";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { modefiedExamType } from "./TeacherTestAndResources";
import { toast, ToastContainer } from "react-toastify";

const TestOverview = () => {
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
      const response = await fetch(`/api/exam-by-teachers/${id}`);
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
      <div>
        <p>loading</p>
      </div>
    );
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {displayComponent ? (
        <ViewTestDetails
          deleting={deleting}
          deleteTest={deleteTest}
          data={data}
          onClickChange={handleDisplayComponent}
        />
      ) : (
        <ViewAllQuestions />
      )}
      <ToastContainer />
    </div>
  );
};

export default TestOverview;
