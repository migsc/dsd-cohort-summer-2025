'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import BookingForm from "@/components/forms/book-service-form";
import { useState } from "react";
import React from "react";

interface PreviousBookingProps {
    bookingId: string,
    orderNum: string,
    dateFulfilled: string,
    serviceName: string,
    servicePrice: string,
    serviceId: string,
    serviceDuration: string,
    timeSlot: string,
    notes: any
}

export default function PreviousBooking({
    bookingId, 
    orderNum, 
    dateFulfilled, 
    serviceName, 
    servicePrice, 
    serviceId, 
    serviceDuration, 
    timeSlot,
    notes
}: PreviousBookingProps) {
    const [isRebookingModalOpen, setIsRebookingModalOpen] = useState(false);

    const handleRebook = () => {
        setIsRebookingModalOpen(true);
    };

    return (
        <React.Fragment>
        <AccordionItem 
            key={bookingId} 
            value={bookingId}>
            <AccordionTrigger>
                <div className="grid grid-cols-4 text-base">
                    <span>#{orderNum.toUpperCase()}</span>
                    <span>{new Date(dateFulfilled).toLocaleDateString()}</span>
                    <span>{serviceName}</span>
                    {/* ***TODO: have this be the price they actually paid rather than the price range of the service */}
                    <span>{servicePrice}</span>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div className="p-4 space-y-2 text-sm">
                    <p><strong>Date:</strong> {new Date(dateFulfilled).toLocaleDateString()}</p>
                    <p><strong>Service Type:</strong> {serviceName}</p>
                    <p><strong>Time:</strong> {timeSlot}</p>
                    <p><strong>Payment Method:</strong> Credit Card</p>
                    <p><strong>Amount Paid: </strong> {servicePrice}</p>
                    <p><strong>Duration:</strong> {serviceDuration}</p>
                    <p><strong>Notes:</strong> {notes}</p>
                    <Button 
                    onClick={handleRebook} 
                    className="cursor-pointer">
                        Rebook
                    </Button>
                </div>
            </AccordionContent>
        </AccordionItem>
        <BookingForm
            isOpen={isRebookingModalOpen}
            onClose={() => setIsRebookingModalOpen(false)}
            serviceId={serviceId} 
            serviceName={serviceName}
            serviceDuration={serviceDuration}
            servicePrice={servicePrice}
        />
        </React.Fragment>
    )
}