import React from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@mui/material";
import { useConversion } from "@/data-access/conversion";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { MdOutlineRemoveRedEye } from "react-icons/md";
interface IOneResources {
  id: String;
  subject: String;
  title: String;
  sourceLink: String;
  type: String;
  grade: String;
  teacherId: String;
  createdAt: String;
}

interface IResource {
  id: string | undefined;
}
const TestResources: React.FC<IResource> = ({ id }) => {
  const { handleDate, handleTime } = useConversion();
  const router = useRouter();
  const mutation = useMutation({
    mutationKey: ["deleteresource"],
    mutationFn: async () => {
      const response = await fetch("/api/manage-resources", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      return response;
    },
    onSuccess: () => {
      router.push("/teacher-dashboard/test-and-resources");
    },
  });
  const { data, isLoading, isError, error } = useQuery<IOneResources>({
    queryKey: ["oneexam", id],
    queryFn: async () => {
      const response = await fetch(`/api/manage-resources/${id}`);
      const result = await response.json();
      return result;
    },
    enabled: Boolean(id),
  });

  // here, we delete the resources
  const handleDelete = () => {
    mutation.mutate();
  };
  const handleViewLink = (link: string) => {
    return (window.location.href = link);
  };

  if (isLoading) {
    return (
      <div className=" w-full h-full p-2">
        <Skeleton
          variant="rectangular"
          animation={"wave"}
          className=" w-full"
          height={350}
        />
      </div>
    );
  }
  if (isError) {
    return <div>something went wrong!!!</div>;
  }
  console.log(data);
  return (
    <section>
      <div className="flex items-center px-4 pt-3 pb-2 gap-3 ">
        <Image
          src={`/${data?.type?.toLowerCase()}.png`}
          width={30}
          height={30}
          alt="Calculator"
        />
        <span className="font-bold text-[14px]">{data?.title}</span>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Grade</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Upload Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{data?.grade}</TableCell>
              <TableCell>{data?.subject}</TableCell>
              <TableCell>{handleDate(data?.createdAt as string)}</TableCell>
              <TableCell>{handleTime(data?.createdAt as string)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className=" flex items-center">
          <div
            onClick={handleDelete}
            className=" bg-red-600 text-[12px] cursor-pointer px-4 py-2 rounded-md text-white"
          >
            Delete
          </div>
          <div
            onClick={() => handleViewLink(data?.sourceLink as string)}
            className="bg-secondary cursor-pointer px-3 rounded-md ml-4 flex w-fit gap-1 items-center text-white text-[12px] py-2  my-3 mr-0 md:mr-6"
          >
            <p>View</p> <MdOutlineRemoveRedEye />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestResources;
