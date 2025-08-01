import "../envConfig";
import { PrismaClient } from "../prisma/generated/client";
import { auth } from "../src/lib/auth";

const prisma = new PrismaClient();

function makeSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/\./g, "") // remove periods
    .replace(/[^a-z0-9\s-]/g, "") // strip anything not a-z, 0-9, space, or dash
    .trim()
    .replace(/\s+/g, "-"); // convert spaces to hyphens
}

async function main() {
  console.log("Start seeding...");

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
      data: { role: "business" },
    });

    const businessName = "Admin Cleaning Co.";
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
        serviceAreaRadius: 10,
        yearsInBusiness: 5,
        businessSlug: makeSlug(businessName),
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
      adminBusiness.businessName
    );
  } catch (error: any) {
    console.error(`Error creating admin user or business: ${error.message}`);
  }

  const customerEmail = "customer@example.com";
  const customerPassword = "password123";
  const customerName = "Regular Customer User";

  console.log(`Creating customer user via Better Auth: ${customerEmail}`);
  let customerUser;

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

    const customerProfile = await prisma.customer.create({
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
