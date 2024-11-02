"use client";
import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IDeleteCourse {
  courseId: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Ward {
  id: string;
  name: string;
}

const GiftCourse: React.FC<IDeleteCourse> = ({
  courseId,
  isOpen,
  setIsOpen,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedWardId, setSelectedWardId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  // Handle option selection
  const handleSelect = (wardId: string) => {
    setSelectedWardId(wardId);
  };

  // Fetch wards data
  const {
    data,
    isLoading: isDataLoading,
    isError,
    error,
  } = useQuery<Ward[]>({
    queryKey: ["getWard"],
    queryFn: async () => {
      const response = await fetch("/api/more-wards");
      if (!response.ok) throw new Error("Error fetching wards");
      const result = await response.json();
      return result;
    },
  });

  // Mutation for gifting course
  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!selectedWardId) throw new Error("Please select a ward.");
      const result = await fetch(`/api/purchased-course/gift-course-to-ward`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          wardId: selectedWardId,
        }),
      });
      if (!result.ok) throw new Error("Error gifting course");
      return result;
    },
    onSuccess: () => {
      setIsOpen(false);
      toast.success("Course Successfully Gifted to Ward");
      setLoading(false);
    },
    onError: (error) => {
      console.error("Error gifting course:", error);
      toast.error(error instanceof Error ? error.message : "An error occurred");
      setLoading(false);
    },
  });

  const handleGiftCourse = () => {
    if (!selectedWardId) {
      toast.error("Please select a ward before gifting.");
      return;
    }
    setLoading(true);
    mutate();
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className="sm:w-[600px] w-[380px] font-subtext">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">
              Gift Course to Ward
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 font-header py-4">
            <div className="flex flex-col">
              <Select onValueChange={handleSelect}>
                <SelectTrigger className="md:w-[550px] w-full py-6">
                  <SelectValue placeholder="Select Ward" />
                </SelectTrigger>
                <SelectContent className="font-header font-medium">
                  <SelectGroup>
                    {isDataLoading && (
                      <SelectItem value="" disabled>
                        Loading wards...
                      </SelectItem>
                    )}
                    {isError && (
                      <SelectItem value="" disabled>
                        {error.message}
                      </SelectItem>
                    )}
                    {Array.isArray(data) &&
                      data.map((item: Ward) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={handleGiftCourse}
              disabled={loading || isDataLoading} // Disable if loading or data is loading
              className="w-full py-8 text-lg bg-lightGreen hover:bg-green-700"
            >
              {loading ? "Gifting Course..." : "Gift Course"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GiftCourse;
