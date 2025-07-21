import React from "react";
import AppCalendar, { type CalendarEvent } from "@/components/app-calendar";
//import type { CalendarEvent } from "@/components/app-calendar";

const tempEvents: CalendarEvent[] = [
  {
    title: "Standard Clean",
    start: new Date(2025, 7, 1, 9, 0),
    end: new Date(2025, 7, 1, 10, 0),
    location: "101 Test St., Dallas TX 75230",
    contact: "(469)111-1111",
  },
  {
    title: "Premium Clean",
    start: new Date(2025, 7, 2, 9, 0),
    end: new Date(2025, 7, 2, 17, 0),
    location: "111 Test St., Dallas TX 75230",
    contact: "(469)111-1112",
    allDay: true,
  },
];

export default function Bookings() {
  return (
    <div>
      <h1>Bookings</h1>
      <div>
        <AppCalendar events={tempEvents} />
      </div>
    </div>
  );
}
