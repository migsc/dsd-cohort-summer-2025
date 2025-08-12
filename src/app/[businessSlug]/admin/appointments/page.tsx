import React from "react";
import AppointmentTable from "@/components/AppointmentTable";
import { getBookingsWithServiceAndCustomer } from "@/lib/queries/queries";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardFooter,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UpdateStatusButton } from "@/components/UpdateStatusButton";

type Props = {
  params: Promise<{ businessSlug: string }>;
};

export default async function Appointments({ params }: Props) {
  const paramsAwait = await params; //Params must await before being used
  const bookings = await getBookingsWithServiceAndCustomer(
    paramsAwait.businessSlug
  );

  if (!bookings || bookings.length === 0) {
    return <div>Business Not Found.</div>;
  }

  return (
    <>
      <header>
        <h1 className="text-3xl">Appointments</h1>
      </header>
      <Separator className="my-6" />

      <main className="flex flex-col gap-6 pr-6">
        {/* This section display the "In_Progress Orders" */}
        <section className="bg-secondary no-scrollbar flex h-80 gap-4 overflow-x-auto overflow-y-hidden rounded-xl p-4">
          {bookings
            .filter(booking => booking.status === "IN_PROGRESS")
            .map(booking => (
              <Card
                key={booking.id}
                className="w-xl bg-background h-full min-w-[20rem] rounded-xl"
              >
                <CardHeader>
                  <CardTitle>
                    <Badge variant="outline" className="mb-2 text-xl">
                      {booking.service.name}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    <div className="mb-6 flex w-full">
                      <div className="flex w-full gap-1">
                        <p className="font-semibold">Order#:</p>
                        <p className="text-primary">{booking.id}</p>
                      </div>
                      <div className="flex w-1/2 gap-1">
                        <p className="font-semibold">Status:</p>
                        <Badge variant="default" className="bg-purple-600">
                          {booking.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex w-full">
                      <div className="flex w-full gap-1">
                        <p className="font-semibold">Time:</p>
                        <p className="text-foreground">{booking.startTime}</p>
                      </div>
                      <div className="flex w-1/2 gap-1">
                        <p className="font-semibold">Date:</p>
                        <p className="text-foreground">{booking.date}</p>
                      </div>
                    </div>
                  </CardDescription>
                  <Separator className="my-2" />
                  <CardContent className="flex items-stretch p-0">
                    <div className="w-1/2">
                      <h2 className=" text-primary mb-2 text-xl">
                        {booking.customer.user.name}
                      </h2>
                      <p className="text-xs text-gray-400">
                        {booking.customer.id}
                      </p>
                      <p className="text-xs text-gray-400">
                        {booking.customer.user.email}
                      </p>
                      <p className="text-xs text-gray-400">
                        {booking.customer.phoneNumber ?? "No Phone"}
                      </p>
                    </div>
                    <div className="flex w-full items-end justify-end">
                      <UpdateStatusButton
                        newStatus="COMPLETED"
                        bookingId={booking.id}
                        currentStatus={booking.status}
                        businessSlug={paramsAwait.businessSlug}
                      />
                    </div>
                  </CardContent>
                </CardHeader>
              </Card>
            ))}
        </section>

        {/* Table Orders */}
        <section className="bg-background height-full w-full rounded-md p-4">
          <AppointmentTable
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
                name: booking.customer.user?.name ?? "No Name",
                email: booking.customer.user?.email ?? "No Email",
                phoneNumber: booking.customer.phoneNumber ?? "No Phone Number",
                addressStreet: booking.customer.addressStreet ?? "No Street",
                addressCity: booking.customer.addressCity ?? "No City",
                addressState: booking.customer.addressState ?? "No State",
                addressZip: booking.customer.addressZip ?? "No Zip",
              }, // <-- customer.name not in model
            }))}
          />
        </section>
      </main>
    </>
  );
}
