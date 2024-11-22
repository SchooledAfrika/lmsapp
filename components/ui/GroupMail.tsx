"use client";
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BiMailSend } from "react-icons/bi";
import { BiSend } from "react-icons/bi";
import { useToast } from "@/components/ui/use-toast";

export const EmailAll: React.FC<{
  ismailOpen: boolean;
  setIsmailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  group: string;
}> = ({ ismailOpen, setIsmailOpen, group }) => {
  const [subject, setSubject] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [checkValue, setCheckValue] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const { toast } = useToast();
  const mutation = useMutation({
    mutationKey: ["send-single-mail"],
    mutationFn: async () => {
      const response = await fetch("/api/messaging/all-users", {
        method: "POST",
        body: JSON.stringify({
          group,
          subject,
          message,
        }),
      });
      return response;
    },
    onSuccess: async (response) => {
      const result = await response.json();
      if (response.ok) {
        toast({
          variant: "default",
          title: "email",
          description: result.message,
          className: " bg-green-500 text-white",
        });
        setSubject(undefined);
        setMessage(undefined);
        setIsmailOpen(false);
        setSending(false);
      } else {
        setSending(false);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Message was not sent successfully",
        });
      }
    },
  });
  // function to handle disabled button
  useEffect(() => {
    const checkValues = () => {
      if (subject && message) {
        return setCheckValue(true);
      }
      return setCheckValue(false);
    };
    checkValues();
  }, [subject, message]);
  // function to trigger submit
  const runSubmit = () => {
    if (!message || !subject) {
      return alert("all fields are required");
    }
    setSending(true);
    mutation.mutate();
  };
  return (
    <Dialog open={ismailOpen} onOpenChange={() => setIsmailOpen(false)}>
      <DialogContent className="sm:w-[500px] w-11/12 px-3 font-subtext">
        <DialogHeader>
          <DialogTitle className="md:text-2xl text-[18px] font-bold flex flex-col items-center justify-center">
            <div className=" flex items-center gap-1">
              <p>Send mail</p>
              <BiMailSend className=" text-green-800" />
            </div>
            <div className=" text-[10px] p-1 rounded-sm bg-green-800 text-white">
              <p>About to message all {group}</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className=" flex flex-col gap-2">
          <div className=" flex flex-col">
            <label className=" text-[14px]">
              Subject<span className=" text-red-700">*</span>
            </label>
            <input
              placeholder=" enter mail subject "
              className=" border focus:outline-none p-2 rounded-md"
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className=" flex flex-col">
            <label className=" text-[14px]">
              Message<span className=" text-red-700">*</span>
            </label>
            <textarea
              className="h-[200px] border rounded-md focus:outline-none p-2 text-[14px]"
              placeholder=" enter mail message "
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button
            onClick={runSubmit}
            className={` w-full cursor-pointer transition-all ease-in-out duration-700 flex gap-2 border items-center justify-center rounded-md  py-3 ${
              checkValue
                ? "bg-green-700 text-white"
                : " bg-slate-400 text-slate-300"
            } `}
          >
            <span>{sending ? "Sending..." : "Send"}</span> <BiSend />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const MailComponent: React.FC<{ group: string }> = ({ group }) => {
  const [ismailOpen, setIsmailOpen] = useState<boolean>(false);
  return (
    <div className=" w-full flex text-[14px] items-end justify-end mb-2 ">
      <div
        onClick={() => setIsmailOpen(true)}
        className=" px-3 py-2 rounded-md border-2 text-green-600 cursor-pointer hover:border-green-700 ease-in-out duration-700 transition-all"
      >
        <p>email all {group}</p>
      </div>
      <EmailAll
        ismailOpen={ismailOpen}
        setIsmailOpen={setIsmailOpen}
        group={group}
      />
    </div>
  );
};

export default MailComponent;
