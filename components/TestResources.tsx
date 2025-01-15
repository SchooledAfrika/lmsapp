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

interface IResource {
  id: string | undefined;
}
const TestResources: React.FC<IResource> = ({ id }) => {
  const { handleDate, handleTime } = useConversion();
  const mutation = useMutation({
    mutationKey: ["deleteresource", id],
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

  const router = useRouter();
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["oneexam", id],
    queryFn: async () => {
      const response = await fetch(`/api/manage-resources/${id}`);
      const result = await response.json();
      return result;
    },
    enabled: Boolean(id),
  });
  

  if (isFetching) {
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

  // here, we delete the resources
  const handleDelete = () => {
    mutation.mutate();
  };

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
              <TableCell>{handleDate(data?.createdAt)}</TableCell>
              <TableCell>{handleTime(data?.createdAt)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className=" flex items-center">
          <button
            onClick={handleDelete}
            className=" bg-red-600 px-4 py-2 rounded-md text-white"
          >
            Delete
          </button>
          {data?.type == "LINK" && (
            <Link
              href="https://www.denhubb.com"
              className="ml-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-secondary text-white text-[12px] py-5 my-3 mr-0 md:mr-6">
                Visit Link
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestResources;
