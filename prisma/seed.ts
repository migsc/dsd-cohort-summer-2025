import "../envConfig";
import { PrismaClient, BookingStatus } from "../prisma/generated/client";
import { auth } from "../src/lib/auth";

const prisma = new PrismaClient();

function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

async function main() {
  console.log("Start seeding...");

  await prisma.booking.deleteMany();
  await prisma.business.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();
  await prisma.verification.deleteMany();
  console.log("Cleared existing data.");

  const adminEmail = "admin@example.com";
  const adminPassword = "password123";
  const adminName = "Admin Business Owner";
  const adminBusinessName = "Admin Cleaning Co.";

  console.log(`Creating admin user via Better Auth: ${adminEmail}`);
  let adminUser;
  let adminBusiness;

  try {
    const adminUserResult = await auth.api.signUpEmail({
      body: {
        email: adminEmail,
        password: adminPassword,
        name: adminName,
      },
    });

    adminUser = await prisma.user.findUniqueOrThrow({
      where: { email: adminEmail },
      select: { id: true, email: true, name: true },
    });

    await prisma.user.update({
      where: { id: adminUser.id },
      data: { role: "business" },
    });

    const adminBusinessSlug = slugify(adminBusinessName);

    adminBusiness = await prisma.business.create({
      data: {
        userId: adminUser.id,
        businessName: adminBusinessName,
        businessSlug: adminBusinessSlug,
        contactPersonName: adminName,
        contactPersonTitle: "Owner",
        contactPersonEmail: adminEmail,
        contactPersonPhone: "123-456-7890",
        businessAddressStreet: "123 Main St",
        businessAddressCity: "Anytown",
        businessAddressState: "CA",
        businessAddressZip: "90210",
        businessAddressCountry: "USA",
        serviceAreaRadius: 10,
        yearsInBusiness: 5,
        businessDescription:
          "A premier cleaning service managed by the app owner.",
        coreServices: [
          {
            name: "Standard Home Cleaning",
            description: "Regular cleaning for homes.",
            durationMin: 2,
            durationMax: 4,
            typicalCleanersAssigned: 2,
            pricingModel: "Hourly",
            priceMin: 50,
            priceMax: 100,
          },
          {
            name: "Deep Clean",
            description: "Thorough, detailed cleaning.",
            durationMin: 4,
            durationMax: 8,
            typicalCleanersAssigned: 3,
            pricingModel: "Per Job",
            priceMin: 200,
            priceMax: 400,
          },
        ],
        operatingHours: {
          monday: { start: "09:00", end: "17:00", isOpen: true },
          tuesday: { start: "09:00", end: "17:00", isOpen: true },
          wednesday: { start: "09:00", end: "17:00", isOpen: true },
          thursday: { start: "09:00", end: "17:00", isOpen: true },
          friday: { start: "09:00", end: "17:00", isOpen: true },
          saturday: { start: "10:00", end: "15:00", isOpen: true },
          sunday: { start: "", end: "", isOpen: false },
        },
        averageTravelTimeMinutes: 30,
        currentSchedulingMethod: "Specialized Software",
        logoUrl: "https://example.com/admin-logo.png",
        brandColorPrimary: "#4CAF50",
        brandColorSecondary: "#8BC34A",
        preferredCustomerCommunicationMethods: [
          "Email",
          "Phone",
          "Customer Portal",
        ],
        additionalNotes: "This is the main admin business for development.",
      },
    });

    console.log(
      "Created admin user and business:",
      adminUser.email,
      adminBusiness.businessName,
      "(Slug:",
      adminBusiness.businessSlug + ")"
    );
  } catch (error: any) {
    console.error(`Error creating admin user or business: ${error.message}`);
  }

  const customerEmail = "customer@example.com";
  const customerPassword = "password123";
  const customerName = "Regular Customer User";

  console.log(`Creating customer user via Better Auth: ${customerEmail}`);
  let customerUser;
  let customerProfile;

  try {
    const customerUserResult = await auth.api.signUpEmail({
      body: {
        email: customerEmail,
        password: customerPassword,
        name: customerName,
      },
    });

    customerUser = await prisma.user.findUniqueOrThrow({
      where: { email: customerEmail },
      select: { id: true, email: true, name: true },
    });

    customerProfile = await prisma.customer.create({
      data: {
        userId: customerUser.id,
        preferredContactMethod: "Email",
        addressStreet: "456 Oak Ave",
        addressCity: "Anytown",
        addressState: "CA",
      },
    });

    console.log("Created customer user and profile:", customerUser.email);
  } catch (error: any) {
    console.error(`Error creating customer user or profile: ${error.message}`);
  }

  // --- ADD BOOKINGS ---
  if (adminBusiness && customerProfile) {
    console.log("Creating bookings...");

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    await prisma.booking.create({
      data: {
        serviceName: "Standard Home Cleaning",
        date: tomorrow.toISOString().split("T")[0],
        timeSlot: "10:00 AM - 12:00 PM",
        notes: "First booking test - standard service.",
        serviceId: "std-clean-001",
        serviceDuration: "2 hours",
        servicePrice: "100.00",
        status: BookingStatus.PENDING,
        customerId: customerProfile.id,
        businessId: adminBusiness.id,
      },
    });

    await prisma.booking.create({
      data: {
        serviceName: "Deep Clean",
        date: dayAfterTomorrow.toISOString().split("T")[0],
        timeSlot: "01:00 PM - 05:00 PM",
        notes: "Second booking test - deep clean for a larger house.",
        serviceId: "deep-clean-001",
        serviceDuration: "4 hours",
        servicePrice: "350.00",
        status: BookingStatus.CONFIRMED,
        customerId: customerProfile.id,
        businessId: adminBusiness.id,
      },
    });

    await prisma.booking.create({
      data: {
        serviceName: "Standard Home Cleaning",
        date: tomorrow.toISOString().split("T")[0],
        timeSlot: "03:00 PM - 05:00 PM",
        notes: "Cancelled booking example.",
        serviceId: "std-clean-002",
        serviceDuration: "2 hours",
        servicePrice: "100.00",
        status: BookingStatus.CANCELLED,
        customerId: customerProfile.id,
        businessId: adminBusiness.id,
      },
    });

    console.log("Bookings created successfully.");
  } else {
    console.warn(
      "Skipping booking creation: Admin business or customer profile not created successfully."
    );
  }
  // --- END ADD BOOKINGS ---

  console.log("Seeding finished.");
}

main()
  .catch(async e => {
    console.error("Error occurred during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
