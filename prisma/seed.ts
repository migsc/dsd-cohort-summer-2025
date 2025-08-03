import "../envConfig";
import {
  PrismaClient,
  BookingStatus,
  PricingModel,
  type CoreService as CoreServiceModel,
} from "./generated/client";
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

  const numCustomers = 3;
  const customersAndProfiles = [];

  console.log(`Creating ${numCustomers} customer users and profiles...`);
  for (let i = 1; i <= numCustomers; i++) {
    const custEmail = `customer${i}@example.com`;
    const custName = `Customer ${i}`;
    const custPassword = "password123";
    const custPhoneNumber = `555-000-000${i}`;
    const custRooms = i * 2;
    const custSquareFootage = i * 1000;

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
          phoneNumber: custPhoneNumber,
          preferredContactMethod: i % 2 === 0 ? "Phone" : "Email",
          addressStreet: `${100 + i} Pine St`,
          addressCity: "Clientville",
          addressState: "TX",
          addressZip: `7500${i}`,
          addressCountry: "USA",
          rooms: custRooms,
          squareFootage: custSquareFootage,
        },
      });
      customersAndProfiles.push({ user, customerProfile });
      console.log(`- Created customer: ${custEmail}`);
    } catch (error: any) {
      console.error(`- Error creating customer ${custEmail}: ${error.message}`);
    }
  }

  if (
    adminBusiness &&
    customersAndProfiles.length > 0 &&
    adminCoreServices.length > 0
  ) {
    console.log("Creating bookings with various statuses...");

    const services = adminCoreServices;
    const bookingPromises = [];

    const { startTime: s1_1, endTime: e1_1 } = parseTimeSlot24Hour(
      "09:00 AM - 11:00 AM"
    );
    bookingPromises.push(
      prisma.booking.create({
        data: {
          date: getDateString(1),
          startTime: s1_1,
          endTime: e1_1,
          notes: "Initial booking by Customer 1.",
          serviceId: services[0].id,
          duration: 150,
          price: 150,
          rooms: 3,
          status: BookingStatus.PENDING,
          customerId: customersAndProfiles[0].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    const { startTime: s1_2, endTime: e1_2 } = parseTimeSlot24Hour(
      "01:00 PM - 03:00 PM"
    );
    bookingPromises.push(
      prisma.booking.create({
        data: {
          date: getDateString(2),
          startTime: s1_2,
          endTime: e1_2,
          notes: "Confirmed follow-up clean for Customer 1.",
          serviceId: services[2].id,
          duration: 120,
          price: 400,
          status: BookingStatus.CONFIRMED,
          customerId: customersAndProfiles[0].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    const { startTime: s1_3, endTime: e1_3 } = parseTimeSlot24Hour(
      "04:00 PM - 06:00 PM"
    );
    bookingPromises.push(
      prisma.booking.create({
        data: {
          date: getDateString(0),
          startTime: s1_3,
          endTime: e1_3,
          notes: "Team is en route to Customer 1 for deep clean.",
          serviceId: services[1].id,
          duration: 240,
          price: 300,
          status: BookingStatus.ON_WAY,
          customerId: customersAndProfiles[0].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    const { startTime: s1_4, endTime: e1_4 } = parseTimeSlot24Hour(
      "09:00 AM - 01:00 PM"
    );
    bookingPromises.push(
      prisma.booking.create({
        data: {
          date: getDateString(-1),
          startTime: s1_4,
          endTime: e1_4,
          notes:
            "Service started, still working. (Should technically be Completed now).",
          serviceId: services[3].id,
          duration: 360,
          price: 800,
          squareFootage: 3500,
          status: BookingStatus.IN_PROGRESS,
          customerId: customersAndProfiles[0].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    const { startTime: s1_5, endTime: e1_5 } = parseTimeSlot24Hour(
      "10:00 AM - 12:00 PM"
    );
    bookingPromises.push(
      prisma.booking.create({
        data: {
          date: getDateString(5),
          startTime: s1_5,
          endTime: e1_5,
          notes: "Cancelled by customer 1 due to schedule conflict.",
          serviceId: services[4].id,
          duration: 480,
          price: 1500,
          status: BookingStatus.CANCELED,
          customerId: customersAndProfiles[0].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    const { startTime: s1_6, endTime: e1_6 } = parseTimeSlot24Hour(
      "02:00 PM - 05:00 PM"
    );
    bookingPromises.push(
      prisma.booking.create({
        data: {
          date: getDateString(-5),
          startTime: s1_6,
          endTime: e1_6,
          notes: "Service successfully completed for Customer 1.",
          serviceId: services[5].id,
          duration: 180,
          price: 180,
          rooms: 2,
          status: BookingStatus.COMPLETED,
          customerId: customersAndProfiles[0].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    const { startTime: s2_1, endTime: e2_1 } = parseTimeSlot24Hour(
      "10:00 AM - 12:00 PM"
    );
    bookingPromises.push(
      prisma.booking.create({
        data: {
          date: getDateString(3),
          startTime: s2_1,
          endTime: e2_1,
          notes: "Regular cleaning for Customer 2.",
          serviceId: services[0].id,
          duration: 180,
          price: 180,
          rooms: 4,
          status: BookingStatus.CONFIRMED,
          customerId: customersAndProfiles[1].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    const { startTime: s2_2, endTime: e2_2 } = parseTimeSlot24Hour(
      "09:00 AM - 04:00 PM"
    );
    bookingPromises.push(
      prisma.booking.create({
        data: {
          date: getDateString(7),
          startTime: s2_2,
          endTime: e2_2,
          notes: "Full window wash requested for Customer 2.",
          serviceId: services[6].id,
          duration: 300,
          price: 450,
          status: BookingStatus.PENDING,
          customerId: customersAndProfiles[1].customerProfile.id,
          businessId: adminBusiness.id,
        },
      })
    );

    const { startTime: s3_1, endTime: e3_1 } = parseTimeSlot24Hour(
      "08:00 AM - 11:00 AM"
    );
    bookingPromises.push(
      prisma.booking.create({
        data: {
          date: getDateString(-10),
          startTime: s3_1,
          endTime: e3_1,
          notes: "First cleaning for Customer 3, successful.",
          serviceId: services[0].id,
          duration: 200,
          price: 200,
          rooms: 4,
          status: BookingStatus.COMPLETED,
          customerId: customersAndProfiles[2].customerProfile.id,
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
