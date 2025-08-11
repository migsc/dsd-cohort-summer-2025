"use client";
import React, { useState } from "react";
import { Calendar, Views, type View } from "react-big-calendar";
import localizer from "@/lib/calendar-localizer";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment-timezone";
import type { DayOperatingHours, OperatingHours } from "prisma/generated";

export type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
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
  const [view, setView] = useState<View>(Views.WEEK);

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
      backgroundColor: "var(--primary)",
      borderRadius: "0.25rem",
      opacity: 0.9,
      color: "var(--primary-foreground)",
      border: "none",
      display: "block",
    };

    const eventMoment = moment(event.start);
    const dailyHours = getHoursForDay(event.start);

    if (!dailyHours || !eventWithinHours(eventMoment, dailyHours)) {
      style.backgroundColor = "var(--muted)";
      style.opacity = 0.6;
      style.color = "var(--muted-foreground)";
    }

    return { style };
  };

  return (
    <div className="bg-background flex h-screen w-full flex-col">
      <main className="flex w-full flex-1 overflow-hidden">
        <div className="w-full flex-1 overflow-auto p-6">
          <div className="h-full w-full">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              eventPropGetter={eventStyleGetter}
              view={view}
              onView={view => setView(view)}
              style={{ height: "100%", width: "100%" }}
              className="rbc-calendar-custom"
              formats={{
                dayFormat: "ddd DD",
                eventTimeRangeFormat: ({ start, end }) => {
                  return `${moment(start).format("h:mm A")} - ${moment(end).format("h:mm A")}`;
                },
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppCalendar;
