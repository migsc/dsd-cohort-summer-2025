'use client'
import {
  TableCell,
  TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import React from "react";
import { RebookingForm } from "@/components/forms/book-service-form";

interface CurrentBookingProps {
    orderNum: string,
    service: string,
    paymentMethod: 'Credit Card' | 'Cash' | 'Check',
    amount: string,
    status: 'Under Review' | 'Approved' | 'On The Way' | 'In Progress' | 'Completed'
}

export function CurrentBookingRow({ 
    orderNum, 
    service, 
    paymentMethod, 
    amount, 
    status 
}: CurrentBookingProps) {
    return (
        <TableRow>
            <TableCell className="font-medium">
                {orderNum}
            </TableCell>
            <TableCell>
                {service}
            </TableCell>
            <TableCell>
                {paymentMethod}
            </TableCell>
            <TableCell className="text-right">
                {amount}
            </TableCell>
            <TableCell className="text-right">
                {status}
            </TableCell>
        </TableRow>
    )
}
interface PreviousBookingProps {
    bookingId: string,
    orderNum: string,
    dateFulfilled: string,
    service: string,
    paymentMethod: 'Credit Card' | 'Cash' | 'Check',
    amount: string
}

export function PreviousBookingRow({ 
    bookingId,
    orderNum, 
    dateFulfilled, 
    service, 
    paymentMethod, 
    amount 
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
            <RebookingForm
                    isOpen={isRebookingModalOpen}
                    onClose={() => setIsRebookingModalOpen(false)}
                    bookingId={bookingId}
                    // serviceId={id} // can demetrius get this info just from the service name? ** what is this being used for -- is it necssary for the rebook form?
                    serviceName={service}
                    // serviceDuration={`${durationMin}-${durationMax} mins`}
                    servicePrice={amount}
                  />
        </React.Fragment>
    )
}