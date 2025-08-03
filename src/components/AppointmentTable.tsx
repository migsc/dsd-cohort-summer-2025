"use client"

import React from "react";


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
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";

//ADD DUMMY DATA HERE FOR NOW
// const dummyAppointments = [
//   {
//     id: 1,
//     dateCreated: "2023-10-01",
//     timeCreated: "10:00 AM", //Could be taking the actual time of creation using javascript and formatting it.
//     workOrderInfo: {
//       orderId: 1001,
//       status: "Pending",
//       Type: "Cleaning",
//       fulfillmentDate: "2023-10-05",
//       fulfillmentTime: "2:00 PM",
//       address: "123 Main St, Springfield, IL",
//       description:
//         "I have a kitchen and living room that needs to be cleaned. Please detail appliances and wash the carpet.",
//     },
//     customerInfo: {
//       clientId: 101,
//       clientName: "John Doe",
//       clientPhone: "123-456-7890",
//       clientEmail: "johndoe@gmail.com",
//     },
//   },
//   {
//     id: 2,
//     dateCreated: "2023-10-02",
//     timeCreated: "11:30 AM",
//     workOrderInfo: {
//       orderId: 1002,
//       status: "Approved",
//       Type: "Maintenance",
//       fulfillmentDate: "2023-10-07",
//       fulfillmentTime: "9:00 AM",
//       address: "456 Oak Ave, Lincoln, NE",
//       description: "Bathroom deep cleaning and window washing.",
//     },
//     customerInfo: {
//       clientId: 102,
//       clientName: "Jane Smith",
//       clientPhone: "555-123-4567",
//       clientEmail: "janesmith@email.com",
//     },
//   },
//   {
//     id: 3,
//     dateCreated: "2023-10-03",
//     timeCreated: "2:15 PM",
//     workOrderInfo: {
//       orderId: 1003,
//       status: "Approved",
//       Type: "Cleaning",
//       fulfillmentDate: "2023-10-04",
//       fulfillmentTime: "1:00 PM",
//       address: "789 Pine Rd, Madison, WI",
//       description: "Carpet cleaning in two bedrooms.",
//     },
//     customerInfo: {
//       clientId: 103,
//       clientName: "Carlos Rivera",
//       clientPhone: "222-333-4444",
//       clientEmail: "carlos.rivera@mail.com",
//     },
//   },
//   {
//     id: 4,
//     dateCreated: "2023-10-04",
//     timeCreated: "4:45 PM",
//     workOrderInfo: {
//       orderId: 1004,
//       status: "Pending",
//       Type: "Move-Out",
//       fulfillmentDate: "2023-10-10",
//       fulfillmentTime: "3:30 PM",
//       address: "321 Maple St, Denver, CO",
//       description: "Move-out cleaning for apartment.",
//     },
//     customerInfo: {
//       clientId: 104,
//       clientName: "Emily Chen",
//       clientPhone: "777-888-9999",
//       clientEmail: "emily.chen@email.com",
//     },
//   },
//   {
//     id: 5,
//     dateCreated: "2023-10-05",
//     timeCreated: "9:00 AM",
//     workOrderInfo: {
//       orderId: 1005,
//       status: "Declined",
//       Type: "Cleaning",
//       fulfillmentDate: "2023-10-12",
//       fulfillmentTime: "10:00 AM",
//       address: "654 Cedar Blvd, Austin, TX",
//       description: "Garage cleaning and power washing.",
//     },
//     customerInfo: {
//       clientId: 105,
//       clientName: "Michael Brown",
//       clientPhone: "888-555-1212",
//       clientEmail: "michael.brown@email.com",
//     },
//   },
// ];

type Customer = {
  id: string
  name: string
  email: string
  phone: string
}
type Booking = {
  id: string;
  date: string;
  timeSlot: string;
  serviceName: string;
  status: string;
  notes: string | null;
  serviceId: string;
  customer: Customer;
}

type Props = {
  filter: string
  bookingInfo: Booking[];
}
// NEED TO MAKE IT TYPE SAFE
const colorMapping = {
  CONFIRMED: "bg-blue-600",
  PENDING: "bg-blue-400",
  CANCELLED: "bg-red-500",
  COMPLETED: "bg-green-500",
  Cleaning: "bg-blue-300",
  Maintenance: "bg-yellow-500",
  "Move-Out": "bg-red-400",
};

