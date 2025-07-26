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
};
