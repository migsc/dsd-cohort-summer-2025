"use client";

import { useForm } from "@tanstack/react-form";
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

import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

import {
  usStates,
  preferredContactMethods,
  CustomerOnboardingSchema,
  defaultCustomerValues,
} from "./schema/customer.schema";

export default function CustomerOnboarding() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const business = searchParams.get("business");

  let redirectURL = "/business-list";
  if (business) {
    redirectURL = `/${business}`;
  }

  const form = useForm({
    defaultValues: defaultCustomerValues,

    onSubmit: async ({ value }) => {
      try {
        const response = await fetch("/api/onboarding/customer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });

        if (response.ok) {
          toast.success("Customer onboarding successful!");
          router.push(redirectURL);
        } else {
          const responseError = await response.json();
          toast.error(responseError.error || "Onboarding failed.");
        }
      } catch (err) {
        console.error(err);
        toast.error("An unexpected error occurred during onboarding.");
      }
    },
  });

  return (
    <Card className="mx-auto my-8 w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Customer Onboarding</CardTitle>
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
            <div className="space-y-4">
              <form.Field
                name="phoneNumber"
                children={field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Phone Number</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="tel"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              />
              <form.Field
                name="preferredContactMethod"
                children={field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Preferred Contact Method</Label>
                    <Select
                      name={field.name}
                      value={field.state.value || ""}
                      onValueChange={value => {
                        field.handleChange(
                          value as (typeof preferredContactMethods)[number]
                        );
                      }}
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
                  </div>
                )}
              />
            </div>
          </div>
          <Separator />

          <div>
            <h3 className="mb-4 text-lg font-semibold">Home Address</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <form.Field
                  name="addressStreet"
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
                    </div>
                  )}
                />
              </div>
              <form.Field
                name="addressCity"
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
                  </div>
                )}
              />
              <form.Field
                name="addressState"
                children={field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>State</Label>
                    <Select
                      name={field.name}
                      value={field.state.value || ""}
                      onValueChange={value => {
                        field.handleChange(value as (typeof usStates)[number]);
                      }}
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
                  </div>
                )}
              />
              <form.Field
                name="addressZip"
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
                  </div>
                )}
              />
              <form.Field
                name="addressCountry"
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
                  </div>
                )}
              />
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="mb-4 text-lg font-semibold">Property Details</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <form.Field
                name="rooms"
                children={field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Number of Rooms</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      step="0.5"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e =>
                        field.handleChange(
                          e.target.value ? parseFloat(e.target.value) : 0
                        )
                      }
                    />
                  </div>
                )}
              />
              <form.Field
                name="squareFootage"
                children={field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Square Footage</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      step="any"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e =>
                        field.handleChange(
                          e.target.value ? parseFloat(e.target.value) : 0
                        )
                      }
                    />
                  </div>
                )}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col pt-12">
          <form.Subscribe>
            {state => (
              <Button
                type="submit"
                className="relative w-full cursor-pointer"
                disabled={state.isSubmitting}
              >
                {state.isSubmitting ? (
                  <>
                    <svg
                      className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            )}
          </form.Subscribe>
        </CardFooter>
      </form>
    </Card>
  );
}
