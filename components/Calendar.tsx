'use client'
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Calendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className='my-6 mx-auto  w-full p-3 justify-between flex items-center'>
      <DateTimePicker onChange={onChange} value={value} className="rounded-lg px-6 space-x-3 mx-auto"  />
    </div>
  );
}

export default Calendar