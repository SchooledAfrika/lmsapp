'use client'
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

interface Event {
  date: string; // Format: YYYY-MM-DD
  title: string;
  description: string;
}

// Sample events for demonstration
const events: Event[] = [
  { date: '2024-09-01', title: 'Meeting with Bob', description: 'Discuss project status.' },
  { date: '2024-09-12', title: 'Team lunch', description: 'Lunch with the team at 1 PM.' },
  { date: '2024-09-21', title: 'Conference', description: 'Attend a tech conference.' },
  // Add more events here
];

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf('month'));
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [days, setDays] = useState<number[]>([]);

  // Calculate the days for the selected month
  // useEffect(() => {
  //   const daysInMonth = currentMonth.daysInMonth();
  //   const firstDayOfMonth = currentMonth.startOf('month').day(); // 0 = Sunday, 6 = Saturday
  //   const daysArray = Array(firstDayOfMonth).fill(null).concat([...Array(daysInMonth).keys()].map(i => i + 1));
  //   setDays(daysArray);
  // }, [currentMonth]);

  // Handle day click to preview event
  const handleDayClick = (day: number | null) => {
    if (!day) return;
    const clickedDate = currentMonth.date(day).format('YYYY-MM-DD');
    const event = events.find(e => e.date === clickedDate);
    setSelectedEvent(event || null);
  };

  // Go to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
    setSelectedEvent(null); // Reset selected event on month change
  };

  // Go to next month
  const goToNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
    setSelectedEvent(null);
  };

  return (
    <div className="p-2 mx-auto ">
      {/* Month Header */}
      <div className="flex justify-between w-[800px] mx-auto items-center mb-4">
        <button onClick={goToPreviousMonth} className="p-2 text-[14px] bg-lightGreen shadow-xl text-white rounded">Previous Month</button>
        <h2 className="text-xl font-semibold">{currentMonth.format('MMMM YYYY')}</h2>
        <button onClick={goToNextMonth} className="p-2 bg-lightGreen shadow-xl text-[14px] text-white rounded">Next Month</button>
      </div>

      {/* Days of the Week */}
      <div className="flex overflow-x-auto mx-auto w-[800px] gap-4 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="font-semibold">{day}</div>
        ))}
      </div>

      {/* Days in Month */}
      <div className="flex overflow-x-auto mx-auto w-[800px] gap-2 mt-2">
        {days.map((day, index) => (
          <div
            key={index}
            className={`p-4 border ${day ? 'cursor-pointer ' : ''} ${events.some(e => e.date === currentMonth.date(day).format('YYYY-MM-DD')) ? 'bg-lightGreen text-white font-bold rounded-2xl shadow-xl' : 'rounded-2xl'}`}
            onClick={() => handleDayClick(day)}
          >
            {day || ''}
          </div>
        ))}
      </div>

      {/* Event Preview */}
      {selectedEvent && (
        <div className="mt-4 p-4 bg-gray-100 border border-gray-300">
          <h3 className="text-xl font-semibold">{selectedEvent.title}</h3>
          <p>{selectedEvent.description}</p>
        </div>
      )}
    </div>
  );
};

export default Calendar;
