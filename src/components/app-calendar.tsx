"use client";
import React from "react";
import { Calendar } from "react-big-calendar";
import localizer from "@/lib/calendar-localizer";
import "react-big-calendar/lib/css/react-big-calendar.css";

type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
};

const AppCalendar: React.FC<{ events: CalendarEvent[] }> = ({ events }) => (
  <div style={{ height: 500 }}>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "100%" }}
    />
  </div>
);

export default AppCalendar;
