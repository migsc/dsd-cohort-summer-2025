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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";

//ADD DUMMY DATA HERE FOR NOW
const dummyAppointments = [
  {
    id: 1,
    dateCreated: "2023-10-01",
    timeCreated: "10:00 AM", //Could be taking the actual time of creation using javascript and formatting it.
    workOrderInfo: {
      orderId: 1001,
      status: "Pending",
      Type: "Cleaning",
      fulfillmentDate: "2023-10-05",
      fulfillmentTime: "2:00 PM",
      address: "123 Main St, Springfield, IL",
      description:
        "I have a kitchen and living room that needs to be cleaned. Please detail appliances and wash the carpet.",
    },
    customerInfo: {
      clientId: 101,
      clientName: "John Doe",
      clientPhone: "123-456-7890",
      clientEmail: "johndoe@gmail.com",
    },
  },
  {
    id: 2,
    dateCreated: "2023-10-02",
    timeCreated: "11:30 AM",
    workOrderInfo: {
      orderId: 1002,
      status: "Approved",
      Type: "Maintenance",
      fulfillmentDate: "2023-10-07",
      fulfillmentTime: "9:00 AM",
      address: "456 Oak Ave, Lincoln, NE",
      description: "Bathroom deep cleaning and window washing.",
    },
    customerInfo: {
      clientId: 102,
      clientName: "Jane Smith",
      clientPhone: "555-123-4567",
      clientEmail: "janesmith@email.com",
    },
  },
  {
    id: 3,
    dateCreated: "2023-10-03",
    timeCreated: "2:15 PM",
    workOrderInfo: {
      orderId: 1003,
      status: "Approved",
      Type: "Cleaning",
      fulfillmentDate: "2023-10-04",
      fulfillmentTime: "1:00 PM",
      address: "789 Pine Rd, Madison, WI",
      description: "Carpet cleaning in two bedrooms.",
    },
    customerInfo: {
      clientId: 103,
      clientName: "Carlos Rivera",
      clientPhone: "222-333-4444",
      clientEmail: "carlos.rivera@mail.com",
    },
  },
  {
    id: 4,
    dateCreated: "2023-10-04",
    timeCreated: "4:45 PM",
    workOrderInfo: {
      orderId: 1004,
      status: "Pending",
      Type: "Move-Out",
      fulfillmentDate: "2023-10-10",
      fulfillmentTime: "3:30 PM",
      address: "321 Maple St, Denver, CO",
      description: "Move-out cleaning for apartment.",
    },
    customerInfo: {
      clientId: 104,
      clientName: "Emily Chen",
      clientPhone: "777-888-9999",
      clientEmail: "emily.chen@email.com",
    },
  },
  {
    id: 5,
    dateCreated: "2023-10-05",
    timeCreated: "9:00 AM",
    workOrderInfo: {
      orderId: 1005,
      status: "Declined",
      Type: "Cleaning",
      fulfillmentDate: "2023-10-12",
      fulfillmentTime: "10:00 AM",
      address: "654 Cedar Blvd, Austin, TX",
      description: "Garage cleaning and power washing.",
    },
    customerInfo: {
      clientId: 105,
      clientName: "Michael Brown",
      clientPhone: "888-555-1212",
      clientEmail: "michael.brown@email.com",
    },
  },
];

// NEED TO MAKE IT TYPE SAFE
const colorMapping = {
  Approved: "bg-blue-600",
  Pending: "bg-blue-400",
  Declined: "bg-red-500",
  Cleaning: "bg-blue-300",
  Maintenance: "bg-yellow-500",
  "Move-Out": "bg-red-400",
};

export default function AppointmentTable({ filter }: { filter: string }) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyAppointments
            .filter(appointment => appointment.workOrderInfo.status === filter)
            .map(appointment => (
              <Sheet key={appointment.id}>
                <SheetTrigger asChild>
                  <TableRow
                    key={appointment.id}
                    className="hover:cursor-pointer"
                  >
                    <TableCell>{appointment.workOrderInfo.orderId}</TableCell>
                    <TableCell>{appointment.customerInfo.clientName}</TableCell>
                    <TableCell>
                      <Badge
                        variant="default"
                        className={`${colorMapping[appointment.workOrderInfo.Type as keyof typeof colorMapping] ?? "bg-gray-600"} text-xs text-white`}
                      >
                        {appointment.workOrderInfo.Type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {appointment.workOrderInfo.fulfillmentDate} at{" "}
                      {appointment.workOrderInfo.fulfillmentTime}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="default"
                        className={`${colorMapping[appointment.workOrderInfo.status as keyof typeof colorMapping]} text-xs text-white`}
                      >
                        {appointment.workOrderInfo.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="sm:max-w-1/2 m-5 h-[95%] w-full rounded-lg [&>button:first-of-type]:hidden"
                >
                  <SheetHeader>
                    <SheetTitle className="flex h-full pt-2">
                      <div className="flex w-[30%] h-full flex-col gap-4 border-r pr-4">
                        <h1 className="font-blod text-2xl">
                          {appointment.customerInfo.clientName}
                        </h1>
                        <h2 className="text-blue-600">
                          #{appointment.workOrderInfo.orderId}
                        </h2>
                      </div>
                      <div className="pl-4">
                        <p className="font-semibold text-gray-400 text-md">Order Details</p>
                      </div>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex h-full gap-4 p-4">
                    <div className="flex w-[30%] h-full flex-col gap-4 border-r pr-4">
                      <section className="flex flex-col gap-2">
                        <h3 className="font-bold">Contact Info</h3>
                        <p className="text-sm">
                          {appointment.customerInfo.clientPhone}
                        </p>
                        <p className="text-sm">
                          {appointment.customerInfo.clientEmail}
                        </p>
                      </section>
                    </div>
                    <div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm flex justify-between w-[150px]">
                                Status: <Badge
                        variant="default"
                        className={`${colorMapping[appointment.workOrderInfo.Type as keyof typeof colorMapping] ?? "bg-gray-600"} text-xs text-white`}>{appointment.workOrderInfo.status}</Badge>
                            </p>
                            <p className="text-sm flex justify-between w-[150px]">
                                Type: <Badge
                        variant="default"
                        className={`${colorMapping[appointment.workOrderInfo.Type as keyof typeof colorMapping] ?? "bg-gray-600"} text-xs text-white`}>{appointment.workOrderInfo.Type}</Badge>
                            </p>
                            <p className="text-sm flex justify-between w-[150px]">
                                Date: <span>{appointment.workOrderInfo.fulfillmentDate}</span>
                            </p>
                            <p className="text-sm flex justify-between w-[150px]">
                                Time: <span>{appointment.workOrderInfo.fulfillmentTime}</span>
                            </p>
                            <div>
                                <p className="text-sm flex justify-between w-full">
                                    Address: {" "}
                                    {appointment.workOrderInfo.address}
                                </p>
                                <div>
                                    <p>Here goes the google maps information</p>
                                </div>
                            </div>
                            <p className="text-sm flex flex-col w-full pb-4">
                                Description: <span>{appointment.workOrderInfo.description}</span>
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
                          <p>This appointment is approved.</p>
                          <Button
                            variant="default"
                            className="mt-1.5 w-full bg-yellow-600 text-white hover:bg-yellow-500"
                          >
                            Add to Calendar
                          </Button>
                        </div>
                      ) : (
                        <p className="mr-4 text-sm text-red-500">
                          This appointment has been declined.
                        </p>
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
