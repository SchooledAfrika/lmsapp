"use client"
import * as React from "react"

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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { SiGoogleclassroom } from "react-icons/si";
import { Checkbox } from "@/components/ui/checkbox"

 

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { FaHourglassStart, FaHourglassEnd } from "react-icons/fa";
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from "next/image"
 

function AddClassroom() {
    const [dateStart, setDateStart] = React.useState<Date>()
    const [dateEnd, setDateEnd] = React.useState<Date>()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-lightGreen mt-3 bg-none border-none rounded-lg hover:bg-green-700  text-white text-[13px] font-semibold  px-3    py-2 text-start lg:block">
          <SiGoogleclassroom className="sm:inline-block text-[18px] hidden mr-1" />
          Create Classroom
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:w-[500px]  w-[380px] font-subtext"> 
      <ScrollArea className="h-[500px] w-full ">
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
          <div className="grid grid-cols-4  items-center gap-4 w-full">
            <Select>
              <SelectTrigger className="md:w-[450px] w-[330px] p-4">
                <SelectValue placeholder="Grade" />
              </SelectTrigger>

              <SelectContent className=" font-subtext font-medium">
                <ScrollArea className="h-[500px] w-full ">
                  <SelectGroup>
                    <SelectItem value="grade1">Grade 1</SelectItem>
                    <SelectItem value="grade2">Grade 2</SelectItem>
                    <SelectItem value="grade3">Grade 3</SelectItem>
                    <SelectItem value="grade4">Grade 4</SelectItem>
                    <SelectItem value="grade5">Grade 5</SelectItem>
                    <SelectItem value="grade6">Grade 6</SelectItem>
                    <SelectItem value="grade7">Grade 7</SelectItem>
                    <SelectItem value="grade8">Grade 8</SelectItem>
                    <SelectItem value="grade9">Grade 9</SelectItem>
                    <SelectItem value="grade10">Grade 10</SelectItem>
                    <SelectItem value="grade11">Grade 11</SelectItem>
                    <SelectItem value="grade12">Grade 12</SelectItem>
                  </SelectGroup>
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Select>
              <SelectTrigger className="md:w-[450px] w-[330px] p-4">
                <SelectValue placeholder="Duration" />
              </SelectTrigger>

              <SelectContent className=" font-subtext font-medium">
                <ScrollArea className="h-[200px] w-full ">
                  <SelectGroup>
                    <SelectItem value="2weeks">2 Weeks</SelectItem>
                    <SelectItem value="1month">1 Month</SelectItem>
                    <SelectItem value="2months">2 Months</SelectItem>
                    <SelectItem value="3months">3 Months</SelectItem>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                    
                  </SelectGroup>
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "md:w-[450px] w-[330px] p-4 justify-start text-left font-normal",
            !dateStart && "text-muted-foreground"
          )}
        >
          <FaHourglassStart className="mr-2 h-4 text-lightGreen w-4" />
          {dateStart ? format(dateStart, "PPP") : <span>Class Starts</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full col-span-6 p-0">
        <Calendar
          mode="single"
          selected={dateStart}
          onSelect={setDateStart}
          className="font-subtext"
          initialFocus
        />
      </PopoverContent>
    </Popover>
           
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "md:w-[450px] w-[330px] p-4 justify-start text-left font-normal",
            !dateEnd && "text-muted-foreground"
          )}
        >
          <FaHourglassEnd className="mr-2 text-lightGreen h-4 w-4" />
          {dateEnd ? format(dateEnd, "PPP") : <span>Class Ends</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full col-span-6 p-0">
        <Calendar
          mode="single"
          selected={dateEnd}
          onSelect={setDateEnd}
          className="font-subtext"
          initialFocus
        />
      </PopoverContent>
    </Popover>
           
          </div>

          <div className="grid grid-cols-4  items-center gap-4 w-full">
            <Select>
              <SelectTrigger className="md:w-[450px] w-[330px] p-4">
                <SelectValue placeholder="Class Schedule" />
              </SelectTrigger>

              <SelectContent className=" font-subtext font-medium">
                <ScrollArea className="h-[250px] w-full ">
                  <SelectGroup>
                    <SelectItem value="first">8AM-10AM</SelectItem>
                    <SelectItem value="second">10AM-12PM</SelectItem>
                    <SelectItem value="grade3">12PM-2PM</SelectItem>
                    <SelectItem value="grade4">2PM-4PM</SelectItem>
                    <SelectItem value="grade5">4PM-6PM</SelectItem>
                    <SelectItem value="grade6">6PM-8PM</SelectItem>
                    <SelectItem value="grade7">8PM-10PM</SelectItem>
                    
                  </SelectGroup>
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>
         
          <div className=" w-full rounded-md h-[60px] font-header border bg-white flex items-center text-black justify-between px-2 ">
      <input
        placeholder="Price"
        className=" w-full text-[14px] text-black bg-transparent focus:outline-none"
      />
      <div className=" w-[50px] cursor-pointer font-bold aspect-square rounded-full flex items-center justify-center">
        <Image src="/usflag.png" alt="usflag" width={100} height={100} className="w-[40px] h-[40px] rounded-full" />
      </div>
    </div>

    <div className="flex font-subtext flex-col">
    <div className="flex items-center space-x-2">
    <input className="w-4 h-4 px-2 accent-lightGreen" type="checkbox" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Public class
      </label>
      
    </div>
     <p className="text-[12px] my-3">Your class is visible and open to all on the platform</p>
    </div>

    <div className="flex font-subtext flex-col">
    <div className="flex items-center space-x-2">
    <input className="w-4 h-4 px-2 accent-lightGreen" type="checkbox" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Private class
      </label>
      
    </div>
     <p className="text-[12px] my-3">Your class is only visible and open to specific persons who you granted access with links.</p>
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
         </ScrollArea>
      </DialogContent>
     
    </Dialog>
  );
}

export default AddClassroom;
