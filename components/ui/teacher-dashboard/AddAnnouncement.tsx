"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Iadd } from "./AddTest";
import { GrAnnounce } from "react-icons/gr";
import { Input } from "../input";

// the trigger button for adding resources to class
const TriggerForClass = () => {
  return (
    <div className="text-[13px] flex items-center font-semibold">
      <GrAnnounce className="inline ml-0 w-4 h-4 mr-2 text-lightGreen" />
      <p>Announcement</p>
    </div>
  );
};

const AddAnnouncement: React.FC<Iadd> = ({
  classId,
  setDialogOpen,
  isClass,
  dialogueOpen,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // Query client instance
  const queryClient = useQueryClient();

  // Mutation to handle the addition of announcement
  const mutation = useMutation({
    mutationFn: async () => {
      const result = await fetch(`/api/class/announcement`, {
        method: "POST",
        body: JSON.stringify({
          desc: content,
          title,
          classId,
        }),
      });
      return result;
    },

    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["addAnnouncement"] });
      setLoading(false);
      setDialogOpen(false);
      setTitle(""); // Reset title
      setContent(""); // Reset content
      toast.success("Announcement successfully added");
    },
    onError: (error) => {
      console.error("Error adding announcement:", error);
      setLoading(false);
      toast.error("Error adding announcement");
    },
  });

  // handle submit or trigger mutation function to run
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent event from propagating to parent elements
    if (!title || !content) {
      if (!toast.isActive("validation-toast")) {
        toast.error("Please provide both a title and content.", {
          toastId: "validation-toast",
        });
      }
      return;
    }

    setLoading(true);
    mutation.mutate();
  };

  return (
    <Dialog
      open={dialogueOpen}
      onOpenChange={(isOpen) => {
        // Prevent dialog from closing while loading
        if (!loading) {
          setDialogOpen(isOpen);
        }
      }}
    >
      <DialogTrigger asChild>{isClass && <TriggerForClass />}</DialogTrigger>

      <DialogContent className="sm:w-[600px] w-[380px] font-subtext">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            Add Announcement
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 font-header py-4">
          <div className="grid items-center font-header gap-2">
            <p className="text-[16px]">
              All students enrolled in this class will automatically receive
              this announcement.
            </p>
            <p className="font-bold text-[18px]">
              Are you sure you want to add an announcement?
            </p>

            <div className="flex flex-col">
              <Input
                id="name"
                type="text"
                name="title"
                placeholder="Enter the announcement title here"
                className="col-span-6 w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                aria-label="Announcement title"
              />
              {!title && (
                <p className="text-red-500 text-sm">Title is required.</p>
              )}
            </div>

            <div className="flex flex-col">
              <textarea
                cols={30}
                rows={10}
                id="name"
                name="content"
                placeholder="Provide the content for the announcement"
                className="col-span-6 p-2 border text-[14px] rounded-md w-full"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              {!content && (
                <p className="text-red-500 text-sm">Content is required.</p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={(e) => handleSubmit(e)}
            disabled={loading}
            type="submit"
            className="w-full py-8 text-lg bg-lightGreen hover:bg-green-700"
          >
            {loading ? "Adding Announcement..." : "Add Announcement"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAnnouncement;
