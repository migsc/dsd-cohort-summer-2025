import "../envConfig";
import { PrismaClient, BookingStatus } from "../prisma/generated/client";
import { auth } from "../src/lib/auth"; // Assuming better-auth sign-up is used for users

const prisma = new PrismaClient();

// Slugify function (as before)
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

  // Order of deletion is crucial for foreign key constraints
  await prisma.booking.deleteMany();
  await prisma.business.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();
  await prisma.verification.deleteMany();
  console.log("Cleared existing data.");

  // --- Create Admin User and Business ---
  const adminEmail = "admin@example.com";
  const adminPassword = "password123";
  const adminName = "Admin Business Owner";
  const adminBusinessName = "Admin Cleaning Co.";

  let adminUser: { id: string; email: string; name: string } | undefined;
  let adminBusiness:
    | Awaited<ReturnType<typeof prisma.business.create>>
    | undefined;

  try {
    await auth.api.signUpEmail({
      // Use auth to create the user with hashed password
      body: { email: adminEmail, password: adminPassword, name: adminName },
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
        businessSlug: adminBusinessSlug, // Use the generated slug
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
          // Initial 2 services + 5 new ones = 7 total
          {
            id: "std-home-clean-001", // Explicit ID for easier referencing later
            name: "Standard Home Cleaning",
            description: "Regular cleaning for homes.",
            durationMin: 120, // mins
            durationMax: 240, // mins
            typicalCleanersAssigned: 2,
            pricingModel: "Hourly",
            priceMin: 50,
            priceMax: 100,
          },
          {
            id: "deep-clean-001",
            name: "Deep Clean",
            description: "Thorough, detailed cleaning.",
            durationMin: 240,
            durationMax: 480,
            typicalCleanersAssigned: 3,
            pricingModel: "Per Job",
            priceMin: 200,
            priceMax: 400,
          },
          // --- 5 NEW CORE SERVICES ---
          {
            id: "office-clean-001",
            name: "Office Cleaning",
            description:
              "Daily or weekly cleaning for small to medium offices.",
            durationMin: 90,
            durationMax: 180,
            typicalCleanersAssigned: 1,
            pricingModel: "Monthly Contract",
            priceMin: 300,
            priceMax: 800,
          },
          {
            id: "move-in-out-clean-001",
            name: "Move-In/Out Cleaning",
            description:
              "Comprehensive cleaning for empty homes before/after moving.",
            durationMin: 300,
            durationMax: 600,
            typicalCleanersAssigned: 3,
            pricingModel: "Per Sq Ft",
            priceMin: 400,
            priceMax: 1000,
          },
          {
            id: "post-construction-clean-001",
            name: "Post-Construction Clean-Up",
            description:
              "Removal of debris and deep cleaning after construction.",
            durationMin: 480,
            durationMax: 960,
            typicalCleanersAssigned: 4,
            pricingModel: "Per Project",
            priceMin: 800,
            priceMax: 2500,
          },
          {
            id: "carpet-shampoo-001",
            name: "Carpet Shampoo & Steam",
            description: "Deep cleaning and sanitization of carpets.",
            durationMin: 60,
            durationMax: 240,
            typicalCleanersAssigned: 1,
            pricingModel: "Per Room",
            priceMin: 75,
            priceMax: 200,
          },
          {
            id: "window-wash-001",
            name: "Window Washing",
            description: "Interior and exterior window cleaning.",
            durationMin: 60,
            durationMax: 300,
            typicalCleanersAssigned: 1,
            pricingModel: "Per Window",
            priceMin: 10,
            priceMax: 20,
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
    process.exit(1); // Exit if admin setup fails as it's critical
  }

  // --- Create Multiple Customer Accounts and Bookings ---
  const numCustomers = 10;
  const customersAndProfiles = [];

  console.log(`Creating ${numCustomers} customer users and profiles...`);
  for (let i = 1; i <= numCustomers; i++) {
    const custEmail = `customer${i}@example.com`;
    const custName = `Customer ${i}`;
    const custPassword = "password123";

    try {
      await auth.api.signUpEmail({
        body: { email: custEmail, password: custPassword, name: custName },
      });

      const user = await prisma.user.findUniqueOrThrow({
        where: { email: custEmail },
        select: { id: true, email: true, name: true },
      });

      const customerProfile = await prisma.customer.create({
        data: {
          userId: user.id,
          preferredContactMethod: i % 2 === 0 ? "Phone" : "Email",
          addressStreet: `${100 + i} Pine St`,
          addressCity: "Clientville",
          addressState: "TX",
          addressZip: `7500${i}`,
        },
      });
      customersAndProfiles.push({ user, customerProfile });
      console.log(`- Created customer: ${custEmail}`);
    } catch (error: any) {
      console.error(`- Error creating customer ${custEmail}: ${error.message}`);
    }
  }

  // --- Create 10 Bookings ---
  if (adminBusiness && customersAndProfiles.length > 0) {
    console.log("Creating 10 bookings...");

    const services = adminBusiness.coreServices;
    const bookingPromises = [];

    // Helper to get a date string for N days from now
    const getDateString = (daysOffset: number) => {
      const d = new Date();
      d.setDate(d.getDate() + daysOffset);
      return d.toISOString().split("T")[0];
    };

    // Booking 1: Standard Home Cleaning (Customer 1, tomorrow)
    bookingPromises.push(
      prisma.booking.create({
        data: {
          serviceName: services[0].name,
          date: getDateString(1),
          timeSlot: "09:00 AM - 11:00 AM",
          notes: "Initial booking by customer 1.",
          serviceId: services[0].id,
          serviceDuration: `${services[0].durationMin}-${services[0].durationMax} mins`,
          servicePrice: `$${services[0].priceMin}-${services[0].priceMax} ${services[0].pricingModel}`,
          status: BookingStatus.PENDING,
          customerId: customersAndProfiles[0].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    // Booking 2: Deep Clean (Customer 2, day after tomorrow)
    bookingPromises.push(
      prisma.booking.create({
        data: {
          serviceName: services[1].name,
          date: getDateString(2),
          timeSlot: "01:00 PM - 05:00 PM",
          notes: "Complex deep clean.",
          serviceId: services[1].id,
          serviceDuration: `${services[1].durationMin}-${services[1].durationMax} mins`,
          servicePrice: `$${services[1].priceMin}-${services[1].priceMax} ${services[1].pricingModel}`,
          status: BookingStatus.CONFIRMED,
          customerId: customersAndProfiles[1].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    // Booking 3: Office Cleaning (Customer 3, 3 days from now)
    bookingPromises.push(
      prisma.booking.create({
        data: {
          serviceName: services[2].name,
          date: getDateString(3),
          timeSlot: "10:00 AM - 01:00 PM",
          notes: "Weekly office cleaning.",
          serviceId: services[2].id,
          serviceDuration: `${services[2].durationMin}-${services[2].durationMax} mins`,
          servicePrice: `$${services[2].priceMin}-${services[2].priceMax} ${services[2].pricingModel}`,
          status: BookingStatus.PENDING,
          customerId: customersAndProfiles[2].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    // Booking 4: Move-In/Out Cleaning (Customer 4, 4 days from now, Confirmed)
    bookingPromises.push(
      prisma.booking.create({
        data: {
          serviceName: services[3].name,
          date: getDateString(4),
          timeSlot: "09:00 AM - 05:00 PM",
          notes: "Post-tenant move-out clean.",
          serviceId: services[3].id,
          serviceDuration: `${services[3].durationMin}-${services[3].durationMax} mins`,
          servicePrice: `$${services[3].priceMin}-${services[3].priceMax} ${services[3].pricingModel}`,
          status: BookingStatus.CONFIRMED,
          customerId: customersAndProfiles[3].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    // Booking 5: Post-Construction Clean-Up (Customer 5, 5 days from now, Cancelled)
    bookingPromises.push(
      prisma.booking.create({
        data: {
          serviceName: services[4].name,
          date: getDateString(5),
          timeSlot: "08:00 AM - 06:00 PM",
          notes: "Cancelled due to project delay.",
          serviceId: services[4].id,
          serviceDuration: `${services[4].durationMin}-${services[4].durationMax} mins`,
          servicePrice: `$${services[4].priceMin}-${services[4].priceMax} ${services[4].pricingModel}`,
          status: BookingStatus.CANCELED,
          customerId: customersAndProfiles[4].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    // Booking 6: Carpet Shampoo & Steam (Customer 6, 6 days from now, Completed)
    bookingPromises.push(
      prisma.booking.create({
        data: {
          serviceName: services[5].name, // services[5] is the 6th service
          date: getDateString(6),
          timeSlot: "02:00 PM - 04:00 PM",
          notes: "Standard carpet clean for living room.",
          serviceId: services[5].id,
          serviceDuration: `${services[5].durationMin}-${services[5].durationMax} mins`,
          servicePrice: `$${services[5].priceMin}-${services[5].priceMax} ${services[5].pricingModel}`,
          status: BookingStatus.COMPLETED,
          customerId: customersAndProfiles[5].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    // Booking 7: Window Washing (Customer 7, 7 days from now, In Progress)
    bookingPromises.push(
      prisma.booking.create({
        data: {
          serviceName: services[6].name, // services[6] is the 7th service
          date: getDateString(7),
          timeSlot: "11:00 AM - 01:00 PM",
          notes: "Exterior windows for a two-story house.",
          serviceId: services[6].id,
          serviceDuration: `${services[6].durationMin}-${services[6].durationMax} mins`,
          servicePrice: `$${services[6].priceMin}-${services[6].priceMax} ${services[6].pricingModel}`,
          status: BookingStatus.IN_PROGRESS,
          customerId: customersAndProfiles[6].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    // Booking 8: Standard Home Cleaning (Customer 8, 8 days from now)
    bookingPromises.push(
      prisma.booking.create({
        data: {
          serviceName: services[0].name,
          date: getDateString(8),
          timeSlot: "09:00 AM - 01:00 PM",
          notes: "Recurring service, every other week.",
          serviceId: services[0].id,
          serviceDuration: `${services[0].durationMin}-${services[0].durationMax} mins`,
          servicePrice: `$${services[0].priceMin}-${services[0].priceMax} ${services[0].pricingModel}`,
          status: BookingStatus.CONFIRMED,
          customerId: customersAndProfiles[7].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    // Booking 9: Deep Clean (Customer 9, 9 days from now)
    bookingPromises.push(
      prisma.booking.create({
        data: {
          serviceName: services[1].name,
          date: getDateString(9),
          timeSlot: "10:00 AM - 03:00 PM",
          notes: "Special request for kitchen and bathroom deep clean.",
          serviceId: services[1].id,
          serviceDuration: `${services[1].durationMin}-${services[1].durationMax} mins`,
          servicePrice: `$${services[1].priceMin}-${services[1].priceMax} ${services[1].pricingModel}`,
          status: BookingStatus.PENDING,
          customerId: customersAndProfiles[8].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    // Booking 10: Office Cleaning (Customer 10, 10 days from now)
    bookingPromises.push(
      prisma.booking.create({
        data: {
          serviceName: services[2].name,
          date: getDateString(10),
          timeSlot: "04:00 PM - 07:00 PM",
          notes: "Evening office cleaning after hours.",
          serviceId: services[2].id,
          serviceDuration: `${services[2].durationMin}-${services[2].durationMax} mins`,
          servicePrice: `$${services[2].priceMin}-${services[2].priceMax} ${services[2].pricingModel}`,
          status: BookingStatus.PENDING,
          customerId: customersAndProfiles[9].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    await Promise.all(bookingPromises); // Wait for all bookings to be created
    console.log(`Created ${bookingPromises.length} bookings successfully.`);
  } else {
    console.warn(
      "Skipping booking creation: Admin business or customer profiles not created successfully."
    );
  }

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
