import z from "zod/v4";

export const usStates = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
] as const;

export const contactTitles = [
  "Owner",
  "Manager",
  "Sales Lead",
  "Customer Service",
  "Other",
] as const;

export const pricingModels = [
  "Hourly",
  "Per Job",
  "Per SqFt",
  "Per Room",
  "Custom Quote",
] as const;

export const schedulingMethods = [
  "Manual Calendar",
  "Specialized Software",
  "Google Calendar",
  "Other",
] as const;

export const communicationMethods = [
  "Email",
  "Phone",
  "SMS",
  "Customer Portal",
] as const;

export const CoreServiceSchema = z.object({
  name: z.string().nonempty("Service Name is required."),
  description: z.string().nonempty("Service Description is required."),
  durationMin: z.number().min(0, "Duration Min must be non-negative."),
  durationMax: z.number().min(0, "Duration Max must be non-negative."),
  typicalCleanersAssigned: z
    .number()
    .min(1, "Cleaners assigned must be at least 1."),
  pricingModel: z.enum(pricingModels),
  priceMin: z.number().min(0, "Min Price must be non-negative."),
  priceMax: z.number().min(0, "Max Price must be non-negative."),
  id: z.string(),
});

export type CoreService = z.infer<typeof CoreServiceSchema>;

export const DayOperatingHoursSchema = z
  .object({
    start: z.string(),
    end: z.string(),
    isOpen: z.boolean(),
  })
  .refine(
    data => {
      if (data.isOpen) {
        return data.start !== "" && data.end !== "";
      }
      return true;
    },
    {
      message: "Start and end times are required if the day is open.",
      path: ["start"],
    }
  )
  .refine(
    data => {
      if (data.isOpen && data.start && data.end) {
        const startTime = new Date(`2000-01-01T${data.start}`);
        const endTime = new Date(`2000-01-01T${data.end}`);
        return endTime > startTime;
      }
      return true;
    },
    {
      message: "End time must be after start time.",
      path: ["end"],
    }
  );

export const BusinessOnboardingSchema = z.object({
  businessName: z.string().nonempty("Business Name is required."),
  contactPersonName: z.string().nonempty("Contact Person Name is required."),
  contactPersonTitle: z.enum(contactTitles, {
    message: "Invalid contact title selected.",
  }),
  contactPersonEmail: z.email("Invalid email format."),
  contactPersonPhone: z.string().nonempty("Contact Person Phone is required."),
  businessAddressStreet: z
    .string()
    .nonempty("Business Street Address is required."),
  businessAddressCity: z
    .string()
    .nonempty("Business Address City is required."),
  businessAddressState: z.enum(usStates, {
    message: "Invalid state selected.",
  }),
  businessAddressZip: z
    .string()
    .nonempty("Zip code is required.")
    .regex(/^\d{5}(?:[-\s]\d{4})?$/, "Invalid zip code format."),
  businessAddressCountry: z
    .string()
    .nonempty("Business Address Country is required."),
  serviceAreaRadius: z
    .number()
    .int()
    .min(0, "Service Area Radius must be a non-negative integer."),
  yearsInBusiness: z
    .number()
    .int()
    .min(0, "Years in Business must be a non-negative integer."),
  businessDescription: z.string().nonempty("Business Description is required."),
  coreServices: z
    .array(CoreServiceSchema)
    .min(1, "At least one service is required."),
  operatingHours: z
    .object({
      monday: DayOperatingHoursSchema,
      tuesday: DayOperatingHoursSchema,
      wednesday: DayOperatingHoursSchema,
      thursday: DayOperatingHoursSchema,
      friday: DayOperatingHoursSchema,
      saturday: DayOperatingHoursSchema,
      sunday: DayOperatingHoursSchema,
    })
    .refine(
      data => {
        return true;
      },
      { message: "Operating hours must be valid." }
    ),
  averageTravelTimeMinutes: z
    .number()
    .int()
    .min(0, "Average Travel Time must be a non-negative integer."),
  currentSchedulingMethod: z.enum(schedulingMethods),
  logoUrl: z.url("Must be a valid URL.").or(z.literal("")),
  brandColorPrimary: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color (e.g., #RRGGBB)."),
  brandColorSecondary: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color (e.g., #RRGGBB)."),
  preferredCustomerCommunicationMethods: z
    .array(z.enum(communicationMethods))
    .min(1, "At least one communication method is required."),
  additionalNotes: z.string().optional(),
});

export type BusinessFormData = z.infer<typeof BusinessOnboardingSchema>;
export type BusinessData = BusinessFormData & {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export const defaultBusinessValues: BusinessFormData = {
  businessName: "",
  contactPersonName: "",
  contactPersonTitle: "Owner",
  contactPersonEmail: "",
  contactPersonPhone: "",
  businessAddressStreet: "",
  businessAddressCity: "",
  businessAddressState: "TX",
  businessAddressZip: "",
  businessAddressCountry: "",
  serviceAreaRadius: 10,
  yearsInBusiness: 0,
  businessDescription: "",
  coreServices: [
    {
      name: "",
      description: "",
      durationMin: 0,
      durationMax: 1,
      typicalCleanersAssigned: 1,
      pricingModel: "Custom Quote",
      priceMin: 0,
      priceMax: 10,
      id: crypto.randomUUID(),
    },
  ],
  operatingHours: {
    monday: { start: "", end: "", isOpen: false },
    tuesday: { start: "", end: "", isOpen: false },
    wednesday: { start: "", end: "", isOpen: false },
    thursday: { start: "", end: "", isOpen: false },
    friday: { start: "", end: "", isOpen: false },
    saturday: { start: "", end: "", isOpen: false },
    sunday: { start: "", end: "", isOpen: false },
  },
  averageTravelTimeMinutes: 0,
  currentSchedulingMethod: "Google Calendar",
  logoUrl: "",
  brandColorPrimary: "#FFFFFF",
  brandColorSecondary: "#000000",
  preferredCustomerCommunicationMethods: [],
  additionalNotes: "",
};
