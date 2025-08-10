"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Save, ChevronRight } from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Customer } from "prisma/generated";
import {
  preferredContactMethods,
  usStates,
} from "@/app/onboarding/customer/schema/customer.schema";

type TabId = "contactPreferences" | "address" | "propertyDetails";

interface NavItem {
  id: TabId;
  label: String;
}

const NavItems: NavItem[] = [
  {
    id: "contactPreferences",
    label: "Contact Preferences",
  },
  {
    id: "address",
    label: "Home Address",
  },
  {
    id: "propertyDetails",
    label: "Property Details",
  },
];

export default function Settings({ initialData }: { initialData: Customer }) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("contactPreferences");

  const router = useRouter();

  const handleEditingToggle = () => {
    if (isEditing) {
      setIsEditing(false);
      form.reset();
      toast("Edit mode disabled.", {
        description: "Changes have been discarded.",
      });
    } else {
      setIsEditing(true);
      toast("Edit mode enabled.", {
        description: "You can now make changes to your customer profile.",
      });
    }
  };

  const form = useForm({
    defaultValues: initialData,
    onSubmit: async ({ value }) => {
      console.log("submit");
      try {
        const response = await fetch("/api/customer/update-configuration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });

        if (!response.ok) {
          const responseError = await response.json();
          console.log(responseError);
          toast.error("Failed to update customer configuration.");
          return;
        }
        toast.success("Customer configuration updated successfully!");
        setIsEditing(false);
        router.refresh();
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <form
      onSubmit={e => {
        console.log("on submit");
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <div className="container mx-auto flex flex-col gap-10 py-6">
        <div className="flex items-center justify-between p-5">
          <div className="">
            <div className="text-xl font-bold">Customer Profile</div>
            <div className="text-md">
              Manage your customer profile and settings.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div>
              {isEditing && (
                <form.Subscribe>
                  {state => (
                    <Button
                      type="submit"
                      className="bor relative cursor-pointer border-2"
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
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Save /> Save Changes
                        </span>
                      )}
                    </Button>
                  )}
                </form.Subscribe>
              )}
            </div>
            <Button
              type="button"
              className="cursor-pointer"
              onClick={handleEditingToggle}
            >
              {isEditing ? "Cancel Editing" : "Edit Profile"}
            </Button>
          </div>
        </div>
        <div className="flex">
          <Card>
            <CardContent>
              <nav className="flex flex-col">
                {NavItems.map(item => (
                  <button
                    type="button"
                    key={item.id}
                    className={`flex cursor-pointer items-center justify-between rounded-sm px-4 py-3 text-left ${
                      activeTab === item.id
                        ? "text-accent-foreground bg-gray-500"
                        : "hover:bg-accent/50"
                    }`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <div className="flex items-center gap-3">
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="ml-1 h-4 w-4 opacity-50" />
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>

          <div className="flex-1 p-5">
            <div>
              {activeTab === "contactPreferences" && (
                <div>
                  <h3 className="mb-4 text-lg font-semibold">
                    Contact Preferences
                  </h3>
                  <div className="space-y-4">
                    <form.Field
                      name="phoneNumber"
                      children={field => (
                        <div className="space-y-2">
                          <Label htmlFor={field.name}>Phone Number</Label>
                          <Input
                            className="w-fit"
                            id={field.name}
                            name={field.name}
                            type="tel"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={e => field.handleChange(e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                      )}
                    />
                    <form.Field
                      name="preferredContactMethod"
                      children={field => (
                        <div className="space-y-2">
                          <Label htmlFor={field.name}>
                            Preferred Contact Method
                          </Label>
                          <Select
                            name={field.name}
                            value={field.state.value || ""}
                            onValueChange={value => {
                              field.handleChange(
                                value as (typeof preferredContactMethods)[number]
                              );
                            }}
                            onOpenChange={field.handleBlur}
                            disabled={!isEditing}
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
              )}
              {activeTab === "address" && (
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
                              value={field.state.value ?? ""}
                              onBlur={field.handleBlur}
                              onChange={e => field.handleChange(e.target.value)}
                              disabled={!isEditing}
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
                            value={field.state.value ?? ""}
                            onBlur={field.handleBlur}
                            onChange={e => field.handleChange(e.target.value)}
                            disabled={!isEditing}
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
                              field.handleChange(
                                value as (typeof usStates)[number]
                              );
                            }}
                            onOpenChange={field.handleBlur}
                            disabled={!isEditing}
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
                            value={field.state.value ?? ""}
                            onBlur={field.handleBlur}
                            onChange={e => field.handleChange(e.target.value)}
                            disabled={!isEditing}
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
                            value={field.state.value ?? ""}
                            onBlur={field.handleBlur}
                            onChange={e => field.handleChange(e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
              )}
              {activeTab === "propertyDetails" && (
                <div>
                  <h3 className="mb-4 text-lg font-semibold">
                    Property Details
                  </h3>
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
                            disabled={!isEditing}
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
                            disabled={!isEditing}
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
