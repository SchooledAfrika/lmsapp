"use client";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import JobDescription from "./JobDescription";
import JobResponsibility from "./ui/JobResponsibility";
import JobQualification from "./JobQualification";
import JobFinalization from "./JobFinalization";
import Image from "next/image";
import Link from "next/link";
import ProgressLine from "./ui/PrograssLine";
import { Button } from "./ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { JobListingInfo, jobListingSchema } from "@/constants/jobListing";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "./Container";
import { useSearchParams } from "next/navigation";
export type IjobListing = z.infer<typeof jobListingSchema>;

interface IUpdateListing {
  id: string;
  level: string;
  location: string;
  role: "FULLTIME" | "PARTTIME";
  description: string;
  responsibility: string[];
  qualifications: string[];
  minSalary: string;
  maxSalary: string;
  jobTitle: string;
  state: string;
  note: string;
}
const JobNewList = () => {
  const router = useRouter();
  const [loading, setloading] = useState<boolean>(false);
  const [currentPage, setcurrentPage] = useState<number>(1);
  const search = useSearchParams();

  const {
    register,
    handleSubmit,
    trigger,
    control,
    watch,
    clearErrors,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<IjobListing>({
    resolver: zodResolver(jobListingSchema),
  });
  // here, we will fetch all information for a particular job
  // this is when the user actually wants to update a particular job
  // else, the person just want to create a new job.
  const { data } = useQuery<IUpdateListing>({
    queryKey: ["update-job-listing", search.get("id")],
    queryFn: async () => {
      const response = await fetch(`/api/one-vacancy/${search.get("id")}`);
      const result = await response.json();
      return result;
    },
    enabled: Boolean(search.get("id")),
  });

  useEffect(() => {
    if (data) {
      setValue("qualifications", data.qualifications);
      setValue("responsibility", data.responsibility);
      setValue("description", data.description);
      setValue("jobTitle", data.jobTitle);
      setValue("level", data.level);
      setValue("role", data.role);
      setValue("minSalary", data.minSalary);
      setValue("maxSalary", data.maxSalary);
      setValue("state", data.state);
      setValue("note", data.note);
      setValue("location", data.location);
    }
  }, [data]);

  //   instance of client
  const queryClient = useQueryClient();
  //   creating a post using mutation to the backend
  const mutation = useMutation({
    mutationKey: ["postjob"],
    mutationFn: async (data: IjobListing) => {
      const result = await fetch("/api/advertise", {
        method: search.get("id") ? "PUT" : "POST",
        body: JSON.stringify({
          ...data,
          vacancyId: search.get("id"),
        }),
      });
      return result;
    },
    onSuccess: async (result) => {
      queryClient.invalidateQueries({ queryKey: ["addjob"] });
      if (result.ok) {
        const body = await result.json();
        setloading(false);
        reset();
        toast.success(body.message);
        setTimeout(() => {
          return router.push("/admin-dashboard/job-listing");
        }, 4000);
      } else {
        setloading(false);
        return toast.error(
          search.get("id") ? "error updating job" : "error posting job"
        );
      }
    },
  });

  const runSubmit: SubmitHandler<IjobListing> = async (data) => {
    setloading(true);
    const responsibility = data.responsibility.filter((item) => item !== "");
    data.responsibility = responsibility;
    mutation.mutate(data);
    // handle file submission to the backend server
  };

  type fieldName = keyof IjobListing;
  // function to validate form on each proceed clicked
  const handleNextPage = async () => {
    const fields = JobListingInfo[currentPage - 1].field as fieldName[];
    const isValid = await trigger(fields, { shouldFocus: true });
    if (!isValid) return;
    if (currentPage === 4) {
      console.log("entered");
      await handleSubmit(runSubmit)();
    } else {
      setcurrentPage((prev) => prev + 1);
    }
  };

  // function to display submiting
  const submittingState = (): string => {
    if (search.get("id")) {
      if (loading === false) {
        return "Update";
      }
      return "Updating...";
    }
    if (loading === false) {
      return "Post";
    }
    return "Posting...";
  };

  return (
    <div className="mx-auto">
      <Container>
        <div className="flex md:mt-6 mb-12 mt-24 justify-between ml-[0] md:ml-[40px]">
          <p className="font-bold text-lg"></p>
          <Link href="/admin-dashboard/job-listing" className="cursor-pointer">
            <Image
              src="/closeAlt.svg"
              alt="cancel"
              width={100}
              height={100}
              className="w-[20px] h-[20px]"
            />
          </Link>
        </div>

        {/* the div holding both the form progress and the form */}
        {/* the form contains each form based on the state number above */}
        <div className=" flex flex-col md:flex-row gap-3 md:gap-14">
          <ProgressLine
            formArrays={JobListingInfo}
            currentPage={currentPage}
            setcurrentPage={setcurrentPage}
          />
          <form className=" flex-1">
            {/* conditionaly rendering each form */}
            {currentPage === 1 ? (
              <JobDescription
                register={register}
                errors={errors}
                control={control}
                watch={watch}
                clearErrors={clearErrors}
                setValue={setValue}
                getValues={getValues}
              />
            ) : currentPage === 2 ? (
              <JobResponsibility
                register={register}
                errors={errors}
                control={control}
                watch={watch}
                clearErrors={clearErrors}
                setValue={setValue}
                getValues={getValues}
              />
            ) : currentPage === 3 ? (
              <JobQualification
                register={register}
                errors={errors}
                control={control}
                watch={watch}
                clearErrors={clearErrors}
                setValue={setValue}
                getValues={getValues}
              />
            ) : (
              <JobFinalization
                register={register}
                errors={errors}
                control={control}
                watch={watch}
                clearErrors={clearErrors}
                setValue={setValue}
                getValues={getValues}
              />
            )}
            <Button
              onClick={handleNextPage}
              type="button"
              disabled={loading}
              className="bg-secondary w-full md:w-2/3  text-white text-[16px] px-6 py-7 my-3"
            >
              {currentPage < 4 ? "Proceed" : submittingState()}
            </Button>
          </form>
        </div>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default JobNewList;
