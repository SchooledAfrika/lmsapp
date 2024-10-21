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
import { Layers3 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdAdd } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Iadd } from "./AddTest";
import { FaBedPulse } from "react-icons/fa6";

// the trigger button for adding resources in session
const TriggerForSession = () => {
  return (
    <div className=" flex items-center gap-1 cursor-pointer">
      <p className=" text-[14px] font-bold text-green-800">Add</p>
      <div className=" w-[25px] aspect-square bg-green-700 items-center justify-center flex rounded-full text-white">
        <IoMdAdd className=" text-[18px] font-bold" />
      </div>
    </div>
  );
};

// the trigger button for adding resources to class
const TriggerForClass = () => {
  return (
    <div className=" text-[13px] flex items-center  font-semibold">
      <Layers3 className="inline ml-0 w-4 h-4 mr-2 text-lightGreen" />
      <p>Add Resource</p>
    </div>
  );
};

const AddResource: React.FC<Iadd> = ({
  classId,
  setDialogOpen,
  isClass,
  dialogueOpen,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedResourceId, setselectedResourceId] = useState<string>();
  const router = useRouter();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["addResource"],
    queryFn: async () => {
      const response = await fetch("/api/manage-resources");
      const result = await response.json();
      return result;
    },
  });

  // Query client instance
  const queryClient = useQueryClient();

  // Mutation to handle the addition of resource
  const addClassResources = useMutation({
    mutationFn: async () => {
      console.log(classId, selectedResourceId);
      const result = await fetch(`/api/class/resources`, {
        method: "POST",
        body: JSON.stringify({
          classId: classId,
          resourceId: selectedResourceId,
        }),
      });
      return result;
    },

    onSuccess: async (result) => {
      queryClient.invalidateQueries({ queryKey: ["addResource"] });
      setLoading(false);
      if (result.ok) {
        setDialogOpen(false);
        toast.success("Resource successfully added");
      } else {
        toast.error("Error adding resource");
      }
    },
    onError: (error) => {
      console.error("Error adding resource:", error);
      setLoading(false);
      toast.error("Error adding resource");
    },
  });
  // Mutation to handle the addition of resource
  const addSessionResources = useMutation({
    mutationFn: async () => {
      console.log(classId, selectedResourceId);
      const result = await fetch(`/api/one-on-one-section/resources`, {
        method: "POST",
        body: JSON.stringify({
          sectionId: classId,
          resourceId: selectedResourceId,
        }),
      });
      return result;
    },

    onSuccess: async (result) => {
      queryClient.invalidateQueries({ queryKey: ["single-section-show"] });
      setLoading(false);
      if (result.ok) {
        setDialogOpen(false);
        toast.success("Resource successfully added");
      } else {
        toast.error("Error adding resource");
      }
    },
    onError: (error) => {
      console.error("Error adding resource:", error);
      setLoading(false);
      toast.error("Error adding resource");
    },
  });

  // handle submit or trigger mutation function to run
  const handleSubmit = () => {
    if (!selectedResourceId) {
      return toast.error("please select a resource");
    }
    setLoading(true);
    if (isClass) {
      addClassResources.mutate();
    } else {
      addSessionResources.mutate();
    }
  };

  const handlePush = () => {
    router.push("/teacher-dashboard/test-and-resources");
  };

  // loading message here
  if (isLoading) {
    return <p>loading...</p>;
  }

  // return a div telling the teacher to create a resource if there is no resource
  if (data.length == 0) {
    return (
      <div onClick={handlePush} className=" flex gap-1">
        <IoMdAdd className=" text-green-800  text-[20px]" />{" "}
        <p className=" text-black text-[13px] font-semibold">Add Resources</p>
      </div>
    );
  }

  return (
    <Dialog open={dialogueOpen} onOpenChange={() => setDialogOpen(false)}>
      <DialogTrigger asChild>
        {isClass ? <TriggerForClass /> : <TriggerForSession />}
      </DialogTrigger>

      <DialogContent className="sm:w-[600px] w-[380px] font-subtext">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">Add Resource</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 font-header py-4">
          <div className="grid items-center font-header gap-4">
            <p className="font-bold text-[20px]">
              Are you sure you want to add resource?
            </p>

            <div className="flex flex-col">
              <Select onValueChange={(value) => setselectedResourceId(value)}>
                <SelectTrigger className="w-full py-6">
                  <SelectValue placeholder="Select Resource" />
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
            {loading ? "Adding Resource..." : "Add Resource"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddResource;
