import React from "react";
import AppointmentTable from "@/components/AppointmentTable";

export default function Appointments() {
  return (
    <>
      <header className="border-b p-4">
        <h1 className="text-3xl">Appointments</h1>
      </header>

      <main className="p-6 flex flex-col gap-6">
        {/* Approved Orders */}
        <section className="bg-background height-full w-5/6 rounded-md p-4">
          <h2 className="mb-3 text-xl text-blue-600">Approved</h2>
          <AppointmentTable filter="Approved" />
        </section>

        <section className="bg-background height-full w-5/6 rounded-md p-4">
          <h2 className="mb-3 text-xl text-blue-400">Pending</h2>
          <AppointmentTable filter="Pending" />
        </section>

        <section className="bg-background height-full w-5/6 rounded-md p-4">
          <h2 className="mb-3 text-xl text-red-400">Declined</h2>
          <AppointmentTable filter="Declined" />
        </section>
      </main>
    </>
  );
}
