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
import BookingForm from "@/components/forms/book-service-form";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { type CoreService, type OperatingHours } from "prisma/generated";

interface ServicesGridProps {
  operatingHours: OperatingHours;
  coreServices: CoreService[];
  businessSlug: string;
}

// ServicesGrid Component. Accepts an array of services (objects) and maps each service to a ServiceCard
export default function ServicesGrid({
  servicesWithOperatingHours,
  query,
}: {
  servicesWithOperatingHours: ServicesGridProps;
  query: string;
}) {
  const filteredServices = useMemo(() => {
    // if no search query, return all services
    if (!query || !query.trim()) {
      return servicesWithOperatingHours.coreServices;
    }

    const searchTerm = query.toLowerCase().trim();

    return servicesWithOperatingHours.coreServices.filter(
      service =>
        service.name.toLowerCase().includes(searchTerm) ||
        service.description.toLowerCase().includes(searchTerm)
    );
  }, [servicesWithOperatingHours.coreServices, query]);

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
        {filteredServices?.map((service: CoreService) => (
          <div key={service.id}>
            <ServiceCard
              service={service}
              operatingHours={servicesWithOperatingHours.operatingHours}
              businessSlug={servicesWithOperatingHours.businessSlug}
            />
          </div>
        ))}
      </section>
    </div>
  );
}

// ServiceCard Component used to make individual cards
export function ServiceCard({
  operatingHours,
  service,
  businessSlug,
}: {
  operatingHours: OperatingHours;
  service: CoreService;
  businessSlug: string;
}) {
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
            <h2 className="text-xl">{service.name}</h2>
          </CardTitle>
          <CardDescription>
            <p>{service.description}</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            {service.durationMin}-{service.durationMax} hours
          </p>
          <p className="text-xl font-bold text-lime-500">
            ${service.priceMin}-${service.priceMax} {service.pricingModel}
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
        service={service}
        operatingHours={operatingHours}
        businessSlug={businessSlug}
      />
    </React.Fragment>
  );
}
