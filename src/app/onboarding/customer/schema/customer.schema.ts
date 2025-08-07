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

export const preferredContactMethods = [
  "Email",
  "Phone",
  "SMS",
  "Customer Portal",
] as const;

export const CustomerOnboardingSchema = z.object({
  preferredContactMethod: z.enum(preferredContactMethods, {
    message: "Please select a valid contact method",
  }),
  addressStreet: z.string().nonempty("Street address is required."),
  addressCity: z.string().nonempty("City is required."),
  addressState: z.enum(usStates, { message: "Invalid state selected." }),
  addressZip: z
    .string()
    .regex(/^\d{5}(?:[-\s]\d{4})?$/, "Invalid zip code format")
    .nonempty("Zip code is required."),
  addressCountry: z.string().nonempty("Country is required."),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required.")
    .regex(
      /^(\+\d{1,2}\s?)?1?\-?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      "Invalid phone number format."
    ),
  rooms: z.coerce
    .number()
    .min(0.5, "Number of rooms must be at least 0.5.")
    .max(50, "Number of rooms cannot exceed 50."),
  squareFootage: z.coerce
    .number()
    .min(50, "Square footage must be at least 50 sqft.")
    .max(100000, "Square footage cannot exceed 100,000 sqft."),
});

export type CustomerOnboardingFormData = z.infer<
  typeof CustomerOnboardingSchema
>;

export const defaultCustomerValues: CustomerOnboardingFormData = {
  preferredContactMethod: "Email",
  addressStreet: "",
  addressCity: "",
  addressState: "TX",
  addressZip: "",
  addressCountry: "",
  phoneNumber: "2909028082",
  rooms: 0,
  squareFootage: 0,
};
