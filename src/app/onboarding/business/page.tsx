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
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  contactTitles,
  usStates,
  pricingModels,
  schedulingMethods,
  communicationMethods,
  defaultBusinessValues,
  BusinessOnboardingSchema,
  type BusinessFormData,
} from "./schema/business.schema";

// TEMP. Its the same function that generates in the backend so it may just stay this way.
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

export default function BusinessOnboarding() {
  const router = useRouter();
  const form = useForm({
    defaultValues: defaultBusinessValues,
    validators: {
      onSubmit: BusinessOnboardingSchema,
    },
    onSubmit: async ({ value }) => {
      const businessSlug = slugify(value.businessName);
      try {
        const response = await fetch("/api/onboarding/business", {
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
        toast.success("Business onboarding successful!");
        router.push(`/${businessSlug}/admin`);
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
          <div>
            <h3 className="mb-4 text-lg font-semibold">Business Information</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <form.Field
                name="businessName"
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
                    <Label htmlFor={field.name}>Years in Business (yrs)</Label>
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

          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Person</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <form.Field
                name="contactPersonName"
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
                children={field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Contact Person Title</Label>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={value => {
                        field.handleChange(
                          value as (typeof contactTitles)[number]
                        );
                      }}
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

          <div>
            <h3 className="mb-4 text-lg font-semibold">Business Address</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <form.Field
                  name="businessAddressStreet"
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
                children={field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>State</Label>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={value => {
                        field.handleChange(value as (typeof usStates)[number]);
                      }}
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
              <form.Field
                name="serviceAreaRadius"
                children={field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Service Area Radius (mi)</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      min={0}
                      step={5}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(Number(e.target.value))}
                    />
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
                            onClick={() => coreServicesField.removeValue(index)}
                          >
                            Remove
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <form.Field
                            name={`coreServices[${index}].name`}
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
                                <Label htmlFor={field.name}>
                                  Duration Min (hrs)
                                </Label>
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
                                <Label htmlFor={field.name}>
                                  Duration Max (hrs)
                                </Label>
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
                            children={field => (
                              <div className="space-y-2">
                                <Label htmlFor={field.name}>
                                  Pricing Model
                                </Label>
                                <Select
                                  name={field.name}
                                  value={field.state.value}
                                  onValueChange={value => {
                                    field.handleChange(
                                      value as (typeof pricingModels)[number]
                                    );
                                  }}
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
                            name={`coreServices[${index}].rate`}
                            children={field => {
                              return (
                                <div className="space-y-2">
                                  <Label htmlFor={field.name}>Rate</Label>
                                  <Input
                                    id={field.name}
                                    name={field.name}
                                    type="number"
                                    min={0}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={e =>
                                      field.handleChange(Number(e.target.value))
                                    }
                                  />
                                </div>
                              );
                            }}
                          />
                        </div>

                        {/* Marketing Prices Section */}
                        <div className="mt-8 rounded-md border border-dashed p-4">
                          <h4 className="mb-4 text-center text-lg font-semibold text-gray-700">
                            Marketing Prices (Display Only)
                          </h4>
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <form.Field
                              name={`coreServices[${index}].priceMin`}
                              children={field => (
                                <div className="space-y-2">
                                  <Label htmlFor={field.name}>
                                    Minimum Price ($)
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
                                    Maximum Price ($)
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
                        pricingModel: "Per Job",
                        priceMin: 0,
                        priceMax: 10,
                        id: crypto.randomUUID(),
                        rate: 0,
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
                children={field => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>
                      Current Scheduling Method
                    </Label>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={value => {
                        field.handleChange(
                          value as (typeof schedulingMethods)[number]
                        );
                      }}
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

            <div className="mt-6">
              <Label>Preferred Customer Communication Methods</Label>
              <form.Field
                name="preferredCustomerCommunicationMethods"
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
        <CardFooter className="flex-col pt-12">
          <form.Subscribe>
            {state => (
              <Button type="submit" className="relative w-full cursor-pointer">
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
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
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
