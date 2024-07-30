import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Controller } from "react-hook-form";
import { GoDotFill } from "react-icons/go";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ScrollArea } from "./ui/scroll-area";
import { Subject, urlRegex } from "@/constants/addClassroom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, FormEvent, useState } from "react";
import { useToast } from "./ui/use-toast";
import "react-toastify/dist/ReactToastify.css";
import { useCloudinary } from "@/data-access/cloudinary";
export const TestUploadResource = () => {
  const [subject, setSubject] = useState<string | undefined>(undefined);
  const [title, settitle] = useState<string | undefined>(undefined);
  const [linka, setLinka] = useState<string | undefined>(undefined);
  const [linkb, setLinkb] = useState<Blob | undefined>(undefined);
  const { imageUpload } = useCloudinary();
  const { toast } = useToast();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verifyUrl = urlRegex.test(linka as string);
    // check if there is nothing in the two main fields
    if (!subject || !title) {
      return alert("both subject and title are required");
    }
    // check if user want to submit both
    if (linka && linkb) {
      return alert("you can only submit a link or document not both");
    }
    if (linka) {
      if (!verifyUrl) {
        return alert("invalid url");
      }
    }
    // get image link is image was passed
    const imgUrl = await imageUpload(linkb as Blob);
    //here we make call to the backend
    const response = await fetch("/api/manage-resources", {
      method: "POST",
      body: JSON.stringify({
        subject,
        title,
        sourceLink: linka ?? imgUrl,
        type: linka ? "LINK" : "DOC",
      }),
    });

    if (response.ok) {
      console.log("success");
    }
  };

  const handleImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileBlob = new Blob([e.target.files[0]]);
    return setLinkb(fileBlob);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="inline text-[12px] font-semibold cursor-pointer">
          <GoDotFill className="inline ml-0 text-lightGreen" />
          Upload a Resource
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] font-subtext flex flex-col gap-3">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            Upload Resources
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className=" flex flex-col gap-2">
          <Select
            onValueChange={(value) => {
              setSubject(value);
            }}
          >
            <SelectTrigger className=" w-full py-6">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>

            <SelectContent className=" font-subtext font-medium">
              <ScrollArea className="h-[500px] w-full ">
                <SelectGroup>
                  {Subject.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </ScrollArea>
            </SelectContent>
          </Select>

          <div className=" flex flex-col">
            <Input
              id="id"
              type="text"
              name="title"
              placeholder="enter title"
              className="pl-2 w-full"
              onChange={(e) => settitle(e.target.value)}
            />
          </div>
          <div className="grid gap-4 font-header py-4">
            <div className="relative flex items-center w-full">
              <div className="absolute left-0 pl-3">
                <Image
                  src="/svgs/link-plain.svg"
                  width={20}
                  height={20}
                  alt="Link"
                />
              </div>
              <Input
                id="id"
                type="text"
                name="linka"
                placeholder="Paste Link Here"
                className="pl-10 w-full"
                onChange={(e) => setLinka(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col items-center">
              <h2 className="text-lg  text-black font-bold">
                {" "}
                <span className="hidden  md:inline-flex w-20 md:w-36 mb-2 py-[.3px]  lgl:w-72 h-[.3px] bg-slate-700 mr-6"></span>
                OR{" "}
                <span className="hidden md:inline-flex mb-2 w-20 py-[.3px] md:w-32 lgl:w-72 h-[.3px] bg-slate-700 ml-6"></span>
              </h2>
            </div>
            <div className="relative flex items-center w-full">
              <div className="absolute left-0 pl-3">
                <Image
                  src="/svgs/upload.svg"
                  width={20}
                  height={20}
                  alt="Upload"
                />
              </div>
              <Input
                id="email"
                name="linkb"
                type="file"
                accept=".pdf"
                placeholder="Upload Resources"
                className="pl-10 w-full cursor-pointer"
                onChange={handleImg}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full py-6 bg-lightGreen hover:bg-green-700"
            >
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
