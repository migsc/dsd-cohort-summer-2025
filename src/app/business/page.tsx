"use client";
import React from "react";
import AppCalendar, { type CalendarEvent } from "@/components/app-calendar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

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

export default function Calendar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  
// @TODO: Uncomment the following lines to redirect unauthenticated users

  // useEffect(() => {
  //   if (!session && !isPending) {
  //     router.push("/login");
  //   }
  // }, [session, isPending]);

  if (isPending) {
    return <div>Loading...</div>;
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
