import prisma from "@/lib/prisma";

// Create Open Hours and Operating Hours type to match business operating hours property
type OpenHours = {
  start: string;
  end: string;
  isOpen: boolean;
};

type OperatingHours = {
  monday: OpenHours;
  tuesday: OpenHours;
  wednesday: OpenHours;
  thursday: OpenHours;
  friday: OpenHours;
  saturday: OpenHours;
  sunday: OpenHours;
};

export async function getBusinessIdFromUser(
  userId: string
): Promise<string | null> {
  try {
    const business = await prisma.business.findUnique({
      where: { userId },
      select: { id: true },
    });
    return business?.id ?? null;
  } catch (error) {
    console.error("Error retrieving business ID:", error);
    throw error;
  }
}

export async function getBusinessOperatingHours(
  businessId: string
): Promise<{ operatingHours: OperatingHours | null } | null> {
  try {
    const business = await prisma.business.findUnique({
      where: { id: businessId },
      select: { operatingHours: true },
    });
    return business;
  } catch (error) {
    console.error("Error retrieving business operating hours:", error);
    throw error;
  }
}
