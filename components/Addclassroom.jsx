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
import { SiGoogleclassroom } from "react-icons/si";

function AddClassroom() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-lightGreen mt-3 bg-none border-none rounded-lg hover:bg-green-700  text-white text-[14px] font-semibold  px-3 sm:w-36   py-2 text-start lg:block">
          <SiGoogleclassroom className="sm:inline-block hidden mr-1" />
          Add Classroom
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[500px] w-[380px] font-subtext">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            Create Classroom
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 font-header py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="name"
              type=""
              placeholder="Class Name"
              className="col-span-6 w-full"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="subject"
              placeholder="Class Subject"
              className="col-span-6 w-full"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="grade"
              list="Grade"
              placeholder="Grade"
              className="col-span-6 w-full"
            />
            <datalist id="Grade" className="bg-white">
              <option>Grade 1</option>
              <option>Grade 2</option>
              <option>Grade 3</option>
              <option>Grade 4</option>
              <option>Grade 5</option>
              <option>Grade 6</option>
              <option>Grade 7</option>
              <option>Grade 8</option>
              <option>Grade 9</option>
              <option>Grade 10</option>
              <option>Grade 11</option>
              <option>Grade 12</option>
            </datalist>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="schedule"
              list="Schedule"
              placeholder="Class Schedule"
              className="col-span-6 w-full"
            />
            <datalist id="Schedule" className="bg-white">
              <option>Grade 1</option>
              <option>Grade 2</option>
              <option>Grade 3</option>
              <option>Grade 4</option>
              <option>Grade 5</option>
              <option>Grade 6</option>
              <option>Grade 7</option>
              <option>Grade 8</option>
              <option>Grade 9</option>
              <option>Grade 10</option>
              <option>Grade 11</option>
              <option>Grade 12</option>
            </datalist>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="w-full py-6 bg-lightGreen hover:bg-green-700"
          >
            Add Classroom
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddClassroom;
