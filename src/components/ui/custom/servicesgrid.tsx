"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import BookingForm, {
  type BookingFormData,
} from "@/components/forms/book-service-form";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

// ServicesGrid Component. Accepts an array of services (objects) and maps each service to a ServiceCard
export default function ServicesGrid({
  services,
  query,
  businessSlug,
}: {
  services: ServiceCardProps[];
  query: string;
  businessSlug: string;
}) {
  const filteredServices = useMemo(() => {
    // if no search query, return all services
    if (!query || !query.trim()) {
      return services;
    }

    const searchTerm = query.toLowerCase().trim();

    return services.filter(
      service =>
        service.name.toLowerCase().includes(searchTerm) ||
        service.description.toLowerCase().includes(searchTerm)
    );
  }, [services, query]);

  if (query && filteredServices.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="mb-2 text-lg text-gray-500">
          No services found for "{query}"
        </p>
      </div>
    );
  }

  const showSearchInfo = query && query.trim();

  return (
    <div>
      {/* Search results info */}
      {showSearchInfo && (
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Showing {filteredServices.length} result
            {filteredServices.length === 1 ? "" : "s"} for "{query}"
          </p>
        </div>
      )}

      {/* Services grid */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service: ServiceCardProps) => (
          <div key={service.id}>
            <ServiceCard {...service} businessSlug={businessSlug} />
          </div>
        ))}
      </section>
    </div>
  );
}

export interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  durationMin: number;
  durationMax: number;
  typicalCleanersAssigned: number;
  pricingModel: string;
  priceMin: number;
  priceMax: number;
  businessSlug: string;
}

// ServiceCard Component used to make individual cards
export function ServiceCard({
  id,
  name,
  description,
  durationMin,
  durationMax,
  priceMin,
  priceMax,
  pricingModel,
  businessSlug,
}: ServiceCardProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const handleBookNow = () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    setIsBookingModalOpen(true);
  };

  return (
    <React.Fragment>
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="text-xl">{name}</h2>
          </CardTitle>
          <CardDescription>
            <p>{description}</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            {durationMin}-{durationMax}
          </p>
          <p className="text-xl font-bold text-lime-500">
            ${priceMin}-${priceMax} {pricingModel}
          </p>
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
        serviceId={id}
        serviceName={name}
        serviceDuration={`${durationMin}-${durationMax} mins`}
        servicePrice={`$${priceMin}-${priceMax} ${pricingModel}`}
        businessSlug={businessSlug}
      />
    </React.Fragment>
  );
}
