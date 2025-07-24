"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import React from "react";
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
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { z } from "zod";

type ClientOnboardingFormData = {
  preferredContactMethod?: string;
  addressStreet?: string;
  addressCity?: string;
  addressState?: string;
  addressZip?: string;
  addressCountry?: string;
};

const preferredContactMethods = [
  "Email",
  "Phone",
  "SMS",
  "Client Portal",
] as const;

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

const ClientOnboardingSchema = z.object({
  preferredContactMethod: z
    .enum(preferredContactMethods, {
      message: "Please select a valid contact method",
    })
    .optional()
    .or(z.literal("")),
  addressStreet: z.string().optional().or(z.literal("")),
  addressCity: z.string().optional().or(z.literal("")),
  addressState: z
    .enum(usStates, { message: "Invalid state selected." })
    .optional()
    .or(z.literal("")),
  addressZip: z
    .string()
    .regex(/^\d{5}(?:[-\s]\d{4})?$/, "Invalid zip code format")
    .optional()
    .or(z.literal("")),
  addressCountry: z.string().optional().or(z.literal("")),
});
const defaultClientValues: ClientOnboardingFormData = {
  preferredContactMethod: "",
  addressStreet: "",
  addressCity: "",
  addressState: "",
  addressZip: "",
  addressCountry: "",
};

export default function ClientOnboardingForm({ userId }: { userId: string }) {
  const router = useRouter();

  const form = useForm({
    defaultValues: defaultClientValues,

    validators: {
      onSubmit: ClientOnboardingSchema,
    },

    onSubmit: async ({ value }) => {
      try {
        const response = await fetch("/api/onboarding/client", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });

        if (response.ok) {
          toast.success("Client profile created successfully!");
          router.push("/dashboard/client");
        } else {
          const responseError = await response.json();
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <Card className="mx-auto my-8 w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Client Onboarding</CardTitle>
        <CardDescription>
          Please provide some additional details to complete your profile.
        </CardDescription>
      </CardHeader>
      <form
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <CardContent className="space-y-8">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Preferences</h3>
            <form.Field
              name="preferredContactMethod"
              validators={{
                onBlur: z
                  .enum(preferredContactMethods, {
                    message: "Invalid method selected",
                  })
                  .optional(),
              }}
              children={field => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Preferred Contact Method</Label>
                  <Select
                    name={field.name}
                    value={field.state.value || ""}
                    onValueChange={field.handleChange}
                    onOpenChange={field.handleBlur}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a method" />
                    </SelectTrigger>
                    <SelectContent>
                      {preferredContactMethods.map(method => (
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
          <Separator />

          <div>
            <h3 className="mb-4 text-lg font-semibold">Home Address</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <form.Field
                  name="addressStreet"
                  validators={{
                    onBlur: z
                      .string()
                      .min(3, "Street address is required")
                      .optional(),
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
                name="addressCity"
                validators={{
                  onBlur: z.string().min(2, "City is required").optional(),
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
                name="addressState"
                validators={{
                  onBlur: z
                    .enum(usStates, { message: "Invalid state selected." })
                    .optional(),
                }}
                children={field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>State</Label>
                    <Select
                      name={field.name}
                      value={field.state.value || ""}
                      onValueChange={field.handleChange}
                      onOpenChange={field.handleBlur}
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
                name="addressZip"
                validators={{
                  onBlur: z
                    .string()
                    .regex(/^\d{5}(?:[-\s]\d{4})?$/, "Invalid zip code format")
                    .optional(),
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
                name="addressCountry"
                validators={{
                  onBlur: z.string().min(2, "Country is required").optional(),
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
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Complete Client Profile
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
