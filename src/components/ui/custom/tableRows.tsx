'use client'
import {
  TableCell,
  TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import React from "react";
import BookingForm from "@/components/forms/book-service-form";

interface PreviousBookingProps {
    bookingId: string,
    orderNum: string,
    dateFulfilled: string,
    service: string,
    paymentMethod: 'Credit Card' | 'Cash' | 'Check',
    amount: string,
    serviceId: string,
    serviceDuration: string
}

export function PreviousBookingRow({ 
    orderNum, 
    dateFulfilled, 
    service, 
    paymentMethod, 
    amount,
    serviceId,
    serviceDuration
}: PreviousBookingProps) {
    const [isRebookingModalOpen, setIsRebookingModalOpen] = useState(false);

    const handleRebook = () => {
        setIsRebookingModalOpen(true);
    };

    return (
        <React.Fragment>
            <TableRow>
                <TableCell className="font-medium">
                    {orderNum}
                </TableCell>
                <TableCell className="font-medium">
                    {dateFulfilled}
                </TableCell>
                <TableCell>
                    {service}
                </TableCell>
                <TableCell className="text-left">
                    {paymentMethod}
                </TableCell>
                <TableCell className="text-left">
                    {amount}
                </TableCell>
                <TableCell className="text-center">
                    {/* ***TODO: have this button open a modal to enter new date/time slot */}
                    <Button onClick={handleRebook} className="cursor-pointer">
                        Rebook
                    </Button>
                </TableCell>
            </TableRow>
            <BookingForm
                isOpen={isRebookingModalOpen}
                onClose={() => setIsRebookingModalOpen(false)}
                serviceId={serviceId} 
                serviceName={service}
                serviceDuration={serviceDuration}
                    servicePrice={amount}
                  />
        </React.Fragment>
    )
}