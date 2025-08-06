"use client";
import React, { useState } from "react";
import AppCalendar, { type CalendarEvent } from "@/components/app-calendar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import type { OperatingHours } from "prisma/generated";

type APIResponse = {
  operatingHours: OperatingHours;
};

const tempEvents: CalendarEvent[] = [
  {
    title: "Standard Clean",
    start: new Date(2025, 7, 1, 12, 0),
    end: new Date(2025, 7, 1, 13, 0),
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

export default function Calendar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [data, setData] = useState<APIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session && !isPending) {
      router.push("/login");
    }
  }, [session, isPending]);

  useEffect(() => {
    if (!session?.user?.id) {
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch("/api/business/calendar-events");
        if (!res.ok) {
          throw new Error("Failed to fetch calendar events");
        }

        const json = await res.json();
        setData(json);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();
  }, [session]);

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!data) {
    return <div>Loading bookings data...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <p className="mb-4 text-xl font-bold">Welcome {session?.user.name}</p>
      <div>
        <AppCalendar events={tempEvents} operatingHours={data.operatingHours} />
      </div>
    </div>
  );
}
