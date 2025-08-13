// lib/queries/getBusinessWithCustomers.ts
import prisma from "@/lib/prisma";

export async function getBookingsWithServiceAndCustomer(businessSlug: string) {
  // First, find the business ID based on the slug.
  // We need the ID to filter the bookings correctly.
  const business = await prisma.business.findUnique({
    where: {
      businessSlug: businessSlug,
    },
    select: {
      id: true, // Only select the ID, as we just need it for filtering bookings
    },
  });

  // If the business isn't found, return an empty array
  // Returning an empty array is often convenient for array-expected results
  if (!business) {
    return [];
  }

  // Then, fetch the bookings for that business, including the related service data
  const bookings = await prisma.booking.findMany({
    where: {
      businessId: business.id, // Filter by the found business's ID
    },
    include: {
      service: true, // Include the full CoreService object for each booking
      customer: {
        include: {
          user: true,
        },
      }, // Uncomment if you also need customer data per booking
    },
    orderBy: [
      { date: "asc" }, // Optional: order results
      { startTime: "asc" },
    ],
  });

  return bookings;
}
