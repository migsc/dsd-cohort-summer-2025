"use client";
import React from "react";
import { Calendar, Views } from "react-big-calendar";
import localizer from "@/lib/calendar-localizer";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@/styles/calendar.css";
import moment from "moment-timezone";
import type { DayOperatingHours, OperatingHours } from "prisma/generated";

export type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  location: string;
  contact: string;
  allDay?: boolean;
};

export type AppCalendarProps = {
  events: CalendarEvent[];
  operatingHours: OperatingHours;
};

const AppCalendar: React.FC<AppCalendarProps> = ({
  events,
  operatingHours,
}) => {
  const getHoursForDay = (date: Date): DayOperatingHours | null => {
    if (!operatingHours) return null;

    const eventMoment = moment(date);
    const dayOfWeek = eventMoment.day();
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const dayKey = days[dayOfWeek].toLowerCase();
    return operatingHours[dayKey as keyof OperatingHours];
  };

  const eventWithinHours = (
    timeToCheck: moment.Moment,
    dailyHours: DayOperatingHours | null | undefined
  ) => {
    if (!dailyHours) return false;
    const [openHour, openMinute] = dailyHours.start.split(":").map(Number);
    const [closeHour, closeMinute] = dailyHours.end.split(":").map(Number);

    const openTime = moment(timeToCheck)
      .hour(openHour)
      .minute(openMinute)
      .second(0)
      .millisecond(0);

    let closeTime = moment(timeToCheck)
      .hour(closeHour)
      .minute(closeMinute)
      .second(0)
      .millisecond(0);

    return (
      timeToCheck.isSameOrAfter(openTime) && timeToCheck.isBefore(closeTime)
    );
  };

  const eventStyleGetter = (event: CalendarEvent) => {
    let style: React.CSSProperties = {
      backgroundColor: "#3b82f6",
      borderRadius: "4px",
      opacity: 0.9,
      color: "white",
      border: "none",
      display: "block",
    };

    const eventMoment = moment(event.start);
    const dailyHours = getHoursForDay(event.start);

    if (!dailyHours) {
      style.backgroundColor = "#6b7280";
      style.opacity = 0.6;
    } else {
      if (!eventWithinHours(eventMoment, dailyHours)) {
        style.backgroundColor = "#6b7280";
        style.opacity = 0.6;
      }
    }

    return { style };
  };

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        defaultView={Views.WEEK}
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default AppCalendar;
