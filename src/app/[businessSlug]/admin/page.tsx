"use client";
import React, { useMemo, useState } from "react";
import AppCalendar, { type CalendarEvent } from "@/components/app-calendar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface Booking {
  id: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  serviceDuration?: string | null;
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

const mapBookingsToCalendarEvents = useMemo(() => {
  return (rawBookings: Booking[] | null): CalendarEvent[] => {
    if (!rawBookings) return [];

    return rawBookings.map(booking => {
      const startDateTimeString = `${booking.date}T${booking.timeSlot}`;
      const startDate = new Date(startDateTimeString);

      let endDate: Date;
      if (booking.serviceDuration) {
        const durationMatch = booking.serviceDuration.match(/(\d+)\s*hour(s)?/);
        let durationInHours =
          durationMatch && durationMatch[1]
            ? parseInt(durationMatch[1], 10)
            : 1;
        endDate = new Date(
          startDate.getTime() + durationInHours * 60 * 60 * 1000
        );
      } else {
        endDate = new Date(startDate.getTime() + 1 * 60 * 60 * 1000);
      }

      return {
        title: booking.serviceName,
        start: startDate,
        end: endDate,
        allDay: false,
      };
    });
  };
}, []);

export default function Calendar({ params }: AdminPageProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [apiData, setApiData] = useState<APIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { businessSlug } = params;

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
        /* This has the business slug but I will console log it
        const res = await fetch(`api/${businessSlug}`);
        if (!res.ok) {
          throw new Error("Failed to get business slug");
        }

        const json = await res.json();
        setApiData(json);
        */

        console.log("This is the business slug: ", businessSlug);
        const res = await fetch(`api/${businessSlug}/bookings`);
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

    fetchData();
  }, [session, businessSlug]);

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
