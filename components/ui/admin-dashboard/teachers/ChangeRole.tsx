"use client";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { changeTeacherRoleSchema } from "@/constants/changeTeacherRole";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BiMailSend } from "react-icons/bi";
import { BiSend } from "react-icons/bi";
import { User2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export type IupdatingTeacherRole = z.infer<typeof changeTeacherRoleSchema>;

export interface Irole {
  dataId: string;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dialogueOpen: boolean;
  isRole: boolean;
}

export const SendSingleMail: React.FC<{
  ismailOpen: boolean;
  setIsmailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
}> = ({ ismailOpen, setIsmailOpen, email }) => {
  const [subject, setSubject] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [checkValue, setCheckValue] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const { toast } = useToast();
  const mutation = useMutation({
    mutationKey: ["send-single-mail"],
    mutationFn: async () => {
      const response = await fetch("/api/messaging/singleuser", {
        method: "POST",
        body: JSON.stringify({
          email,
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
          description: "mail sent successfully to the teacher",
          className: " bg-green-500 text-white",
        });
        setSubject(undefined);
        setMessage(undefined);
        setIsmailOpen(false);
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
              <p>{email}</p>
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

const TriggerForRole = () => {
  return (
    <div className=" text-[13px] font-semibold flex items-center">
      <User2 className="inline ml-0 w-4 h-4 mr-2 text-lightGreen" />
      <p className="inline text-[13px]  font-semibold">Update Role</p>
    </div>
  );
};

// component for changing teachers roles
const ChangeRole: React.FC<Irole> = ({
  dataId,
  dialogueOpen,
  setDialogOpen,
  isRole,
}) => {
  const [loading, setloading] = useState<boolean>(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    control,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<IupdatingTeacherRole>({
    resolver: zodResolver(changeTeacherRoleSchema),
  });

  //   instance of client
  const queryClient = useQueryClient();
  //   creating a post using mutation to the backend
  const mutation = useMutation({
    mutationKey: ["updateTeacherRole"],
    mutationFn: async (data: IupdatingTeacherRole) => {
      // console.log(data);
      const result = await fetch(`/api/teachers/change-teacher-type`, {
        method: "PUT",
        body: JSON.stringify({
          ...data,
          teacherId: dataId,
        }),
      });

      return result;
    },
    onSuccess: async (result) => {
      queryClient.invalidateQueries({ queryKey: ["updateRole"] });
      if (result.ok) {
        const body = await result.json();
        setloading(false);
        setDialogOpen(false);
        reset();
        return toast({
          title: "Successful!!!",
          description: body.message,
          className: " bg-green-500 text-white",
        });
      } else {
        setloading(false);
        return toast({
          variant: "destructive",
          title: "Update Error",
          description: "error updating role!!!",
        });
      }
    },
  });
  // here we validate the datas in our form submission
  // only if there is data, before the mutation function is called
  const runSubmit: SubmitHandler<IupdatingTeacherRole> = async (data) => {
    //console.log(data);
    setloading(true);
    mutation.mutate(data);
  };
  return (
    <Dialog open={dialogueOpen} onOpenChange={() => setDialogOpen(false)}>
      <DialogTrigger asChild>{isRole && <TriggerForRole />}</DialogTrigger>

      <DialogContent
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="sm:w-[600px] w-11/12 font-subtext"
      >
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            Update Teacher Role
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 font-header py-4">
          <div className="grid  items-center font-header gap-4">
            <p className="font-medium text-[15px]  ">
              Selecting either of these options changes a teacher from working
              as an external teacher to working as an internal teacher for
              SchooledAfrika and back.
            </p>
            <p className="font-semibold text-[16px]  ">
              Are you sure you want to perform this operation?
            </p>
          </div>
        </div>
        <div className="w-[96%] mt-2">
          <form
            onSubmit={handleSubmit(runSubmit)}
            className=" flex flex-col gap-2 w-full px-2"
          >
            <div className="flex flex-col gap-[10px] pt-4">
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      clearErrors("type");
                    }}
                  >
                    <SelectTrigger className=" w-full py-2">
                      <SelectValue placeholder="Change Teacher Role" />
                    </SelectTrigger>

                    <SelectContent className=" font-subtext font-medium">
                      <SelectGroup>
                        <SelectItem value="INTERNAL">INTERNAL</SelectItem>
                        <SelectItem value="EXTERNAL">EXTERNAL</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.type && (
                <small className="text-red-600">{errors.type.message}</small>
              )}
            </div>

            <Button
              type="submit"
              className="bg-secondary w-full text-white text-[16px] py-7 my-3"
              disabled={loading}
            >
              {loading ? "updating role..." : "Update Role"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeRole;
