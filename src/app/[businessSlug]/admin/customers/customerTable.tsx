"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBookingsWithServiceAndCustomer } from "@/lib/queries/queries"; // THIS NEEDS TO BE A CUSTOMER ONE
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { BookingStatus } from "prisma/generated";
import { useState } from "react";
import { Map } from "lucide-react";
import { UpdateStatusButton } from "../../../../components/UpdateStatusButton";

/* TODO:
1. Make sure database is connected to this might be able to use the same database for getting bookings with service and customer but not sure.
2. this works like the sheet in the appointments page almost idenical but just focused on the customer data. 
3. On the sheet we will add another smaller table and this will be the booking table infomraiton but this time indeas of opening on the side when clicked we will be able to view information of the booking order as a dialog box.
*/

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
  bookingInfo: BookingInfo[]; // ✅ Not Booking[]
};

//GOOGLE MAPS FUNCTION
function openInGoogleMaps(address: string) {
  const url = `https://www.google.com/maps/place/${encodeURIComponent(address)}`;
  console.log(`Address passed:`, address);
  console.log(`URL Being Opened:`, url);
  window.open(url, "_blank"); // Opens in a new tab/window
}

export default function CustomerTable({ bookingInfo }: Props) {
  return (
    <div>
      {/* Tabs to switch filters */}

      <Table>
        <TableHeader>
          <TableRow className="border-b-gray-300 hover:bg-white">
            <TableHead>Customer Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Created On</TableHead>
            <TableHead>Last Updated On</TableHead>
            <TableHead>Most Recent Booking</TableHead>
            <TableHead>Most Recent Booking Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookingInfo.map(booking => (
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
                    <Badge variant="secondary" className="bg-blue-100 text-xs">
                      {booking.customer.createdAt.toISOString().slice(0, 10)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {booking.customer.createdAt.toISOString().slice(0, 10)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {booking.serviceName}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {booking.date}
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
                    <div className="min-w-2xs text-sml flex w-full flex-col gap-3 text-left">
                      <p className="text-muted-foreground flex flex-col gap-2 text-sm font-normal">
                        ID: {booking.customer.id}
                      </p>
                    </div>
                  </SheetTitle>
                  <Separator className="mt-4" />
                </SheetHeader>
                <div className="no-scrollbar overflow-y-scroll px-5">
                  {/* Customer details title */}
                  <p className="text-accent-foreground text-[1rem] mb-2 font-semibold">
                    Customer Details
                  </p>

                  {/* Customer details section */}
                  <div className="min-w-2xs flex w-full flex-col gap-3 text-left text-sm">
                    <div className="flex gap-2 text-sm font-normal">
                      <p className="w-16 text-muted-foreground">Email:</p>
                      <a
                        href={`mailto:${booking.customer.email}`}
                        className="hover:text-primary"
                      >
                        {booking.customer.email}
                      </a>
                    </div>
                    <div className="flex w-full gap-3">
                      <p className="w-16 text-muted-foreground">Phone:</p>
                      <a
                        href={`tel: ${booking.customer.phoneNumber}`}
                        className="hover:text-primary"
                      >
                        {booking.customer.phoneNumber}
                      </a>
                    </div>

                    <div className="flex w-full gap-3">
                      <p className="w-16 text-muted-foreground">Created:</p>
                      <Badge variant="outline" className="bg-blue-100 text-xs">
                        {`${booking.customer.createdAt.toISOString().slice(0, 10)} ${booking.customer.createdAt.toISOString().slice(11, 19)}`}
                      </Badge>
                    </div>

                    <div className="flex w-full gap-3">
                      <p className="w-16 text-muted-foreground">Updated:</p>
                      <Badge variant="secondary" className="text-xs">
                        {`${booking.customer.createdAt.toISOString().slice(0, 10)} ${booking.customer.createdAt.toISOString().slice(11, 19)}`}
                      </Badge>
                    </div>

                    <p className="text-accent-foreground mt-4 text-[1rem] font-semibold">
                      Address Information
                    </p>
                    <div>
                      <div className="mb-4 flex w-full gap-3">
                        <p className="w-16 text-muted-foreground">Address:</p>
                        <p>{`${booking.customer.addressStreet}, ${booking.customer.addressCity}, ${booking.customer.addressState}, ${booking.customer.addressZip}`}</p>
                      </div>
                      <div className="mb-4 flex w-full gap-3">
                        <p className="w-16 text-muted-foreground">Rooms:</p>
                        
                        <Badge variant="outline" className="text-xs">{booking.customer.rooms}</Badge>
                      </div>
                      <div className="mb-6 flex w-full gap-3">
                        <p className="w-16 text-muted-foreground">SQFT:</p>
                        <p>{booking.customer.squareFootage}</p>
                      </div>
                      <Button
                        variant="outline"
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
                  
                </div>
              </SheetContent>
            </Sheet>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
