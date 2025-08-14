"use client";
import React, { useState } from "react";
import AppCalendar, { type CalendarEvent } from "@/components/app-calendar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import type { OperatingHours } from "prisma/generated";
import moment from "moment-timezone";

type APIResponse = {
  operatingHours: OperatingHours;
  businessSlug: string;
  bookings: Booking[];
};

interface Booking {
  id: string;
  date: string;
  notes: string | null;
  startTime: string;
  endTime: string;
  duration?: string | null;
}

interface PageProps {
  params: Promise<{
    businessSlug: string;
  }>;
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

function mapBookingsToCalendarEvents(
  rawBookings: Booking[] | null
): CalendarEvent[] {
  if (!rawBookings) return [];

  return rawBookings.map(booking => {
    const startDateTimeString = `${booking.date} ${booking.startTime}`;
    const startDateMoment = moment(startDateTimeString, "YYYY-MM-DD HH:mm A");
    const startDate = startDateMoment.toDate();

    const endDateTimeString = `${booking.date} ${booking.endTime}`;
    const endDateMoment = moment(endDateTimeString, "YYYY-MM-DD HH:mm A");
    const endDate = endDateMoment.toDate();

    return {
      title: booking.notes || booking.id,
      start: startDate,
      end: endDate,
      allDay: false,
    };
  });
}
export default function Calendar({ params }: PageProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [apiData, setApiData] = useState<APIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const unwrappedParams = React.use(params);
  const businessSlug = unwrappedParams.businessSlug;

  useEffect(() => {
    if (!session && !isPending) {
      router.push("/login");
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      if (!session?.user?.id) {
        setIsLoading(false);
        return;
      }

      if (!businessSlug) {
        setError("Business slug is required");
        setIsLoading(false);
        return;
      }

      try {
        const hoursRes = await fetch("/api/business/calendar-events");
        if (!hoursRes.ok) {
          const hoursErr = await hoursRes.json();
          throw new Error(hoursErr.error || `Error fetching operating hours!`);
        }
        const hoursJson = await hoursRes.json();

        const bookingsRes = await fetch(
          `/api/${businessSlug}/business/bookings`
        );
        if (!bookingsRes.ok) {
          const bookingsErr = await bookingsRes.json();
          throw new Error(bookingsErr.error || `Error fetching bookings!`);
        }
        const bookingsJson = await bookingsRes.json();

        setApiData({
          operatingHours: hoursJson,
          bookings: bookingsJson.bookings || [],
          businessSlug: businessSlug,
        });
      } catch (err: any) {
        console.error("Error fetching bookings data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isPending && session?.user?.id && businessSlug) {
      fetchData();
    }
  }, [session, businessSlug, isPending]);

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isLoading) {
    return <div>Loading bookings data...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!apiData) {
    return <div>Loading bookings data...</div>;
  }

  const appointments: CalendarEvent[] = apiData
    ? mapBookingsToCalendarEvents(apiData.bookings)
    : [];

  console.log(appointments);
  return (
    <div className="flex w-full flex-col items-center">
      <p className="mb-4 text-xl font-bold">Welcome, {session?.user.name}</p>
      <div className="w-full max-w-[95%]">
        <AppCalendar
          events={appointments}
          operatingHours={apiData.operatingHours}
        />
      </div>
    </div>
  );
}
