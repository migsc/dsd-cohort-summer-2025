import React from "react";
import AppointmentTable from "@/components/AppointmentTable";
import { getBookingsWithServiceAndCustomer } from "@/lib/queries/queries";
type Props = {
  params: {
    businessSlug: string;
  };
};

export default async function Appointments({ params }: Props) {
  const bookings = await getBookingsWithServiceAndCustomer(params.businessSlug);

  if (!bookings || bookings.length === 0) {
    return <div>Business Not Found.</div>;
  }


  return (
    <>
      <header className="border-b p-4">
        <h1 className="text-3xl">Appointments</h1>
      </header>

      <main className="flex flex-col gap-6 p-6">
        {/* Approved Orders */}
        <section className="bg-background height-full w-5/6 rounded-md p-4">
            <AppointmentTable
    filter="Approved"
    bookingInfo={bookings.map(booking => ({
      id: booking.id,
      date: booking.date,
      startTime: booking.startTime,
      status: booking.status,
      timeSlot: booking.startTime, // <-- timeSlot? not in your model
      notes: booking.notes,
      serviceName: booking.service?.name ?? "Unknown",
      serviceID: booking.service?.id,
      customer:{
        id: booking.customer.id,
        name: booking.customer.user?.name ?? "No Name", 
        email: booking.customer.user?.email ?? "No Email", 
      } // <-- customer.name not in model
    }))}
  />
        </section>
      </main>
    </>
  );
}
