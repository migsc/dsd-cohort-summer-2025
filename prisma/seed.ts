// prisma/seed.ts
import { PrismaClient } from "../prisma/generated/client";
import { auth } from "../src/lib/auth";
import "../envConfig.ts";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  await prisma.business.deleteMany();
  await prisma.clientProfile.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();
  await prisma.verification.deleteMany();
  console.log("Cleared existing data.");

  const adminEmail = "admin@example.com";
  const adminPassword = "password123";
  const adminName = "Admin Business Owner";

  console.log(`Creating admin user via Better Auth: ${adminEmail}`);
  let adminUser;

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
      data: { role: "business", emailVerified: true },
    });
    console.log(
      `Updated admin user role to business and verified email for: ${adminUser.email}`
    );

    const adminBusiness = await prisma.business.create({
      data: {
        userId: adminUser.id,
        businessName: "Admin Cleaning Co.",
        contactPersonName: adminName,
        contactPersonTitle: "Owner",
        contactPersonEmail: adminEmail,
        contactPersonPhone: "123-456-7890",
        businessAddressStreet: "123 Main St",
        businessAddressCity: "Anytown",
        businessAddressState: "CA",
        businessAddressZip: "90210",
        businessAddressCountry: "USA",
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
            pricingModel: "Per Hour",
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
          "Client Portal",
        ],
        additionalNotes: "This is the main admin business for development.",
      },
    });

    console.log(
      "Created admin user and business:",
      adminUser.email,
      adminBusiness.businessName
    );
  } catch (error: any) {
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      console.warn(
        `User with email ${adminEmail} already exists. Skipping creation.`
      );
    } else {
      console.error(`Error creating admin user or business: ${error.message}`);
    }
  }

  const clientEmail = "client@example.com";
  const clientPassword = "password123";
  const clientName = "Regular Client User";

  console.log(`Creating client user via Better Auth: ${clientEmail}`);
  let clientUser;

  try {
    const clientUserResult = await auth.api.signUpEmail({
      body: {
        email: clientEmail,
        password: clientPassword,
        name: clientName,
      },
    });

    clientUser = await prisma.user.findUniqueOrThrow({
      where: { email: clientEmail },
      select: { id: true, email: true, name: true },
    });

    const clientProfile = await prisma.clientProfile.create({
      data: {
        userId: clientUser.id,
        preferredContactMethod: "Email",
        addressStreet: "456 Oak Ave",
        addressCity: "Anytown",
        addressState: "CA",
      },
    });

    console.log(
      "Created client user and profile:",
      clientUser.email,
      clientProfile.id
    );
  } catch (error: any) {
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      console.warn(
        `User with email ${clientEmail} already exists. Skipping creation.`
      );
    } else {
      console.error(`Error creating client user or profile: ${error.message}`);
    }
  }

  console.log("Seeding finished.");
}

main()
  .catch(async e => {
    console.error("An unhandled error occurred during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
