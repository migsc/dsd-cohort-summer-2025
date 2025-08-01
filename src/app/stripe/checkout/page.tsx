"use client";

import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";

interface BookingFormFields {
  serviceType: string;
  bedrooms: number;
  addons: string[];
  customerEmail: string;
}

const HARDCODED_PRICE_CENTS = 21400;

const HARDCODED_DEFAULTS: BookingFormFields = {
  serviceType: "deepClean",
  bedrooms: 3,
  addons: ["windowCleaning", "ovenCleaning"],
  customerEmail: "test@example.com",
};

export default function CleaningBookingForm() {
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculatedPrice = HARDCODED_PRICE_CENTS;

  const form = useForm({
    defaultValues: HARDCODED_DEFAULTS,
    onSubmit: async ({ value }) => {
      setError(null);
      setLoadingCheckout(true);
      try {
        if (calculatedPrice <= 0) {
          throw new Error("Price cannot be zero or less.");
        }

        const response = await fetch("/api/stripe/generate-stripe-checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...value,
            totalAmountInCents: calculatedPrice,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to initiate checkout.");
        }

        const data = await response.json();
        console.log("data: ", data);
        window.location.href = data.url;
      } catch (err: any) {
        setError(
          err.message || "An unexpected error occurred during checkout."
        );
        setLoadingCheckout(false);
      }
    },
  });

  return (
    <div className="mx-auto max-w-md rounded-lg bg-gray-800 p-6 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-bold text-white">
        Book Your Cleaning (Test Mode)
      </h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <form.Field
          name="serviceType"
          children={field => (
            <div>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-300"
              >
                Service Type:
              </label>

              <input
                type="text"
                id={field.name}
                name={field.name}
                value={field.state.value}
                readOnly
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 py-2 pl-3 pr-10 text-base text-white focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          )}
        />

        <form.Field
          name="bedrooms"
          children={field => (
            <div>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-300"
              >
                Number of Bedrooms:
              </label>
              <input
                type="number"
                id={field.name}
                name={field.name}
                value={field.state.value}
                readOnly
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm sm:text-sm"
              />
            </div>
          )}
        />

        <form.Field
          name="addons"
          children={field => (
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Add-ons:
              </label>
              <div className="mt-1 space-y-2">
                {HARDCODED_DEFAULTS.addons.map(addon => (
                  <div key={addon} className="flex items-center">
                    <input
                      type="checkbox"
                      id={addon}
                      name={field.name}
                      checked={true}
                      readOnly
                      className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-indigo-600"
                    />
                    <label
                      htmlFor={addon}
                      className="ml-2 text-sm capitalize text-gray-300"
                    >
                      {addon.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        />

        <form.Field
          name="customerEmail"
          children={field => (
            <div>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-300"
              >
                Your Email:
              </label>
              <input
                type="email"
                id={field.name}
                name={field.name}
                value={field.state.value}
                readOnly
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm sm:text-sm"
              />
            </div>
          )}
        />

        <div className="flex flex-col gap-2 pt-4">
          <div className="rounded bg-yellow-800 py-2 text-center text-lg font-semibold text-white">
            Hardcoded Test Price: ${(HARDCODED_PRICE_CENTS / 100).toFixed(2)}
          </div>

          {error && <p className="text-center text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loadingCheckout}
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 disabled:opacity-50"
          >
            {loadingCheckout
              ? "Processing Payment..."
              : "Confirm & Pay with Stripe"}
          </button>
        </div>
      </form>
    </div>
  );
}
