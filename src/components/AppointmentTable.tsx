"use client";

import React from "react";
import { Map } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

import { Badge } from "@/components/ui/badge";
<<<<<<< HEAD:src/components/AppointmentTable.tsx
import { Button, buttonVariants } from "./ui/button";
import { BookingStatus } from "prisma/generated";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpdateStatusButton } from "./UpdateStatusButton";
=======
import { Button } from "@/components/ui/button";
import { getBookingsWithServiceAndCustomer } from "@/lib/queries/queries"; // THIS NEEDS TO BE A CUSTOMER ONE
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { BookingStatus } from "prisma/generated";
import { useState } from "react";
import { Map } from "lucide-react"
import { UpdateStatusButton } from "../../../../components/UpdateStatusButton";
<<<<<<< HEAD:src/components/AppointmentTable.tsx
>>>>>>> bb65c11 (Added more customer data to the customer list page. Added a ternary check to await params only if it's a Promise):src/app/[businessSlug]/admin/customers/customerTable.tsx
=======
>>>>>>> bb65c11 (Added more customer data to the customer list page. Added a ternary check to await params only if it's a Promise):src/app/[businessSlug]/admin/customers/customerTable.tsx


type Customer = {
  id: string;
<<<<<<< HEAD:src/components/AppointmentTable.tsx
=======
  userId: string;
>>>>>>> bb65c11 (Added more customer data to the customer list page. Added a ternary check to await params only if it's a Promise):src/app/[businessSlug]/admin/customers/customerTable.tsx
  name: string;
  email: string;
  phoneNumber: string;
  addressStreet: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
<<<<<<< HEAD:src/components/AppointmentTable.tsx
};

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
  //Add the type of what ever the invoice is, as something like pricing: Invoice; to lead into the invoice information.
};

type Invoice = {
  id: string;
  status: string;
  cardInfo: string;
  pricing: number;
};

type Props = {
  businessSlug: string;
  bookingInfo: BookingInfo[]; // ✅ Not Booking[]
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

=======
  preferredContactMethod: string;
  squareFootage: number;
  rooms: number;
  createdAt: Date;
  updatedAt: Date;
};

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
  //Add the type of what ever the invoice is, as something like pricing: Invoice; to lead into the invoice information.
};

type Props = {
  businessSlug: string;
  bookingInfo: BookingInfo[]; // ✅ Not Booking[]
};



// NEED TO MAKE IT TYPE SAFE
const colorMapping = {
  CONFIRMED: "bg-blue-600",
  PENDING: "bg-blue-400",
  IN_PROGRESS: "bg-purple-600",
  CANCELED: "bg-red-500",
  COMPLETED: "bg-green-500",
};

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
  preferredContactMethod: string;
  squareFootage: number;
  rooms: number;
  createdAt: Date;
  updatedAt: Date;
};

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
  //Add the type of what ever the invoice is, as something like pricing: Invoice; to lead into the invoice information.
};

type Props = {
  businessSlug: string;
  bookingInfo: BookingInfo[]; // ✅ Not Booking[]
};



// NEED TO MAKE IT TYPE SAFE
const colorMapping = {
  CONFIRMED: "bg-blue-600",
  PENDING: "bg-blue-400",
  IN_PROGRESS: "bg-purple-600",
  CANCELED: "bg-red-500",
  COMPLETED: "bg-green-500",
};

const InvoiceDummy = {
  invoiceNum: "INV-001",
  datePaid: "2024-06-01",
  cardType: "Visa",
  serviceType: "General Cleaning",
  quantity: 1,
  pricing: "$100",
  totalPaid: "$100"
};

