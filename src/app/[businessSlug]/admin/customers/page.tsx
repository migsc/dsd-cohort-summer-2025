import React from "react";

import { Separator } from "../../../../components/ui/separator";
import { useState } from "react";
import CustomerTable from "@/app/[businessSlug]/admin/customers/customerTable";
import { getBookingsWithServiceAndCustomer } from "@/lib/queries/queries";


type Props = {
  params: Promise<{businessSlug: string}>
};


export default async function Customers({ params }: Props) {
  const paramsAwait = params instanceof Promise ? await params : params; //I keep getting errors about uncaught promises (previous comment mentioned to await params) but it's not a promise when I try to await it but this works at least to check both conditions if it changes
  const bookings = await getBookingsWithServiceAndCustomer(
    paramsAwait.businessSlug
  );

  if (!bookings || bookings.length === 0) {
    return <div>Business Not Found.</div>;
  }

  return (
    <>
      <header>
        <h1 className="text-3xl">Customer List</h1>
      </header>
      <Separator className="my-6" />

      <main className="flex flex-col gap-6 pr-6">

        {/* Table Orders */}
        <section className="bg-background height-full w-full rounded-md p-4">
          <CustomerTable
            bookingInfo={bookings.map(booking => ({
              id: booking.id,
              date: booking.date,
              startTime: booking.startTime,
              status: booking.status,
              timeSlot: booking.startTime, // <-- timeSlot? not in your model
              notes: booking.notes,
              serviceName: booking.service?.name ?? "Unknown",
              serviceID: booking.service?.id,
              customer: {
                id: booking.customer.id,
                userId: booking.customer.userId ?? "No User ID for the customer",
                name: booking.customer.user?.name ?? "No Name",
                email: booking.customer.user?.email ?? "No Email",
                phoneNumber: booking.customer.phoneNumber ?? "No Phone Number",
                addressStreet: booking.customer.addressStreet ?? "No Street",
                addressCity: booking.customer.addressCity ?? "No City",
                addressState: booking.customer.addressState ?? "No State",
                addressZip: booking.customer.addressZip ?? "No Zip",
                preferredContactMethod: booking.customer.preferredContactMethod ?? "No contact method",
                squareFootage: booking.customer.squareFootage ?? "No square footage",
                rooms: booking.customer.rooms ?? "No rooms",
                createdAt: booking.customer.createdAt ?? "Nothing created",
                updatedAt: booking.customer.updatedAt ?? "Nothing updated"
              }, // <-- customer.name not in model
            }))}
          />
        </section>
      </main>
    </>
  );
}
