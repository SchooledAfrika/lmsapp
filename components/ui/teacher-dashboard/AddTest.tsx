"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpenCheck } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Iadd {
  classId: string;
}

const AddTest: React.FC<Iadd> = ({ classId }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedExamId, setselectedExamId] = useState<string>();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["addTest"],
    queryFn: async () => {
      const response = await fetch("/api/exam-by-teachers");
      const result = await response.json();
      return result;
    },
  });

  // Query client instance
  const queryClient = useQueryClient();

  // Mutation to handle the addition of test/exam
  const mutation = useMutation({
    mutationFn: async () => {
      console.log(classId, selectedExamId);
      const result = await fetch(`/api/class/exams`, {
        method: "POST",
        body: JSON.stringify({
          classId: classId,
          examId: selectedExamId,
        }),
      });
      return result;
    },

    onSuccess: async (result) => {
      queryClient.invalidateQueries({ queryKey: ["addTest"] });
      setLoading(false);
      if (result.ok) {
        toast.success("Test successfully added");
      } else {
        toast.error("Error adding test");
      }
    },
    onError: (error) => {
      console.error("Error adding test:", error);
      setLoading(false);
      toast.error("Error adding test");
    },
  });

  // handle submit or triger mutation function to run
  const handleSubmit = () => {
    if (!selectedExamId) {
      return toast.error("please select an exam");
    }
    setLoading(true);
    mutation.mutate();
  };

  // loading message here
  if (isLoading) {
    return <p>loading...</p>;
  }

  // return a div telling the teacher to create an exam if there is no exam
  if (data.length == 0) {
    return (
      <div>
        <p>No exam here, set exam please</p>
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="inline text-[13px] font-semibold">
          <BookOpenCheck className="inline ml-0 w-4 h-4 mr-2 text-lightGreen" />
          Add Test
        </p>
      </DialogTrigger>

      <DialogContent className="sm:w-[600px] w-[380px] font-subtext">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            Add Test(Exam)
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 font-header py-4">
          <div className="grid items-center font-header gap-4">
            <p className="font-bold text-[20px]">
              Are you sure you want to add test or exam?
            </p>

            <div className="flex flex-col">
              <Select onValueChange={(value) => setselectedExamId(value)}>
                <SelectTrigger className="w-full py-6">
                  <SelectValue placeholder="Select Test(Exam)" />
                </SelectTrigger>
                <SelectContent className="font-header font-medium">
                  <SelectGroup>
                    {Array.isArray(data) &&
                      data.map((item: any) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.title}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            type="submit"
            className="w-full py-8 text-lg bg-lightGreen hover:bg-green-700"
          >
            {loading ? "Adding Test(Exam)..." : "Add Test(Exam)"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTest;