<<<<<<< HEAD:src/components/AppointmentTable.tsx
>>>>>>> bb65c11 (Added more customer data to the customer list page. Added a ternary check to await params only if it's a Promise):src/app/[businessSlug]/admin/customers/customerTable.tsx
=======
>>>>>>> bb65c11 (Added more customer data to the customer list page. Added a ternary check to await params only if it's a Promise):src/app/[businessSlug]/admin/customers/customerTable.tsx
//GOOGLE MAPS FUNCTION
function openInGoogleMaps(address: string) {
  const url = `https://www.google.com/maps/place/${encodeURIComponent(address)}`;
  console.log(`Address passed:`, address);
  console.log(`URL Being Opened:`, url);
  window.open(url, "_blank"); // Opens in a new tab/window
}

<<<<<<< HEAD:src/components/AppointmentTable.tsx
<<<<<<< HEAD:src/components/AppointmentTable.tsx
export default function AppointmentTable({ bookingInfo, businessSlug }: Props) {

  const [filter, setFilter] = useState("CONFIRMED"); // default tab

  let router
=======
export default function CustomerTable({ bookingInfo, businessSlug }: Props) {

  const [filter, setFilter] = useState("CONFIRMED");
>>>>>>> bb65c11 (Added more customer data to the customer list page. Added a ternary check to await params only if it's a Promise):src/app/[businessSlug]/admin/customers/customerTable.tsx
=======
export default function CustomerTable({ bookingInfo, businessSlug }: Props) {

  const [filter, setFilter] = useState("CONFIRMED");
>>>>>>> bb65c11 (Added more customer data to the customer list page. Added a ternary check to await params only if it's a Promise):src/app/[businessSlug]/admin/customers/customerTable.tsx

  return (
    
    <div>
      {/* Tabs to switch filters */}
<<<<<<< HEAD:src/components/AppointmentTable.tsx
<<<<<<< HEAD:src/components/AppointmentTable.tsx
      <section className="mb-4">
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList>
            <TabsTrigger value="CONFIRMED">Confirmed</TabsTrigger>
            <TabsTrigger value="PENDING">Pending</TabsTrigger>
            <TabsTrigger value="CANCELED">Canceled</TabsTrigger>
            <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </section>
=======
>>>>>>> bb65c11 (Added more customer data to the customer list page. Added a ternary check to await params only if it's a Promise):src/app/[businessSlug]/admin/customers/customerTable.tsx
=======
>>>>>>> bb65c11 (Added more customer data to the customer list page. Added a ternary check to await params only if it's a Promise):src/app/[businessSlug]/admin/customers/customerTable.tsx

      <Table>
        <TableHeader>
          <TableRow className="border-b-gray-300 hover:bg-white">
            <TableHead>Customer Name</TableHead>
<<<<<<< HEAD:src/components/AppointmentTable.tsx
<<<<<<< HEAD:src/components/AppointmentTable.tsx
            <TableHead>Phone Number</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Status</TableHead>
=======
=======
>>>>>>> bb65c11 (Added more customer data to the customer list page. Added a ternary check to await params only if it's a Promise):src/app/[businessSlug]/admin/customers/customerTable.tsx
            <TableHead>Preferred Contact Method</TableHead>
            <TableHead>Square Footage</TableHead>
            <TableHead>Rooms</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
<<<<<<< HEAD:src/components/AppointmentTable.tsx
>>>>>>> bb65c11 (Added more customer data to the customer list page. Added a ternary check to await params only if it's a Promise):src/app/[businessSlug]/admin/customers/customerTable.tsx
=======
>>>>>>> bb65c11 (Added more customer data to the customer list page. Added a ternary check to await params only if it's a Promise):src/app/[businessSlug]/admin/customers/customerTable.tsx
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookingInfo
            .filter(booking => booking.status === filter)
            .map(booking => (
              <Sheet key={booking.id}>
                <SheetTrigger asChild>
                  <TableRow
                    key={booking.id}
                    className="h-11 border-b-gray-100 hover:cursor-pointer"
                  >
                    <TableCell>{booking.customer.name}</TableCell>
                    <TableCell>{booking.customer.preferredContactMethod}</TableCell>
                    <TableCell>{booking.customer.squareFootage}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {booking.customer.rooms}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {booking.customer.createdAt.toISOString().slice(11, 19)}
                    </TableCell>
                    <TableCell>
                        {booking.customer.updatedAt.toISOString().slice(11, 19)}
                    </TableCell>
                  </TableRow>
                </SheetTrigger>

                {/* POP UP SHEET FROM SIDE */}
                <SheetContent
                  side="right"
                  className=" w-full rounded-lg border-b-0 [&>button:first-of-type]:hidden"
                >
                  <SheetHeader>
                    {/* Sheet title with customer Name, Phone number, customer id, and email. */}
                    <SheetTitle>
                      <span className="font-blod text-primary mb-2 text-2xl">
                        {booking.customer.name}
                      </span>
                      <div className="text-muted-foreground flex flex-col gap-2 text-sm font-normal">
                        <a
                          href={`mailto:${booking.customer.email}`}
                          className="hover:text-primary"
                        >
                          {booking.customer.email}
                        </a>
                      </div>
                    </SheetTitle>
                    <Separator className="mt-4" />
                  </SheetHeader>
<<<<<<< HEAD:src/components/AppointmentTable.tsx
<<<<<<< HEAD:src/components/AppointmentTable.tsx
                  <div className="overflow-y-scroll no-scrollbar px-5">
                    {/* Order details title */}
=======
                  <div className="no-scrollbar overflow-y-scroll px-5">
                    {/* Customer details title */}
>>>>>>> bb65c11 (Added more customer data to the customer list page. Added a ternary check to await params only if it's a Promise):src/app/[businessSlug]/admin/customers/customerTable.tsx
=======
                  <div className="no-scrollbar overflow-y-scroll px-5">
                    {/* Customer details title */}
>>>>>>> bb65c11 (Added more customer data to the customer list page. Added a ternary check to await params only if it's a Promise):src/app/[businessSlug]/admin/customers/customerTable.tsx
                    <h2 className="text-foreground mb-4 text-xl font-bold">
                      Customer Details
                    </h2>
                    {/* Customer details section */}
                    <div className="min-w-2xs flex w-full flex-col gap-3 text-left text-sm">
                      <div className="flex w-full gap-3">
                        <p className="w-16 font-semibold">Customer Id:</p>
                        <p>{booking.customer.userId}</p>
                      </div>
                      
                      <div className="flex w-full gap-3">
                        <p className="w-16 font-semibold">Customer Name:</p>
                        <p>{booking.customer.name}</p>
                      </div>

                      <div className="flex w-full gap-3">
                        <p className="w-16 font-semibold">Preferred Contact Method:</p>
                        <p>{booking.customer.preferredContactMethod}</p>
                      </div>

                      <div className="flex w-full gap-3">
                        <p className="w-16 font-semibold">Square Footage:</p>
                        <p>{booking.customer.squareFootage}</p>
                      </div>

                      <div className="flex w-full gap-3">
                        <p className="w-16 font-semibold">Created:</p>
                        <p>{booking.customer.createdAt.toISOString().slice(11, 19)}</p>
                      </div>

                      <div className="flex w-full gap-3">
                        <p className="w-16 font-semibold">Updated:</p>
                        <p>{booking.customer.updatedAt.toISOString().slice(11, 19)}</p>
                      </div>

                      <div>
                        <div className="mb-4 flex w-full gap-3">
                          <p className="w-16 font-semibold">Address:</p>
                          <p>{`${booking.customer.addressStreet}, ${booking.customer.addressCity}, ${booking.customer.addressState}, ${booking.customer.addressZip}`}</p>
                        </div>
                        <Button variant= "outline"
                          // This send the addresss to the openInGoogleMaps function to be able to then search.
                          onClick={() => {
                            if (booking.customer) {
                              const address = `${booking.customer.addressStreet}, ${booking.customer.addressCity}, ${booking.customer.addressState} ${booking.customer.addressZip}`;
                              openInGoogleMaps(address);
                            }
                          }}
                        >
                          <Map />
                          Open In Google Maps
                        </Button>
                      </div>
                    </div>
                    <Separator className="mt-10" />
                    <div className="mt-2 w-full">
<<<<<<< HEAD:src/components/AppointmentTable.tsx
<<<<<<< HEAD:src/components/AppointmentTable.tsx

                      {/* Payment Accordian */}
=======
                      * Payment Accordian 
>>>>>>> bb65c11 (Added more customer data to the customer list page. Added a ternary check to await params only if it's a Promise):src/app/[businessSlug]/admin/customers/customerTable.tsx
=======
                      * Payment Accordian 
>>>>>>> bb65c11 (Added more customer data to the customer list page. Added a ternary check to await params only if it's a Promise):src/app/[businessSlug]/admin/customers/customerTable.tsx
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="1">
                          <AccordionTrigger>
                            Payment Information
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="mb-4 flex w-full justify-between">
                              <p className="text-primary w-16 font-semibold">
                                Invoice#
                              </p>
                              <p>{InvoiceDummy.invoiceNum}</p>
                            </div>
                            <div className="mb-4 flex w-full justify-between">
                              <p className="text-primary w-16 font-semibold">
                                Date:
                              </p>
                              <p>{InvoiceDummy.datePaid}</p>
                            </div>
                            <div className="mb-4 flex w-full justify-between">
                              <p className="text-primary w-16 font-semibold">
                                Type:
                              </p>
                              <p>{InvoiceDummy.cardType}</p>
                            </div>
                            <div className="mb-4 flex w-full justify-between">
                              <p className="text-primary w-16 font-semibold">
                                Date:
                              </p>
                              <p>{InvoiceDummy.datePaid}</p>
                            </div>
                            <div className="mb-4 flex w-full justify-between">
                              <p className="text-primary w-16 font-semibold">
                                Service:
                              </p>
                              <p>{InvoiceDummy.serviceType}</p>
                            </div>
                            <div className="mb-4 flex w-full justify-between">
                              <p className="text-primary w-16 font-semibold">
                                Qty:
                              </p>
                              <p>{InvoiceDummy.quantity}</p>
                            </div>
                            <div className="mb-4 flex w-full justify-between">
                              <p className="text-primary w-16 font-semibold">
                                Pricing:
                              </p>
                              <p>{InvoiceDummy.pricing}</p>
                            </div>
                            <Separator />
                            <div className="my-4 flex w-full justify-between">
                              <p className="text-primary w-16 font-semibold">
                                Total:
                              </p>
                              <p>{InvoiceDummy.totalPaid}</p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
<<<<<<< HEAD:src/components/AppointmentTable.tsx
<<<<<<< HEAD:src/components/AppointmentTable.tsx
                  <SheetFooter className="h-fit border-t">
                    <div>
                      {booking.status === "PENDING" ? (
                        <div className="flex flex-col gap-3">
                          <UpdateStatusButton newStatus="CONFIRMED" bookingId={booking.id} currentStatus={booking.status} businessSlug={businessSlug} />
                          <UpdateStatusButton newStatus="CANCELED" bookingId={booking.id} currentStatus={booking.status} businessSlug={businessSlug}/>
                        </div>
                        // add the choice to be able to change that state to inprogress "Start Work Order"
                      ) : booking.status === "CONFIRMED" ? (
                        <UpdateStatusButton newStatus="IN_PROGRESS" bookingId={booking.id} currentStatus={booking.status} businessSlug={businessSlug}/>
                      ) : " "}
                    </div>
                  </SheetFooter>
=======
>>>>>>> bb65c11 (Added more customer data to the customer list page. Added a ternary check to await params only if it's a Promise):src/app/[businessSlug]/admin/customers/customerTable.tsx
=======
>>>>>>> bb65c11 (Added more customer data to the customer list page. Added a ternary check to await params only if it's a Promise):src/app/[businessSlug]/admin/customers/customerTable.tsx
                </SheetContent>
              </Sheet>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
