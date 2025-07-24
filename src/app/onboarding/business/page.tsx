"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { useForm } from "@tanstack/react-form";
import React from "react";
import z from "zod/v4";

type BusinessFormData = {
  businessName: string;
  contactPersonName: string;
  contactPersonTitle: string;
  contactPersonEmail: string;
  contactPersonPhone: string;
  businessAddressStreet: string;
  businessAddressCity: string;
  businessAddressState: string;
  businessAddressZip: string;
  businessAddressCountry: string;
  yearsInBusiness: number;
  businessDescription: string;
  coreServices: Array<{
    name: string;
    description: string;
    durationMin: number;
    durationMax: number;
    typicalCleanersAssigned: number;
    pricingModel: string;
    priceMin: number;
    priceMax: number;
    id: string;
  }>;
  operatingHours: {
    monday: { start: string; end: string; isOpen: boolean };
    tuesday: { start: string; end: string; isOpen: boolean };
    wednesday: { start: string; end: string; isOpen: boolean };
    thursday: { start: string; end: string; isOpen: boolean };
    friday: { start: string; end: string; isOpen: boolean };
    saturday: { start: string; end: string; isOpen: boolean };
    sunday: { start: string; end: string; isOpen: boolean };
  };
  averageTravelTimeMinutes: number;
  currentSchedulingMethod: string;
  logoUrl: string;
  brandColorPrimary: string;
  brandColorSecondary: string;
  preferredCustomerCommunicationMethods: string[];
  additionalNotes: string;
};

