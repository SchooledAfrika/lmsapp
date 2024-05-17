import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import React from "react";

interface rangeProps {
  ranges?: "string";
}
const handleSelect = ({ ranges }: rangeProps) => {
  console.log(ranges);
};

const DateRange = () => {
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };
  return (
    <div className="">
      <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} className="flex md:flex-row flex-col w-full "
      />
    </div>
  );
};

export default DateRange;
