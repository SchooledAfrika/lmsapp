"use client";
import React, { useState } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import { SiGoogleclassroom } from "react-icons/si";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsBroadcast } from "react-icons/bs";
import SingleClassTable from "./SingleClassTable";
import { useParams } from "next/navigation";
import { useConversion } from "@/data-access/conversion";
import { TableSkeleton } from "@/components/TableSkeleton";
import { useToast } from "@/components/ui/use-toast";
import { SingleClassSkeleton } from "@/components/SingleClassroom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { FaEllipsisH, FaRegEdit } from "react-icons/fa";
import { Iadd } from "./AddTest";
import { Input } from "../input";
import { Trash2 } from "lucide-react";

interface studentProps {
  studentIds: string[];
}
interface Announcement {
  id: string;
  title: string;
  desc: string;
  classesId: string;
  createdAt: string;
}

interface IndividualAnnouncementProps {
  dataId: string;
}

interface EditAnnouncementProps {
  dataId: string;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dialogueOpen: boolean;
}


// Dialog that updates the announcement
const EditAnnouncement: React.FC<EditAnnouncementProps> = ({
  dataId,
  setDialogOpen,
  dialogueOpen,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { toast } = useToast();

  // Query client instance
  const queryClient = useQueryClient();

  // Mutation to handle the addition of announcement
  const mutation = useMutation({
    mutationFn: async () => {
      const result = await fetch(`/api/class/announcement`, {
        method: "PUT",
        body: JSON.stringify({
          id: dataId,
          desc: content,
          title,
        }),
      });
      return result;
    },

    onSuccess: async (result) => {
      queryClient.invalidateQueries({ queryKey: ["get-single-class-teacher"] });
      if (result.ok) {
        const body = await result.json();
        setLoading(false);
        setDialogOpen(false);
        return toast({
          variant: "default",
          title: "Successful update!!!",
          description: body.message,
          className: " bg-green-500 text-white",
        });
      } else {
        setLoading(false);
        return toast({
          variant: "destructive",
          title: "Update error",
          description: "Error updating this teacher's status",
        });
      }
    },
  });

  // handle submit or trigger mutation function to run
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent event from propagating to parent elements
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
      <DialogTrigger asChild>
        <div className="text-[13px] flex items-center font-semibold">
          <FaRegEdit className="inline ml-0 w-4 h-4 mr-2 text-lightGreen" />
          <p>Edit </p>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:w-[600px] w-[380px] font-subtext">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            Edit Announcement
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 font-header py-4">
          <div className="grid items-center font-header gap-2">
            <p className="font-bold text-[18px]">
              Are you sure you want to edit announcement?
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
            {loading ? "Editing Announcement..." : "Edit Announcement"}
          </Button>
        </DialogFooter>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  );
};


//The Dialog that deletes the announcement
const RemoveAnnouncement: React.FC<EditAnnouncementProps> = ({ dataId,
  setDialogOpen,
  dialogueOpen}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  //   instance of client
  const queryClient = useQueryClient();
  //   creating a delete using mutation to the backend
  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      const result = await fetch(`/api/class/announcement`, {
        method: "DELETE",
        body: JSON.stringify({
          id: dataId,
        }),
      });
      return result;
    },

    onSuccess: async (result) => {
      queryClient.invalidateQueries({ queryKey: ["get-single-class-teacher"] });
      if (result.ok) {
        const body = await result.json();
        setLoading(false);
        setDialogOpen(false);
        return toast({
          variant: "default",
          title: "Successfully Deleted!!!",
          description: body.message,
          className: " bg-green-500 text-white",
        });
      } else {
        setLoading(false);
        return toast({
          variant: "destructive",
          title: "Update error",
          description: "Error updating this teacher's status",
        });
      }
    }
      
  });
  const handleDelete = () => {
    setLoading(true);
    mutate(dataId);
    
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="inline text-[13px] cursor-pointer  font-semibold">
          <Trash2 className="inline w-4 h-4 mr-2 ml-0 text-lightGreen " />
          Delete 
        </p>
      </DialogTrigger>
      <DialogContent className="sm:w-[500px] w-[380px] font-subtext">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">Delete Announcement</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 font-header py-4">
          <div className="flex flex-1 items-center justify-center mx-auto gap-2">
            <Image
              src="/warn.png"
              alt="warning"
              width={200}
              height={100}
              className="w-[50px]"
            />
          </div>
          <div className="grid  items-center font-header gap-4">
            <p className="font-bold text-[18px]  ">
              Are you sure you want to delete announcement?
            </p>
            <p className="text-sm">
              This action can not be reversed, be sure you want to remove before
              you confirm
            </p>
          </div>
        </div>
        <DialogFooter className="">
          <Button
            onClick={handleDelete}
            disabled={loading}
            type="submit"
            className="w-full py-8 text-lg bg-lightGreen hover:bg-green-700"
          >
            {loading ? "Deleting Announcement..." : "Delete Announcement"}
          </Button>
        </DialogFooter>
      </DialogContent>
      <ToastContainer/>
    </Dialog>
  );
};

