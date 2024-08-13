import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { SiGoogleclassroom } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const AddCourseCategory = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-lightGreen mt-3 bg-none border-none rounded-lg hover:bg-green-700  text-white text-[13px] font-semibold px-3 py-2 text-start lg:block">
          <SiGoogleclassroom className="sm:inline-block text-[18px] hidden mr-2" />
          Add Category
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:w-[500px]  w-[380px] font-subtext">
        <ScrollArea className="h-[500px] w-full ">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">
              Add Category
            </DialogTitle>
          </DialogHeader>
          <div className="w-[96%] mt-2">
            <form>
              <div className=" flex flex-col">
                <label className="text-[15px] pb-2">Category Name</label>
                <Input
                  id="name"
                  type="text"
                  name="className"
                  placeholder="e.g Web Development"
                  className="col-span-6 w-full outline-none"
                />
              </div>
              <div className=" flex flex-col">
                <label className="text-[15px] pb-2 pt-5">Description</label>
                <Textarea
                  id="name"
                  name="className"
                  className="col-span-6 w-full outline-none"
                />
              </div>
              <div className="flex flex-col ">
                <label className="text-[15px] pb-2 pt-5">
                  Category Thumbnail
                </label>
                <div className="border p-[10px] rounded w-full">
                  <input
                    type="file"
                    multiple={false}
                    accept="image/*"
                    name="thumbnail"
                    className="border-1 w-full text-[14px] text-black bg-transparent focus:outline-none"
                  />
                </div>
              </div>
              <div className=" flex flex-col">
                <label className="text-[15px] pb-2 pt-5">Subcategory</label>
                <Input
                  id="name"
                  type="text"
                  name="className"
                  placeholder="e.g Web Development"
                  className="col-span-6 w-full outline-none"
                />
              </div>
              <Button className="my-5 bg-lightGreen">Save Information</Button>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AddCourseCategory;
