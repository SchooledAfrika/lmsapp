"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { FaHourglassStart, FaHourglassEnd } from "react-icons/fa";

export default function DateRangePicker() {
  const [dateStart, setDateStart] = React.useState<Date>();
  const [dateEnd, setDateEnd] = React.useState<Date>();

  return (
    <div className="flex md:flex-row flex-col md:space-y-0 space-y-3 justify-between mt-3 font-header">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "md:w-[330px] w-[330px] p-4 justify-start text-left font-normal",
              !dateStart && "text-muted-foreground"
            )}
          >
            <FaHourglassEnd className="mr-2 text-lightGreen h-4 w-4" />
            {dateStart ? format(dateStart, "PPP") : <span>Class Starts</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full font-header col-span-6 p-0">
          <Calendar
            mode="single"
            selected={dateStart}
            onSelect={setDateStart}
            className="font-subtext"
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "md:w-[330px] w-[330px] p-4 justify-start text-left font-normal",
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
  );
}