// The Update and Delete Announcement options popover
const IndividualAnnouncement = ({ dataId }: IndividualAnnouncementProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="border-none" variant="outline">
          <FaEllipsisH className="ml-3 text-lightGreen " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <div className="grid gap-4 font-header">
          <div className="grid gap-2">
            <div
              onClick={() => setEditDialogOpen(true)}
              className="flex cursor-pointer justify-start"
            >
              <EditAnnouncement
                setDialogOpen={setEditDialogOpen}
                dialogueOpen={editDialogOpen}
                dataId={dataId}
              />
            </div>
            <hr className="bg-black" />
            <div
              onClick={() => setDeleteDialogOpen(true)}
              className="flex justify-start"
            >
              <RemoveAnnouncement
                setDialogOpen={setDeleteDialogOpen}
                dialogueOpen={deleteDialogOpen}
                dataId={dataId}
                
              />
            </div>

            <hr className="bg-black" />
           
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const CheckZoomUser = () => {
  const { id } = useParams();
  const [creating, setCreating] = useState<boolean>(false);
  const mutation = useMutation({
    mutationKey: ["create-meeting-link"],
    mutationFn: async () => {
      const response = await fetch("/api/zoom/get-access-code", {
        method: "POST",
        body: JSON.stringify({
          type: "class",
          id,
        }),
      });
      return response;
    },
    onSuccess: async (response) => {
      setCreating(false);
      const result = await response.json();
      window.location.href = result.link;
    },
  });
  const { data, isLoading } = useQuery({
    queryKey: ["checkzoom"],
    queryFn: async () => {
      const response = await fetch("/api/zoom/isconnected");
      const result = await response.json();
      return result;
    },
  });
  if (isLoading) {
    return <div>loading...</div>;
  }
  const handleConnectZoom = () => {
    const url = `https://zoom.us/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_ZOOM_REDIRECT_URL}`;
    window.location.href = url;
  };
  const handleMakeZoom = () => {
    setCreating(true);
    mutation.mutate();
  };
  return (
    <div>
      {data === null ? (
        <div
          onClick={handleConnectZoom}
          className=" flex items-center px-3 py-3 rounded-md bg-dimOrange w-fit cursor-pointer text-white gap-1"
        >
          <BsBroadcast />
          <p className=" text-[12px]">Connect Zoom</p>
        </div>
      ) : (
        <div>
          <div
            onClick={handleMakeZoom}
            className=" flex items-center px-3 py-3 rounded-md bg-dimOrange w-fit cursor-pointer text-white gap-1"
          >
            <BsBroadcast />
            <p className=" text-[12px]">
              {creating ? "Starting" : "Start"} Session {creating && "..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const SingleClassroom = () => {
  const { id } = useParams();
  const [visibleItems, setVisibleItems] = useState(2); // State to manage visible items
  const [isExpanded, setIsExpanded] = useState(false); // To toggle between show more/less
  const { handleDate } = useConversion();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-single-class-teacher"],
    queryFn: async () => {
      const response = await fetch(`/api/class/specific/${id}`);
      const result = await response.json();
      return result;
    },
  });
  console.log(data);
  //   if is loading
  if (isLoading) {
    return (
      <div className=" mt-4">
        <SingleClassSkeleton />;
      </div>
    );
  }
  // if is error
  if (isError) {
    return <div className=" flex-1">{error.message}</div>;
  }

  const handleShowMore = () => {
    setVisibleItems(data?.AnnouncementByTeacherClass.length || 0);
    setIsExpanded(true); // Toggle expanded state to true
  };

  const handleShowLess = () => {
    setVisibleItems(2); // Show only the initial 3 items
    setIsExpanded(false); // Toggle expanded state to false
  };
  return (
    <div>
      {data && (
        <div key={data.id} className="font-header md:mt-12 mt-24">
          <div className="flex justify-between">
            <p className="font-bold text-lg">Details</p>
            <Link
              href="/teacher-dashboard/classroom"
              className="cursor-pointer"
            >
              <Image
                src="/closeAlt.svg"
                alt="cancel"
                width={100}
                height={100}
                className="w-[20px] h-[20px]"
              />
            </Link>
          </div>

          <div className="grid font-subtext md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 mt-6 mb-2">
            <div className="bg-white py-6 rounded-md">
              <div className="flex justify-between px-6 py-2  pb-1">
                <p className="text-slate-500 text-[14px] mb-3 font-semibold">
                  Overview
                </p>
              </div>
              <div className="px-6 flex  space-x-2 pb-2">
                <Image
                  src={data?.classBanner}
                  alt=""
                  width={100}
                  height={100}
                  className="rounded-md w-[100px] h-[100px]"
                />

                <div className="">
                  <p className="inline text-[13px] font-semibold">
                    <SiGoogleclassroom className="inline w-[15px] mr-1 h-[15px]" />{" "}
                    {data?.className}
                  </p>
                  <p className="mt-3 text-[12.5px]">{data?.grade}</p>
                </div>
              </div>
              <div className="flex px-6 flex-col justify-between">
                <p className="text-[13px] font-semibold">
                  Duration : {data?.duration}{" "}
                </p>
                <p className="text-[13px] my-3 font-semibold">
                  Date Created : {handleDate(data?.createdAt)}
                </p>
                <CheckZoomUser />
              </div>
            </div>
            {/* Announcements Div */}
            <div
              className={`announcement-container bg-white px-4 py-2 rounded-md ${
                isExpanded ? "announcement-expanded" : ""
              }`}
            >
              <p className="text-slate-500 text-[14px] mb-3 font-semibold">
                Announcements
              </p>

              {data?.AnnouncementByTeacherClass?.length > 0 ? (
                <>
                  {data.AnnouncementByTeacherClass.slice(0, visibleItems).map(
                    (announcement: Announcement) => (
                      <div key={announcement.id} className="mt-3">
                        <div className="flex justify-between">
                          <p className="text-[13px] font-bold">
                            {announcement.title}
                          </p>
                          <IndividualAnnouncement dataId={announcement.id} />
                        </div>
                        <p className="text-[12px]">{announcement.desc}</p>
                        <p className="text-[12px] text-slate-500">
                          Posted on: {handleDate(announcement.createdAt)}
                        </p>
                        <hr className="w-full my-3 font-semibold text-black" />
                      </div>
                    )
                  )}
                  {/* Conditionally render Show More/Less buttons */}
                  {data.AnnouncementByTeacherClass.length > 2 && (
                    <div className="flex justify-center mt-4">
                      {isExpanded ? (
                        <button
                          onClick={handleShowLess}
                          className="text-white w-full rounded-md p-2 text-[14px] bg-lightGreen font-semibold"
                        >
                          Show Less Announcements
                        </button>
                      ) : (
                        <button
                          onClick={handleShowMore}
                          className="text-white w-full rounded-md p-2 text-[14px] bg-lightGreen font-semibold"
                        >
                          Show More Announcements
                        </button>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <p className="text-slate-500 text-[13px] italic">
                  No announcements available.
                </p>
              )}
            </div>
            <div className="bg-white rounded-md py-6 px-6">
              <p className="text-slate-500 text-[14px] mb-3 font-semibold">
                Invite students
              </p>
              <p className="my-3 text-[14px] font-semibold">
                Use this link to invite students to join your live class.
              </p>
              <p className="text-blue-400 text-[14px] font-semibold underline">
                http://web.schooledafrika09=ab/live
              </p>
              <p className="text-[16px] font-semibold my-3">
                Login ID for students:
              </p>
              <p className="text-[20px] font-semibold text-lightGreen my-3">
                209112
              </p>
              <Button
                variant="outline"
                className="w-full font-bold border-lightGreen text-lightGreen hover:text-lightGreen"
              >
                Invite Student
              </Button>
            </div>
          </div>

          <SingleClassTable dataId={data?.id} studentIds={data?.studentIDs} />
        </div>
      )}
    </div>
  );
};

export default SingleClassroom;
