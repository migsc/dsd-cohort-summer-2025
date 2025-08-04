"use client";
import React, { useState } from "react";
import AppCalendar, { type CalendarEvent } from "@/components/app-calendar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

type Booking = {
  id: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  notes: string | null;
};

type APIResponse = {
  appointments: Booking[];
};

interface AdminPageProps {
  params: {
    businessSlug: string;
  };
}

export default function Calendar({ params }: AdminPageProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [resData, setData] = useState<APIResponse[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { businessSlug } = params;

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
        const res = await fetch(`api/${businessSlug}`);
        if (!res.ok) {
          throw new Error("Failed to get business slug");
        }

        const json = await res.json();
        setData(json);
      } catch (error: any) {
        console.error(error.message);
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
  if (!resData) {
    return <div>Loadng bookings data...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <p className="mb-4 text-xl font-bold">Welcome {session?.user.name}</p>
      <div>
        <AppCalendar events={tempEvents} />
      </div>
    </div>
  );
}