const defaultBusinessValues: BusinessFormData = {
  businessName: "",
  contactPersonName: "",
  contactPersonTitle: "",
  contactPersonEmail: "",
  contactPersonPhone: "",
  businessAddressStreet: "",
  businessAddressCity: "",
  businessAddressState: "",
  businessAddressZip: "",
  businessAddressCountry: "",
  yearsInBusiness: 0,
  businessDescription: "",
  coreServices: [
    {
      name: "",
      description: "",
      durationMin: 0,
      durationMax: 1,
      typicalCleanersAssigned: 1,
      pricingModel: "", // e.g., "Hourly", "Per Job", "Per SqFt"
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
  currentSchedulingMethod: "", // e.g., "Manual", "Software", "Calendar"
  logoUrl: "",
  brandColorPrimary: "#FFFFFF",
  brandColorSecondary: "#000000",
  preferredCustomerCommunicationMethods: [], // e.g., "Email", "Phone", "SMS"
  additionalNotes: "",
};

const usStates = [
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

const contactTitles = [
  "Owner",
  "Manager",
  "Sales Lead",
  "Customer Service",
  "Other",
] as const;
const pricingModels = [
  "Hourly",
  "Per Job",
  "Per SqFt",
  "Per Room",
  "Custom Quote",
] as const;
const schedulingMethods = [
  "Manual Calendar",
  "Specialized Software",
  "Google Calendar",
  "Other",
] as const;
const communicationMethods = [
  "Email",
  "Phone",
  "SMS",
  "Client Portal",
] as const;

export default function Page() {
  const form = useForm({
    defaultValues: defaultBusinessValues,
    onSubmit: async ({ value }) => {
      console.log("Form submitted with values:", value);

      try {
        const response = await fetch("/api/onboarding/business-onboarding", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });

        if (!response.ok) {
          const responseError = await response.json();
          console.log(responseError);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <Card className="mx-auto my-8 w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Business Onboarding</CardTitle>
        <CardDescription>Please complete the following form</CardDescription>
      </CardHeader>
      <form
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <CardContent className="space-y-8">
          {/* === Section: Business Information === */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Business Information</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <form.Field
                name="businessName"
                validators={{
                  onBlur: z.string().min(1, "Business Name cannot be empty."),
                }}
                children={field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Business Name</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors &&
                      field.state.meta.errors.length > 0 && (
                        <ul className="text-sm text-red-500">
                          {field.state.meta.errors.map((error, i) => (
                            <li key={i}>{error?.message}</li>
                          ))}
                        </ul>
                      )}
                  </div>
                )}
              />
              <form.Field
                name="yearsInBusiness"
                children={field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Years in Business</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      min={0}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(Number(e.target.value))}
                    />
                  </div>
                )}
              />
              <div className="md:col-span-2">
                <form.Field
                  name="businessDescription"
                  validators={{
                    onBlur: z
                      .string()
                      .min(1, "Business Description cannot be empty."),
                  }}
                  children={field => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Business Description</Label>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={e => field.handleChange(e.target.value)}
                        rows={4}
                      />
                      {field.state.meta.errors &&
                        field.state.meta.errors.length > 0 && (
                          <ul className="text-sm text-red-500">
                            {field.state.meta.errors.map((error, i) => (
                              <li key={i}>{error?.message}</li>
                            ))}
                          </ul>
                        )}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
          <Separator />

          {/* === Section: Contact Person === */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Person</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <form.Field
                name="contactPersonName"
                validators={{
                  onBlur: z
                    .string()
                    .min(1, "Contact Person Name cannot be empty."),
                }}
                children={field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Contact Person Name</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors &&
                      field.state.meta.errors.length > 0 && (
                        <ul className="text-sm text-red-500">
                          {field.state.meta.errors.map((error, i) => (
                            <li key={i}>{error?.message}</li>
                          ))}
                        </ul>
                      )}
                  </div>
                )}
              />
              <form.Field
                name="contactPersonTitle"
                validators={{
                  onBlur: z.enum(contactTitles),
                }}
                children={field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Contact Person Title</Label>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select title" />
                      </SelectTrigger>
                      <SelectContent>
                        {contactTitles.map(title => (
                          <SelectItem key={title} value={title}>
                            {title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {field.state.meta.errors &&
                      field.state.meta.errors.length > 0 && (
                        <ul className="text-sm text-red-500">
                          {field.state.meta.errors.map((error, i) => (
                            <li key={i}>{error?.message}</li>
                          ))}
                        </ul>
                      )}
                  </div>
                )}
              />
              <form.Field
                name="contactPersonEmail"
                validators={{
                  onBlur: z.email(),
                }}
                children={field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Contact Person Email</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors &&
                      field.state.meta.errors.length > 0 && (
                        <ul className="text-sm text-red-500">
                          {field.state.meta.errors.map((error, i) => (
                            <li key={i}>{error?.message}</li>
                          ))}
                        </ul>
                      )}
                  </div>
                )}
              />
              <form.Field
                name="contactPersonPhone"
                validators={{
                  onBlur: z
                    .string()
                    .min(1, "Contact Person Phone cannot be empty"),
                }}
                children={field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Contact Person Phone</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="tel"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors &&
                      field.state.meta.errors.length > 0 && (
                        <ul className="text-sm text-red-500">
                          {field.state.meta.errors.map((error, i) => (
                            <li key={i}>{error?.message}</li>
                          ))}
                        </ul>
                      )}
                  </div>
                )}
              />
            </div>
          </div>
          <Separator />

          {/* === Section: Business Address === */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Business Address</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <form.Field
                  name="businessAddressStreet"
                  validators={{
                    onBlur: z
                      .string()
                      .min(1, "Business Street Address cannot be empty."),
                  }}
                  children={field => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Street Address</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={e => field.handleChange(e.target.value)}
                      />
                      {field.state.meta.errors &&
                        field.state.meta.errors.length > 0 && (
                          <ul className="text-sm text-red-500">
                            {field.state.meta.errors.map((error, i) => (
                              <li key={i}>{error?.message}</li>
                            ))}
                          </ul>
                        )}
                    </div>
                  )}
                />
              </div>
              <form.Field
                name="businessAddressCity"
                validators={{
                  onBlur: z
                    .string()
                    .min(1, "Business Adress City cannot be empty."),
                }}
                children={field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>City</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors &&
                      field.state.meta.errors.length > 0 && (
                        <ul className="text-sm text-red-500">
                          {field.state.meta.errors.map((error, i) => (
                            <li key={i}>{error?.message}</li>
                          ))}
                        </ul>
                      )}
                  </div>
                )}
              />
              <form.Field
                name="businessAddressState"
                validators={{
                  onBlur: z.enum(usStates, "Invalid Option"),
                }}
                children={field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>State</Label>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a state" />
                      </SelectTrigger>
                      <SelectContent>
                        {usStates.map(state => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {field.state.meta.errors &&
                      field.state.meta.errors.length > 0 && (
                        <ul className="text-sm text-red-500">
                          {field.state.meta.errors.map((error, i) => (
                            <li key={i}>{error?.message}</li>
                          ))}
                        </ul>
                      )}
                  </div>
                )}
              />
              <form.Field
                name="businessAddressZip"
                validators={{
                  onBlur: z.string().min(5, "Invalid Zip Code."),
                }}
                children={field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Zip Code</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors &&
                      field.state.meta.errors.length > 0 && (
                        <ul className="text-sm text-red-500">
                          {field.state.meta.errors.map((error, i) => (
                            <li key={i}>{error?.message}</li>
                          ))}
                        </ul>
                      )}
                  </div>
                )}
              />
              <form.Field
                name="businessAddressCountry"
                validators={{
                  onBlur: z
                    .string()
                    .min(1, "Business Address Country cannot be empty."),
                }}
                children={field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Country</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors &&
                      field.state.meta.errors.length > 0 && (
                        <ul className="text-sm text-red-500">
                          {field.state.meta.errors.map((error, i) => (
                            <li key={i}>{error?.message}</li>
                          ))}
                        </ul>
                      )}
                  </div>
                )}
              />
            </div>
          </div>
          <Separator />

          {/* === Section: Core Services === */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Core Services</h3>

            <form.Field
              name="coreServices"
              mode="array"
              children={coreServicesField => (
                <>
                  {!coreServicesField.state.value.length ? (
                    <p className="text-gray-500">
                      No services added yet. Click "Add Core Service" to begin.
                    </p>
                  ) : (
                    coreServicesField.state.value.map((serviceItem, index) => (
                      <div
                        key={serviceItem.id}
                        className="bg-accent/20 mt-6 rounded-md border p-4"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="mb-3 font-semibold">
                            Core Service {index + 1}
                          </h4>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => coreServicesField.removeValue(index)} // Use removeValue from the array field API
                          >
                            Remove
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <form.Field
                            name={`coreServices[${index}].name`}
                            validators={{
                              onBlur: z
                                .string()
                                .min(1, "Service Name cannot be empty."),
                            }}
                            children={field => (
                              <div className="space-y-2">
                                <Label htmlFor={field.name}>Service Name</Label>
                                <Input
                                  id={field.name}
                                  name={field.name}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={e =>
                                    field.handleChange(e.target.value)
                                  }
                                />
                                {field.state.meta.errors &&
                                  field.state.meta.errors.length > 0 && (
                                    <ul className="text-sm text-red-500">
                                      {field.state.meta.errors.map(
                                        (error, i) => (
                                          <li key={i}>{error?.message}</li>
                                        )
                                      )}
                                    </ul>
                                  )}
                              </div>
                            )}
                          />
                          <form.Field
                            name={`coreServices[${index}].description`}
                            validators={{
                              onBlur: z
                                .string()
                                .min(1, "Service Description cannot be empty."),
                            }}
                            children={field => (
                              <div className="space-y-2">
                                <Label htmlFor={field.name}>Description</Label>
                                <Input
                                  id={field.name}
                                  name={field.name}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={e =>
                                    field.handleChange(e.target.value)
                                  }
                                />
                                {field.state.meta.errors &&
                                  field.state.meta.errors.length > 0 && (
                                    <ul className="text-sm text-red-500">
                                      {field.state.meta.errors.map(
                                        (error, i) => (
                                          <li key={i}>{error?.message}</li>
                                        )
                                      )}
                                    </ul>
                                  )}
                              </div>
                            )}
                          />
                          <form.Field
                            name={`coreServices[${index}].durationMin`}
                            children={field => (
                              <div className="space-y-2">
                                <Label htmlFor={field.name}>Duration Min</Label>
                                <Input
                                  id={field.name}
                                  name={field.name}
                                  type="number"
                                  step="0.5"
                                  min={0}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={e =>
                                    field.handleChange(Number(e.target.value))
                                  }
                                />
                              </div>
                            )}
                          />
                          <form.Field
                            name={`coreServices[${index}].durationMax`}
                            children={field => (
                              <div className="space-y-2">
                                <Label htmlFor={field.name}>Duration Max</Label>
                                <Input
                                  id={field.name}
                                  name={field.name}
                                  type="number"
                                  step="0.5"
                                  min={0}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={e =>
                                    field.handleChange(Number(e.target.value))
                                  }
                                />
                              </div>
                            )}
                          />
                          <form.Field
                            name={`coreServices[${index}].typicalCleanersAssigned`}
                            children={field => (
                              <div className="space-y-2">
                                <Label htmlFor={field.name}>
                                  Cleaners Assigned
                                </Label>
                                <Input
                                  id={field.name}
                                  name={field.name}
                                  type="number"
                                  min={1}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={e =>
                                    field.handleChange(Number(e.target.value))
                                  }
                                />
                              </div>
                            )}
                          />
                          <form.Field
                            name={`coreServices[${index}].pricingModel`}
                            validators={{
                              onBlur: z.enum(pricingModels),
                            }}
                            children={field => (
                              <div className="space-y-2">
                                <Label htmlFor={field.name}>
                                  Pricing Model
                                </Label>
                                <Select
                                  name={field.name}
                                  value={field.state.value}
                                  onValueChange={field.handleChange}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select model" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {pricingModels.map(model => (
                                      <SelectItem key={model} value={model}>
                                        {model}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                {field.state.meta.errors &&
                                  field.state.meta.errors.length > 0 && (
                                    <ul className="text-sm text-red-500">
                                      {field.state.meta.errors.map(
                                        (error, i) => (
                                          <li key={i}>{error?.message}</li>
                                        )
                                      )}
                                    </ul>
                                  )}
                              </div>
                            )}
                          />
                          <form.Field
                            name={`coreServices[${index}].priceMin`}
                            children={field => (
                              <div className="space-y-2">
                                <Label htmlFor={field.name}>
                                  Minimum Price
                                </Label>
                                <Input
                                  id={field.name}
                                  name={field.name}
                                  type="number"
                                  step="1"
                                  min={0}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={e =>
                                    field.handleChange(Number(e.target.value))
                                  }
                                />
                              </div>
                            )}
                          />
                          <form.Field
                            name={`coreServices[${index}].priceMax`}
                            children={field => (
                              <div className="space-y-2">
                                <Label htmlFor={field.name}>
                                  Maximum Price
                                </Label>
                                <Input
                                  id={field.name}
                                  name={field.name}
                                  type="number"
                                  step="1"
                                  min={0}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={e =>
                                    field.handleChange(Number(e.target.value))
                                  }
                                />
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    ))
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-4"
                    onClick={() =>
                      coreServicesField.pushValue({
                        name: "",
                        description: "",
                        durationMin: 0,
                        durationMax: 1,
                        typicalCleanersAssigned: 1,
                        pricingModel: "",
                        priceMin: 0,
                        priceMax: 10,
                        id: crypto.randomUUID(),
                      })
                    }
                  >
                    Add Core Service
                  </Button>
                </>
              )}
            />
          </div>
          <Separator />

          {/* === Section: Operating Hours === */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Operating Hours</h3>
            {Object.entries(form.state.values.operatingHours).map(
              ([day, _]) => {
                const dayKey = day as keyof BusinessFormData["operatingHours"];
                return (
                  <div
                    key={day}
                    className="mb-3 grid grid-cols-5 items-center gap-x-4 gap-y-2"
                  >
                    <div className="col-span-1 flex items-center space-x-2">
                      <form.Field
                        name={`operatingHours.${dayKey}.isOpen`}
                        children={field => (
                          <Checkbox
                            id={`${day}-isOpen`}
                            checked={field.state.value}
                            onCheckedChange={checked => {
                              field.handleChange(!!checked);
                              if (!checked) {
                                form.setFieldValue(
                                  `operatingHours.${dayKey}.start`,
                                  ""
                                );
                                form.setFieldValue(
                                  `operatingHours.${dayKey}.end`,
                                  ""
                                );
                              } else {
                                form.setFieldValue(
                                  `operatingHours.${dayKey}.start`,
                                  "09:00"
                                );
                                form.setFieldValue(
                                  `operatingHours.${dayKey}.end`,
                                  "17:00"
                                );
                              }
                            }}
                            onBlur={field.handleBlur}
                          />
                        )}
                      />
                      <Label htmlFor={`${day}-isOpen`} className="capitalize">
                        {day}
                      </Label>
                    </div>
                    <form.Field
                      name={`operatingHours.${dayKey}.start`}
                      children={field => (
                        <Input
                          id={`${day}-start`}
                          name={field.name}
                          type="time"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={e => field.handleChange(e.target.value)}
                          disabled={
                            !form.state.values.operatingHours[dayKey].isOpen
                          }
                          className="col-span-2"
                        />
                      )}
                    />
                    <form.Field
                      name={`operatingHours.${dayKey}.end`}
                      children={field => (
                        <Input
                          id={`${day}-end`}
                          name={field.name}
                          type="time"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={e => field.handleChange(e.target.value)}
                          disabled={
                            !form.state.values.operatingHours[dayKey].isOpen
                          }
                          className="col-span-2"
                        />
                      )}
                    />
                  </div>
                );
              }
            )}
          </div>
          <Separator />

          {/* === Section: Operations === */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Operations</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <form.Field
                name="averageTravelTimeMinutes"
                children={field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>
                      Average Travel Time (minutes)
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      min={0}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(Number(e.target.value))}
                    />
                  </div>
                )}
              />
              <form.Field
                name="currentSchedulingMethod"
                validators={{
                  onBlur: z.enum(schedulingMethods),
                }}
                children={field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>
                      Current Scheduling Method
                    </Label>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        {schedulingMethods.map(method => (
                          <SelectItem key={method} value={method}>
                            {method}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {field.state.meta.errors &&
                      field.state.meta.errors.length > 0 && (
                        <ul className="text-sm text-red-500">
                          {field.state.meta.errors.map((error, i) => (
                            <li key={i}>{error?.message}</li>
                          ))}
                        </ul>
                      )}
                  </div>
                )}
              />
            </div>
          </div>
          <Separator />

          {/* === Section: Branding & Communication === */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Branding & Communication
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <form.Field
                name="logoUrl"
                children={field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Logo URL</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="url"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              />
              <form.Field
                name="brandColorPrimary"
                children={field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Primary Brand Color</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="color"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              />
              <form.Field
                name="brandColorSecondary"
                children={field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Secondary Brand Color</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="color"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              />
            </div>
            {/* Preferred Communication Methods (Multi-Checkbox) */}
            <div className="mt-6">
              <Label>Preferred Customer Communication Methods</Label>
              <form.Field
                name="preferredCustomerCommunicationMethods"
                validators={{
                  onBlur: z.array(z.enum(communicationMethods)),
                }}
                children={field => (
                  <div>
                    <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {communicationMethods.map(method => (
                        <div
                          key={method}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`comm-method-${method}`}
                            checked={field.state.value.includes(method)}
                            onCheckedChange={checked => {
                              const currentMethods = new Set(field.state.value);
                              if (checked) {
                                currentMethods.add(method);
                              } else {
                                currentMethods.delete(method);
                              }
                              field.handleChange(Array.from(currentMethods));
                            }}
                            onBlur={field.handleBlur}
                          />
                          <Label htmlFor={`comm-method-${method}`}>
                            {method}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {field.state.meta.errors &&
                      field.state.meta.errors.length > 0 && (
                        <ul className="text-sm text-red-500">
                          {field.state.meta.errors.map((error, i) => (
                            <li key={i}>{error?.message}</li>
                          ))}
                        </ul>
                      )}
                  </div>
                )}
              />
            </div>
            <div className="mt-6">
              <form.Field
                name="additionalNotes"
                children={field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Additional Notes</Label>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                      rows={5}
                    />
                  </div>
                )}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Submit Onboarding
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
