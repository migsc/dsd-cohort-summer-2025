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
import { getBookingsWithServiceAndCustomer } from "@/lib/queries/queries";

/* TODO:
1. Make sure database is connected to this might be able to use the same database for getting bookings with service and customer but not sure.
2. this works like the sheet in the appointments page almost idenical but just focused on the customer data. 
3. On the sheet we will add another smaller table and this will be the booking table infomraiton but this time indeas of opening on the side when clicked we will be able to view information of the booking order as a dialog box.
*/

export const customerTable = () => {
  return (
    <div>
      {/* Tabs to switch filters */}
      <section className="mb-4">
        {/* Use this to toggle between  */}
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList>
            <TabsTrigger value="CONFIRMED">Confirmed</TabsTrigger>
            <TabsTrigger value="PENDING">Pending</TabsTrigger>
            <TabsTrigger value="CANCELLED">Cancelled</TabsTrigger>
            <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </section>

      <Table>
        <TableHeader>
          <TableRow className="border-b-gray-300 hover:bg-white">
            <TableHead>Customer ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Preferred Contact Method</TableHead>
            <TableHead>Address</TableHead>
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
                  <div className="no-scrollbar overflow-y-scroll px-5">
                    {/* Order details title */}
                    <h2 className="text-foreground mb-4 text-xl font-bold">
                      Order Details
                    </h2>
                    {/* Order details section */}
                    <div className="min-w-2xs flex w-full flex-col gap-3 text-left text-sm">
                      <div className="flex w-full gap-3">
                        <p className="w-16 font-semibold">Order#:</p>
                        <p>{booking.id}</p>
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
                  <SheetFooter className="h-fit border-t">
                    <div>
                      {booking.status === "PENDING" ? (
                        <div className="flex flex-col gap-3">
                          <UpdateStatusButton
                            newStatus="CONFIRMED"
                            bookingId={booking.id}
                            currentStatus={booking.status}
                          />
                          <UpdateStatusButton
                            newStatus="CANCELLED"
                            bookingId={booking.id}
                            currentStatus={booking.status}
                          />
                        </div>
                      ) : // add the choice to be able to change that state to inprogress "Start Work Order"
                      booking.status === "CONFIRMED" ? (
                        <UpdateStatusButton
                          newStatus="IN_PROGRESS"
                          bookingId={booking.id}
                          currentStatus={booking.status}
                        />
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
};
