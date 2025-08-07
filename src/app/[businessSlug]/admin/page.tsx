"use client";
import React, { useState } from "react";
import AppCalendar, { type CalendarEvent } from "@/components/app-calendar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import type { OperatingHours } from "prisma/generated";

type APIResponse = {
  operatingHours: OperatingHours;
  businessSlug: string;
  bookings: Booking[];
};

interface Booking {
  id: string;
  serviceName: string;
  date: string;
  startTime: string;
  endTime: string;
  duration?: string | null;
}

interface AdminPageProps {
  params: {
    businessSlug: string;
  };
}

function mapBookingsToCalendarEvents(
  rawBookings: Booking[] | null
): CalendarEvent[] {
  if (!rawBookings) return [];

  return rawBookings.map(booking => {
    return {
      title: booking.serviceName,
      start: new Date(booking.startTime),
      end: new Date(booking.endTime),
      allDay: false,
    };
  });
}

export default function Calendar({ params }: AdminPageProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [apiData, setApiData] = useState<APIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const businessSlug = params.businessSlug;

  useEffect(() => {
    if (!session && !isPending) {
      router.push("/login");
    }
  }, [session, isPending]);

  useEffect(() => {
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
          throw new Error(
            hoursErr.error ||
              `Error fetching operating hours! status ${hoursRes.status}`
          );
        }
        const hoursJson = await hoursRes.json();

        const bookingsRes = await fetch(`/api/${businessSlug}/bookings`);
        if (!bookingsRes.ok) {
          const bookingsErr = await bookingsRes.json();
          throw new Error(
            bookingsErr.error ||
              `Error fetching bookings! status ${bookingsRes.status}`
          );
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
    return <div>Loadng bookings data...</div>;
  }

  const appointments: CalendarEvent[] = apiData
    ? mapBookingsToCalendarEvents(apiData.bookings)
    : [];

  return (
    <div className="flex flex-col items-center">
      <p className="mb-4 text-xl font-bold">Welcome {session?.user.name}</p>
      <div>
        <AppCalendar
          events={appointments}
          operatingHours={apiData.operatingHours}
        />
      </div>
    </div>
  );
}
