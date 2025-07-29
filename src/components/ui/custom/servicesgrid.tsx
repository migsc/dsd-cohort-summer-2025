"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from 'react';
import BookingForm, { type BookingFormData } from "@/components/forms/book-service-form";
import React from "react";

export interface ServiceCardProps {
    _id: string;
    name: string;
    desc: string;
    durationMin: number;
    durationMax: number;
    durationUnits: string;
    priceMin: number;
    priceMax: number;
};

// ServiceCard Component used to make individual cards
export function ServiceCard({ _id, name, desc, durationMin, durationMax, durationUnits, priceMin, priceMax }: ServiceCardProps) {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const handleBookNow = () => {
        setIsBookingModalOpen(true);
    };

    const handleBooking = async (bookingData: BookingFormData) => {
        // *** Booking logic will go here
        console.log('Booking submitted:', {
            ...bookingData,
            serviceId: _id,
            serviceDuration: `${durationMin}-${durationMax} ${durationUnits}`,
            servicePrice: `$${priceMin}-${priceMax}`,
        });
        try {
            const formData ={
                ...bookingData,
                serviceId: _id,
                serviceDuration: `${durationMin}-${durationMax} ${durationUnits}`,
                servicePrice: `$${priceMin}-${priceMax}`,
            }

            const response = await fetch('api/bookings', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if (!response.ok){
                console.error('Booking error');
                alert('Booking error');
                return;
            }

            const result = await response.json();
            console.log('Booking response', result);
            alert(`Booking submitted for ${bookingData.serviceName} on ${bookingData.date} at ${bookingData.timeSlot}`);

        }
        catch(error){
            console.error('Could not send data:', error);
        }
    };

    return (
        <React.Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <h2 className="text-xl">{name}</h2>
                        </CardTitle>
                    <CardDescription>
                        <p>{desc}</p>
                        </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{durationMin}-{durationMax} {durationUnits}</p>
                    <p className="text-lime-500 font-bold text-xl">${priceMin}-${priceMax}</p>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleBookNow} className="w-full">
                        Book Now
                    </Button>
                </CardFooter>
            </Card>
            <BookingForm
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        serviceName={name}
        onBooking={handleBooking}
            />
        </React.Fragment>
    )
};

// ServicesGrid Component. Accepts an array of services (objects) and maps each service to a ServiceCard
export default function ServicesGrid({ 
    services, 
    query 
}: {
    services: ServiceCardProps[], 
    query: string;
}) {
    const filteredServices = useMemo(() => {
        // if no search query, return all services
        if (!query || !query.trim()) {
            return services;
        }

        const searchTerm = query.toLowerCase().trim();
        
        return services.filter(service => 
            // Search in service name
            service.name.toLowerCase().includes(searchTerm) ||
            // Search in service description
            service.desc.toLowerCase().includes(searchTerm)
        );
    }, [services, query]);

    if (query && filteredServices.length === 0) {
        return (
            <div className='text-center py-10'>
                <p className='text-gray-500 text-lg mb-2'>No services found for "{query}"</p>
            </div>
        );
    }

    const showSearchInfo = query && query.trim();

    return (
        <div>
            {/* Search results info */}
            {showSearchInfo && (
                <div className='text-center mb-6'>
                    <p className='text-gray-600'>
                        Showing {filteredServices.length} result{filteredServices.length === 1 ? '' : 's'} for "{query}"
                    </p>
                </div>
            )}

            {/* Services grid */}
            <section className='grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
                {filteredServices.map((service: ServiceCardProps) => (
                    <div key={service._id}>
                        <ServiceCard {...service} />
                    </div>
                ))}
            </section>
        </div>
    )
}