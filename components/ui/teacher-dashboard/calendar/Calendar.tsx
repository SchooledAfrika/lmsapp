"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import { CheckCheckIcon } from "lucide-react";

interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
}

const Calendar = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  //: { date: Date; allDay: boolean }
  // Function to handle the clicked event and show modal with event information
  const handleDateClick = (arg:any) => {
    alert(`Date clicked: ${arg.dateStr}`);
    console.log(arg.dateStr);
    setShowModal(true);
  };

  const handleDelete = () => {};

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <main className="flex min-h-screen font-header  flex-col  p-6">
        <div className="grid grid-cols-10">
          <div className="md:col-span-10   col-span-12">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "resourceTimelineWeek, dayGridMonth,timeGridWeek",
              }}
              events={allEvents as EventSourceInput}
              nowIndicator={true}
              editable={true}
              droppable={true}
              selectable={true}
              selectMirror={true}
              dateClick={handleDateClick}
              eventClick={(data) => handleDelete()}
            />
          </div>
        </div>

        <Transition.Root show={showModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10 font-header"
            onClose={setShowModal}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-[500px] sm:p-6">
                    <div>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <CheckCheckIcon
                          className="h-6 w-6 text-green-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Event
                        </Dialog.Title>

                        <div className="mt-2">
                          <h3>This is your event for today {Date()}</h3>
                        </div>
                        <div className="my-3">
                          <button
                            type="button"
                            className=" w-full  rounded-md bg-red-600 px-8 py-3 text-sm 
                            font-semibold text-white  hover:bg-red-500 sm:ml-3 "
                            onClick={handleDelete}
                          >
                            Delete Event
                          </button>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </main>
    </>
  );
};

export default Calendar;
