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
            <AccordionTrigger className="cursor-pointer">
                <div className="text-sm md:text-base">
                    <p>
                        #{orderNum.toUpperCase()}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {new Date(dateFulfilled).toLocaleDateString()}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {serviceName}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {/* ***TODO: have this be the price they actually paid rather than the price range of the service */}
                        {servicePrice}
                        </p>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div className="p-4 space-y-2 text-sm">
                    <p><span  className="font-bold">Date:</span> {new Date(dateFulfilled).toLocaleDateString()}</p>
                    <p><span  className="font-bold">Service Type:</span> {serviceName}</p>
                    <p><span  className="font-bold">Time:</span> {timeSlot}</p>
                    <p><span  className="font-bold">Payment Method:</span> Credit Card</p>
                    <p><span  className="font-bold">Amount Paid:</span>  {servicePrice}</p>
                    <p><span  className="font-bold">Duration:</span> {serviceDuration}</p>
                    <p><span  className="font-bold">Notes:</span> {notes}</p>
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