export default function AppointmentTable({filter, bookingInfo}: Props) {

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="border-b-gray-400 hover:bg-white">
            <TableHead>Order ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookingInfo
            .map(booking => (
              <Sheet key={booking.id}>
                <SheetTrigger asChild>
                  <TableRow
                    key={booking.id}
                    className="hover:cursor-pointer border-b-gray-100"
                  >
                    <TableCell>{booking.id}</TableCell>
                    <TableCell>{booking.customer.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant="default"
                        className={`${colorMapping[booking.serviceName as keyof typeof colorMapping] ?? "bg-gray-600"} text-xs text-white`}
                      >
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

                {/* //TODO: Also change the sheet to be dynamic based on whether it is a profile or an appointment/work order. */}
                <SheetContent
                  side="right"
                  className="sm:max-w-1/2 m-5 h-[95%] w-full rounded-lg [&>button:first-of-type]:hidden"
                >
                  <SheetHeader>
                    <SheetTitle className="flex h-full pt-2">
                      <div className="flex h-full w-[30%] flex-col gap-4 border-r pr-4">
                        <h1 className="font-blod text-2xl">
                          {booking.customer.name}
                        </h1>
                        <h2 className="text-blue-600">
                          #{booking.serviceId}
                        </h2>
                      </div>
                      <div className="pl-4">
                        <p className="text-md font-semibold text-gray-400">
                          Order Details
                        </p>
                      </div>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex h-full gap-4 p-4">
                    <div className="flex h-full w-[30%] flex-col gap-4 border-r pr-4">
                      <section className="flex flex-col gap-2">
                        <h3 className="font-bold">Contact Info</h3>
                        <p className="text-sm">
                          {booking.customer.phone}
                        </p>
                        <p className="text-sm">
                          {booking.customer.email}
                        </p>
                      </section>
                    </div>
                    <div>
                      <div className="flex flex-col gap-2">
                        <p className="flex w-[150px] justify-between text-sm">
                          Status:{" "}
                          <Badge
                            variant="default"
                            className={`${colorMapping[booking.status as keyof typeof colorMapping] ?? "bg-gray-600"} text-xs text-white`}
                          >
                            {booking.status}
                          </Badge>
                        </p>
                        <p className="flex w-[150px] justify-between text-sm">
                          Type:{" "}
                          <Badge
                            variant="default"
                            className={`${colorMapping[booking.serviceName as keyof typeof colorMapping] ?? "bg-gray-600"} text-xs text-white`}
                          >
                            {booking.serviceName}
                          </Badge>
                        </p>
                        <p className="flex w-[150px] justify-between text-sm">
                          Date:{" "}
                          <span>
                            {booking.date}
                          </span>
                        </p>
                        <p className="flex w-[150px] justify-between text-sm">
                          Time:{" "}
                          <span>
                            {booking.timeSlot}
                          </span>
                        </p>
                        <div>
                          <p className="flex w-full justify-between text-sm">
                            Address: here going the address. {/* {booking.address} */}
                          </p>
                          <div>
                            <p>Here goes the google maps information</p>
                          </div>
                        </div>
                        <p className="flex w-full flex-col pb-4 text-sm">
                          Description:{" "}
                          <span>{booking.notes ?? "No Notes"}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <SheetFooter className="border-t">
                    {/* each one should have a function that when you click it it ends up changing the status from pendnig to another status.*/}
                    <div className="flex justify-end">
                      {filter === "Pending" ? (
                        <div>
                          <Button
                            variant="default"
                            className="w-[130px] bg-blue-600 text-white hover:bg-blue-500"
                          >
                            Accept
                          </Button>
                          <Button
                            variant="default"
                            className="ml-2 w-[130px] bg-red-500 text-white hover:bg-red-400"
                          >
                            Decline
                          </Button>
                        </div>
                      ) : filter === "Approved" ? (
                        <div className="mr-4 text-sm text-gray-500">
                          <p className="text-blue-600">
                            This appointment is approved.
                          </p>
                        </div>
                      ) : filter === "Decline" ? (
                        <p className="mr-4 text-sm text-red-500">
                          This appointment has been declined.
                        </p>
                      ) : (
                        <div>
                          <Button
                            variant="default"
                            className="w-[130px] bg-blue-600 text-white hover:bg-blue-500"
                          >
                            Accept
                          </Button>
                          <Button
                            variant="default"
                            className="ml-2 w-[130px] bg-red-500 text-white hover:bg-red-400"
                          >
                            Decline
                          </Button>
                        </div>
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

