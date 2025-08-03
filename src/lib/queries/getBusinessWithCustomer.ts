// lib/queries/getBusinessWithCustomers.ts
import prisma from '@/lib/prisma';

export async function getBusinessWithCustomers(businessSlug: string) {
  return await prisma.business.findUnique({
    where: { businessSlug },
    include: {
      bookings: {
        include: {
          customer: true,
          business: true,
        },
      },
    },
  });
}
