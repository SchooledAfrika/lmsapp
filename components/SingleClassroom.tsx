"use client";
import { Skeleton } from "@mui/material";

// the loading indicators for the single classroom
export const SingleClassSkeleton = () => {
  return (
    <div className=" w-full flex flex-col gap-4">
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <Skeleton
          className=" w-full rounded-md"
          height={220}
          variant="rectangular"
          animation="wave"
        />
        <Skeleton
          className=" w-full rounded-md"
          height={220}
          variant="rectangular"
          animation="wave"
        />
        <Skeleton
          className=" w-full rounded-md"
          height={220}
          variant="rectangular"
          animation="wave"
        />
      </div>
      <div>
        <Skeleton
          className=" w-full rounded-md"
          height={300}
          variant="rectangular"
          animation="wave"
        />
      </div>
    </div>
  );
};
