import { Accordion } from "@/components/ui/accordion"
import PreviousBooking from '@/components/ui/custom/previousBookings'
import { PortalHeader } from '@/components/ui/custom/portalHeader';
import { Separator } from '@/components/ui/separator';
import BookingProgressTracker from '@/components/ui/custom/progressTracker'
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { CoreService, OperatingHours } from "prisma/generated";

export default async function MyBookings() {
    // Get session for user info
    const session = await auth.api.getSession({ headers: await headers() });
  

    if (!session || !session.user) {
        redirect('/login');
    };

    // Fetch bookings from API
    const bookings = await fetchBookings();
    console.log([...bookings.entries()])

    // Separate active bookings from completed/canceled ones
    const activeBookings = bookings.filter(booking => 
        booking.status === 'PENDING' || booking.status === 'CONFIRMED' || booking.status === 'ON_WAY' || booking.status == 'IN_PROGRESS'
    );
  
    const previousBookings = bookings.filter(booking => 
        booking.status === 'COMPLETED' || booking.status === 'CANCELED'
    );

    console.log('previous bookings: ', [...previousBookings.entries()])

    // Get the most recent active booking for the progress tracker
    const currentBooking = activeBookings.length > 0 ? activeBookings[0] : null;

    return (
    <div className="mx-1 sm:mx-10">
        <PortalHeader 
        pageName='My Bookings' 
        userName={session.user.name || "Customer"}
        />

        {/* In Progress Bookings */}
        {currentBooking && (
        <section className="mt-5">
            <div className="flex justify-center">
              <BookingProgressTracker 
                  orderNum={currentBooking.id.slice(-6).toUpperCase()} // Use last 6 chars of ID as order number
                  service={currentBooking.service.name}
                  servicePrice={currentBooking.service.rate}
                  currentStatus={currentBooking.status}
                  expectedCompletion={`${currentBooking.timeSlot} ${new Date(currentBooking.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                  })}`}
                  placedDate={new Date(currentBooking.createdAt).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                  })}
              />
            </div>
        </section>
        )}

        {/* No active bookings message */}
        {activeBookings.length === 0 && (
        <section className="w-full flex justify-center my-5">
            <div className="text-center text-gray-500">
            <p>No active bookings at this time.</p>
            </div>
        </section>
        )}
        
        <Separator />

        {/* Previous Bookings */}
        <h2 className="text-center font-bold text-lg  mt-4">Previous Bookings</h2>
        {/* No previous bookings message */}
        {previousBookings.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
            <p>No previous bookings found.</p>
        </div>
        ) : (
        <Accordion type="multiple">
            {/* Map previous bookings to accordion */}
            {previousBookings.map((booking) => (
                <PreviousBooking
                  key={booking.id}
                  bookingId={booking.id}
                  orderNum={booking.id.slice(-6)}
                  dateFulfilled={new Date(booking.date).toLocaleDateString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric',
                  })}
                  serviceName={booking.service.name}
                  servicePrice={booking.service.rate}
                  timeSlot={booking.timeSlot}
                  notes={booking.notes}
                  status={booking.status}
                  service={booking.service}
                  operatingHours={booking.business.operatingHours}
                  businessSlug={booking.business.businessSlug}
                />
            ))}
          </Accordion>
        )}
    </div>
    )
};

interface Booking {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  timeSlot: string;
  notes?: string;
  duration: number;
  price: number;
  customerId: string;
  businessId: string;
  status: 'PENDING' | 'CONFIRMED' | 'ON_WAY' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';
  createdAt: string;
  updatedAt: string;

  service: CoreService;

  business: {
    operatingHours: OperatingHours;
    businessSlug: string;
  };
}

// Fetch bookings from API endpoint
async function fetchBookings(): Promise<Booking[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/bookings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...Object.fromEntries(await headers()),
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        redirect('/login');
      };
      console.error('Failed to fetch bookings:', response.statusText);
      return [];
    };

    const rawBookings = await response.json();
    
    return rawBookings.map((booking: any) => {
      const timeSlot = `${booking.startTime} - ${booking.endTime}`;
    const service = booking.service;
    const business = booking.business;

    return {
      ...booking,
      timeSlot,
      serviceName: service.name ?? 'Unknown',
      servicePrice: booking.price?.toString() ?? '0',
      serviceDuration: booking.duration?.toString() ?? '1',
      service: service,
      business: {
        operatingHours: business?.operatingHours ?? null,
        businessSlug: business?.businessSlug ?? '',
      },
    };
    });
    
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }''
}''