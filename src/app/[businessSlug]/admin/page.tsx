"use client";
import React, { useState } from "react";
import AppCalendar, { type CalendarEvent } from "@/components/app-calendar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface Booking {
  id: string;
  serviceName: string;
  date: string;
  startTime: string;
  endTime: string;
  duration?: string | null;
}

type APIResponse = {
  businessSlug: string;
  bookings: Booking[];
};

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
        console.log("This is the business slug: ", businessSlug);
        const res = await fetch(`/api/${businessSlug}/bookings`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            errorData.error || `HTTP error! status ${res.status}`
          );
        }

        const json: APIResponse = await res.json();
        setApiData(json);
      } catch (err: any) {
        console.error("Error fetching bookings data:", err);
        setError(err.message);
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
        <AppCalendar events={appointments} />
      </div>
    </div>
  );
}
