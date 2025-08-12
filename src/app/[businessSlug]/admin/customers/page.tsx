<<<<<<< HEAD
export default function Customers() {
  return <div>Customers page</div>;
=======
import React from "react";


import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "../../../../components/ui/button";
import { BookingStatus } from "prisma/generated";
import { Separator } from "../../../../components/ui/separator";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpdateStatusButton } from "../../../../components/UpdateStatusButton";

import CustomerTable from "@/app/[businessSlug]/admin/customers/customerTable";
import { getBookingsWithServiceAndCustomer } from "@/lib/queries/queries";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";




type Customer = {
  id: string;
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  addressStreet: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean
  createdAt: string;
  updatedAt: string;
  role: string;
}

type BookingInfo = {
  id: string;
  date: string;
  startTime: string;
  status: BookingStatus;
  timeSlot: string;
  notes: string | null;
  serviceName: string;
  serviceID: string;
  customer: Customer;
  user: User;
  //Add the type of what ever the invoice is, as something like pricing: Invoice; to lead into the invoice information.
};

type Invoice = {
  id: string;
  status: string;
  cardInfo: string;
  pricing: number;
};

type Props = {
  params: {
    businessSlug: string;
  };
};

// NEED TO MAKE IT TYPE SAFE
const colorMapping = {
  CONFIRMED: "bg-blue-600",
  PENDING: "bg-blue-400",
  IN_PROGRESS: "bg-purple-600",
  CANCELED: "bg-red-500",
  COMPLETED: "bg-green-500",
};

// DUMMY DATA
const InvoiceDummy = {
  invoiceNum: "1240-3219",
  datePaid: "Aug 1, 2025, 9:07:28 PM",
  cardType: "VISA",
  // description
  serviceType: "Cleaning Service: deepClean",
  quantity: 1,
  pricing: "214.00",
  // Total
  totalPaid: "214.00",
};

//GOOGLE MAPS FUNCTION
function openInGoogleMaps(address: string) {
  const url = `https://www.google.com/maps/place/${encodeURIComponent(address)}`;
  console.log(`Address passed:`, address);
  console.log(`URL Being Opened:`, url);
  window.open(url, "_blank"); // Opens in a new tab/window
}

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
            businessSlug={paramsAwait.businessSlug}
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
>>>>>>> bb65c11 (Added more customer data to the customer list page. Added a ternary check to await params only if it's a Promise)
}
