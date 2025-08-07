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
import { Button, buttonVariants } from "./ui/button";
import { BookingStatus } from "prisma/generated";
import { Separator } from "./ui/separator";

type Customer = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  addressStreet: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
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
  filter: string;
  bookingInfo: BookingInfo[]; // ✅ Not Booking[]
};
// NEED TO MAKE IT TYPE SAFE
const colorMapping = {
  CONFIRMED: "bg-blue-600",
  PENDING: "bg-blue-400",
  IN_PROGRESS: "bg-purple-600",
  CANCELLED: "bg-red-500",
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

export default function AppointmentTable({ filter, bookingInfo }: Props) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="border-b-gray-300 hover:bg-white">
            <TableHead>Customer Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookingInfo
            // .filter(booking => booking.status === filter)
            .map(booking => (
              <Sheet key={booking.id}>
                <SheetTrigger asChild>
                  <TableRow
                    key={booking.id}
                    className="h-11 border-b-gray-100 hover:cursor-pointer"
                  >
                    <TableCell>{booking.customer.name}</TableCell>
                    <TableCell>{booking.customer.phoneNumber}</TableCell>
                    <TableCell>{booking.customer.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {booking.serviceName}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {booking.date} at {booking.timeSlot}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="default"
                        className={`${colorMapping[booking.status as keyof typeof colorMapping]} text-xs text-white`}
                      >
                        {booking.status}
                      </Badge>
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
                        <p>{booking.customer.id}</p>
                        <a
                          href={`tel: ${booking.customer.phoneNumber}`}
                          className="hover:text-primary"
                        >
                          {booking.customer.phoneNumber}
                        </a>
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
                  <div className="px-5">
                    {/* Order details title */}
                    <h2 className="text-foreground mb-4 text-xl font-bold">
                      Order Details
                    </h2>
                    {/* Order details section */}
                    <div className="min-w-2xs flex w-full flex-col gap-3 text-left text-sm">
                      <div className="flex w-full gap-3">
                        <p className="w-16 font-semibold">Order#:</p>
                        <p>{booking.serviceID}</p>
                      </div>
                      <div className="flex w-full gap-3">
                        <p className="w-16 font-semibold">Status:</p>
                        <Badge
                          variant="default"
                          className={`${colorMapping[booking.status as keyof typeof colorMapping] ?? "bg-gray-600"} text-xs text-white`}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="flex w-full gap-3">
                        <p className="w-16 font-semibold">Type:</p>
                        <Badge variant="outline" className="text-xs">
                          {booking.serviceName}
                        </Badge>
                      </div>
                      <div className="flex w-full gap-3">
                        <p className="w-16 font-semibold">Date:</p>
                        <p>{booking.date}</p>
                      </div>

                      <div className="flex w-full gap-3">
                        <p className="w-16 font-semibold">Time:</p>
                        <p>{booking.timeSlot}</p>
                      </div>

                      <div>
                        <div className="mb-4 flex w-full gap-3">
                          <p className="w-16 font-semibold">Address:</p>
                          <p>{`${booking.customer.addressStreet}, ${booking.customer.addressCity}, ${booking.customer.addressState}, ${booking.customer.addressZip}`}</p>
                        </div>
                        <Button
                          className={`${buttonVariants({ variant: "outline" })}`}
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
                      <div className="my-2 flex w-full flex-col gap-3">
                        <p className="w-16 font-semibold">Description:</p>
                        <p>{booking.notes}</p>
                      </div>
                    </div>
                    <Separator className="mt-10" />
                    <div className="mt-2 w-full">
                      {/* Payment Accordian */}
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="1">
                          <AccordionTrigger>
                            Payment Information
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="mb-4 flex justify-between w-full">
                              <p className="w-16 font-semibold text-primary">Invoice#</p>
                              <p>{InvoiceDummy.invoiceNum}</p>
                            </div>
                            <div className="mb-4 flex justify-between w-full">
                              <p className="w-16 font-semibold text-primary">Date:</p>
                              <p>{InvoiceDummy.datePaid}</p>
                            </div>
                            <div className="mb-4 flex justify-between w-full">
                              <p className="w-16 font-semibold text-primary">Type:</p>
                              <p>{InvoiceDummy.cardType}</p>
                            </div>
                            <div className="mb-4 flex justify-between w-full">
                              <p className="w-16 font-semibold text-primary">Date:</p>
                              <p>{InvoiceDummy.datePaid}</p>
                            </div>
                            <div className="mb-4 flex justify-between w-full">
                              <p className="w-16 font-semibold text-primary">Service:</p>
                              <p>{InvoiceDummy.serviceType}</p>
                            </div>
                            <div className="mb-4 flex justify-between w-full">
                              <p className="w-16 font-semibold text-primary">Qty:</p>
                              <p>{InvoiceDummy.quantity}</p>
                            </div>
                            <div className="mb-4 flex justify-between w-full">
                              <p className="w-16 font-semibold text-primary">Pricing:</p>
                              <p>{InvoiceDummy.pricing}</p>
                            </div>
                            <Separator />
                            <div className="my-4 flex justify-between w-full">
                              <p className="w-16 font-semibold text-primary">Total:</p>
                              <p>{InvoiceDummy.totalPaid}</p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                  <SheetFooter className="h-40 border-t">
                    <div className="flex flex-col items-center justify-center gap-4">
                      {booking.status === "PENDING" ? (
                        <>
                          <Button variant="default" className="w-full">
                            Accept
                          </Button>
                          <Button variant="destructive" className="w-full">
                            Decline
                          </Button>
                        </>
                      ) : (
                        " "
                      )}
                    </div>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
