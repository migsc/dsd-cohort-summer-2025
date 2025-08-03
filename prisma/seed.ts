import "../envConfig";
import {
  PrismaClient,
  BookingStatus,
  PricingModel,
  type CoreService as CoreServiceModel,
} from "../prisma/generated/client";
import { auth } from "../src/lib/auth";

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

  await prisma.booking.deleteMany();
  await prisma.coreService.deleteMany();
  await prisma.business.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verification.deleteMany();
  await prisma.user.deleteMany();
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
  let adminCoreServices: CoreServiceModel[] = [];

  try {
    await auth.api.signUpEmail({
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
        // REMOVED: coreServices is no longer an embedded array here
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

    if (adminBusiness) {
      const servicesData = [
        {
          name: "Standard Home Cleaning",
          description: "Regular cleaning for homes.",
          durationMin: 120,
          durationMax: 240,
          typicalCleanersAssigned: 2,
          pricingModel: PricingModel.HOUR,
          priceMin: 50,
          priceMax: 100,
          rate: 75,
        },
        {
          name: "Deep Clean",
          description: "Thorough, detailed cleaning.",
          durationMin: 240,
          durationMax: 480,
          typicalCleanersAssigned: 3,
          pricingModel: PricingModel.JOB,
          priceMin: 200,
          priceMax: 400,
          rate: 300,
        },
        {
          name: "Office Cleaning",
          description: "Daily or weekly cleaning for small to medium offices.",
          durationMin: 90,
          durationMax: 180,
          typicalCleanersAssigned: 1,
          pricingModel: PricingModel.HOUR,
          priceMin: 300,
          priceMax: 800,
          rate: 50,
        },
        {
          name: "Move-In/Out Cleaning",
          description:
            "Comprehensive cleaning for empty homes before/after moving.",
          durationMin: 300,
          durationMax: 600,
          typicalCleanersAssigned: 3,
          pricingModel: PricingModel.SQFT,
          priceMin: 400,
          priceMax: 1000,
          rate: 0.25,
        },
        {
          name: "Post-Construction Clean-Up",
          description:
            "Removal of debris and deep cleaning after construction.",
          durationMin: 480,
          durationMax: 960,
          typicalCleanersAssigned: 4,
          pricingModel: PricingModel.JOB,
          priceMin: 800,
          priceMax: 2500,
          rate: 1500,
        },
        {
          name: "Carpet Shampoo & Steam",
          description: "Deep cleaning and sanitization of carpets.",
          durationMin: 60,
          durationMax: 240,
          typicalCleanersAssigned: 1,
          pricingModel: PricingModel.ROOM,
          priceMin: 75,
          priceMax: 200,
          rate: 100,
        },
        {
          name: "Window Washing",
          description: "Interior and exterior window cleaning.",
          durationMin: 60,
          durationMax: 300,
          typicalCleanersAssigned: 1,
          pricingModel: PricingModel.JOB,
          priceMin: 10,
          priceMax: 20,
          rate: 15,
        },
      ];

      for (const serviceData of servicesData) {
        const createdService = await prisma.coreService.create({
          data: {
            ...serviceData,
            businessId: adminBusiness.id,
          },
        });
        adminCoreServices.push(createdService);
      }
      console.log(`Created ${adminCoreServices.length} core services.`);
    }

    console.log(
      "Created admin user and business:",
      adminUser.email,
      adminBusiness.businessName,
      "(Slug:",
      adminBusiness.businessSlug + ")"
    );
  } catch (error: any) {
    console.error(`Error creating admin user or business: ${error.message}`);
    process.exit(1);
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
          addressCountry: "USA",
        },
      });
      customersAndProfiles.push({ user, customerProfile });
      console.log(`- Created customer: ${custEmail}`);
    } catch (error: any) {
      console.error(`- Error creating customer ${custEmail}: ${error.message}`);
    }
  }

  // --- Create 10 Bookings ---
  // Ensure adminBusiness, customers, and services were created successfully
  if (
    adminBusiness &&
    customersAndProfiles.length > 0 &&
    adminCoreServices.length > 0
  ) {
    console.log("Creating 10 bookings...");

    const services = adminCoreServices;
    const bookingPromises = [];

    const getDateString = (daysOffset: number) => {
      const d = new Date();
      d.setDate(d.getDate() + daysOffset);
      return d.toISOString().split("T")[0];
    };
    const convertTo24Hour = (timeAmPm: string): string => {
      const [time, period] = timeAmPm.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (period === "PM" && hours < 12) hours += 12;
      else if (period === "AM" && hours === 12) hours = 0;
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    };
    const parseTimeSlot24Hour = (timeSlot: string) => {
      const [startAmPm, endAmPm] = timeSlot.split(" - ");
      return {
        startTime: convertTo24Hour(startAmPm),
        endTime: convertTo24Hour(endAmPm),
      };
    };

    // Booking 1: Standard Home Cleaning (Customer 1, tomorrow)
    const { startTime: s1, endTime: e1 } = parseTimeSlot24Hour(
      "09:00 AM - 11:00 AM"
    );
    bookingPromises.push(
      prisma.booking.create({
        data: {
          date: getDateString(1),
          startTime: s1,
          endTime: e1,
          notes: "Initial booking by customer 1.",
          serviceId: services[0].id, // USE THE ID FROM THE CREATED CoreService MODEL
          duration: 150,
          price: 150,
          rooms: 3,
          status: BookingStatus.PENDING,
          customerId: customersAndProfiles[0].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    // Continue with other 9 bookings similarly, using `services[index].id`

    // Booking 2: Deep Clean (Customer 2, day after tomorrow)
    const { startTime: s2, endTime: e2 } = parseTimeSlot24Hour(
      "01:00 PM - 05:00 PM"
    );
    bookingPromises.push(
      prisma.booking.create({
        data: {
          date: getDateString(2),
          startTime: s2,
          endTime: e2,
          notes: "Complex deep clean.",
          serviceId: services[1].id,
          duration: 360,
          price: 350,
          status: BookingStatus.CONFIRMED,
          customerId: customersAndProfiles[1].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    // Booking 3: Office Cleaning (Customer 3, 3 days from now)
    const { startTime: s3, endTime: e3 } = parseTimeSlot24Hour(
      "10:00 AM - 01:00 PM"
    );
    bookingPromises.push(
      prisma.booking.create({
        data: {
          date: getDateString(3),
          startTime: s3,
          endTime: e3,
          notes: "Weekly office cleaning.",
          serviceId: services[2].id,
          duration: 180,
          price: 500,
          status: BookingStatus.PENDING,
          customerId: customersAndProfiles[2].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    // Booking 4: Move-In/Out Cleaning (Customer 4, 4 days from now, Confirmed)
    const { startTime: s4, endTime: e4 } = parseTimeSlot24Hour(
      "09:00 AM - 05:00 PM"
    );
    bookingPromises.push(
      prisma.booking.create({
        data: {
          date: getDateString(4),
          startTime: s4,
          endTime: e4,
          notes: "Post-tenant move-out clean.",
          serviceId: services[3].id,
          duration: 480,
          price: 750,
          squareFootage: 3000,
          status: BookingStatus.CONFIRMED,
          customerId: customersAndProfiles[3].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    // Booking 5: Post-Construction Clean-Up (Customer 5, 5 days from now, Cancelled)
    const { startTime: s5, endTime: e5 } = parseTimeSlot24Hour(
      "08:00 AM - 06:00 PM"
    );
    bookingPromises.push(
      prisma.booking.create({
        data: {
          date: getDateString(5),
          startTime: s5,
          endTime: e5,
          notes: "Cancelled due to project delay.",
          serviceId: services[4].id,
          duration: 600,
          price: 1800,
          status: BookingStatus.CANCELED,
          customerId: customersAndProfiles[4].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    // Booking 6: Carpet Shampoo & Steam (Customer 6, 6 days from now, Completed)
    const { startTime: s6, endTime: e6 } = parseTimeSlot24Hour(
      "02:00 PM - 04:00 PM"
    );
    bookingPromises.push(
      prisma.booking.create({
        data: {
          date: getDateString(6),
          startTime: s6,
          endTime: e6,
          notes: "Standard carpet clean for living room.",
          serviceId: services[5].id,
          duration: 120,
          price: 150,
          rooms: 2,
          status: BookingStatus.COMPLETED,
          customerId: customersAndProfiles[5].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    // Booking 7: Window Washing (Customer 7, 7 days from now, In Progress)
    const { startTime: s7, endTime: e7 } = parseTimeSlot24Hour(
      "11:00 AM - 01:00 PM"
    );
    bookingPromises.push(
      prisma.booking.create({
        data: {
          date: getDateString(7),
          startTime: s7,
          endTime: e7,
          notes: "Exterior windows for a two-story house.",
          serviceId: services[6].id,
          duration: 180,
          price: 300,
          status: BookingStatus.IN_PROGRESS,
          customerId: customersAndProfiles[6].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    // Booking 8: Standard Home Cleaning (Customer 8, 8 days from now)
    const { startTime: s8, endTime: e8 } = parseTimeSlot24Hour(
      "09:00 AM - 01:00 PM"
    );
    bookingPromises.push(
      prisma.booking.create({
        data: {
          date: getDateString(8),
          startTime: s8,
          endTime: e8,
          notes: "Recurring service, every other week.",
          serviceId: services[0].id,
          duration: 240,
          price: 240,
          rooms: 4,
          status: BookingStatus.CONFIRMED,
          customerId: customersAndProfiles[7].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    // Booking 9: Deep Clean (Customer 9, 9 days from now)
    const { startTime: s9, endTime: e9 } = parseTimeSlot24Hour(
      "10:00 AM - 03:00 PM"
    );
    bookingPromises.push(
      prisma.booking.create({
        data: {
          date: getDateString(9),
          startTime: s9,
          endTime: e9,
          notes: "Special request for kitchen and bathroom deep clean.",
          serviceId: services[1].id,
          duration: 300,
          price: 280,
          status: BookingStatus.PENDING,
          customerId: customersAndProfiles[8].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    // Booking 10: Office Cleaning (Customer 10, 10 days from now)
    const { startTime: s10, endTime: e10 } = parseTimeSlot24Hour(
      "04:00 PM - 07:00 PM"
    );
    bookingPromises.push(
      prisma.booking.create({
        data: {
          date: getDateString(10),
          startTime: s10,
          endTime: e10,
          notes: "Evening office cleaning after hours.",
          serviceId: services[2].id,
          duration: 180,
          price: 600,
          status: BookingStatus.PENDING,
          customerId: customersAndProfiles[9].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    await Promise.all(bookingPromises);
    console.log(`Created ${bookingPromises.length} bookings successfully.`);
  } else {
    console.warn(
      "Skipping booking creation: Admin business, customer profiles, or core services not created successfully."
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
