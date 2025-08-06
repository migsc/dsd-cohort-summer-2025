"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Calendar, Clock } from "lucide-react";

import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { type CoreService, type OperatingHours } from "prisma/generated";
import {
  createInclusiveRange,
  getFormattedTimeSlots,
} from "@/app/[businessSlug]/(customer)/utils";

export interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  service: CoreService;
  operatingHours: OperatingHours;
  businessSlug: string;
}

export default function BookingForm({
  isOpen,
  onClose,
  service,
  operatingHours,
  businessSlug,
}: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper function to get valid durations from durationMin and durationMax
  // returns array, (e.g. If the durationMin = "3" and durationMax = "7" this returns ["3", "4", "5", "6", "7"])
  const validDurationOptions = createInclusiveRange(
    service.durationMin,
    service.durationMax
  );

  const today = new Date().toISOString().split("T")[0];

  const form = useForm({
    defaultValues: {
      date: "",
      timeSlot: "",
      notes: "",
      duration: validDurationOptions[0], // The first value in validDurationOptions
    },

    onSubmit: async value => {
      const bookingFormValues = {
        ...value.value,
        service,
      };

      console.log("bookingInfo: ", bookingFormValues);
      try {
        const response = await fetch(`/api/${businessSlug}/customer/bookings`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingFormValues),
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleClose = () => {
    if (!isSubmitting) {
      form.reset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Book {service.name}
          </DialogTitle>
          <DialogDescription>
            Select your preferred date and time for this service. We'll confirm
            your booking shortly.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={e => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
          className="space-y-6"
        >
          <form.Field
            name="date"
            validators={{
              onChange: ({ value }) =>
                value ? undefined : "Preferred Date is required.",
            }}
          >
            {field => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Preferred Date</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="date"
                  min={today}
                  className="w-full"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                />
                {field.state.meta?.errors?.length > 0 ? (
                  <div className="mt-1 text-sm text-red-500">
                    {field.state.meta.errors.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </form.Field>

          <form.Field name="duration">
            {field => (
              <div className="space-y-2">
                <Label htmlFor={field.name} className="flex items-center gap-2">
                  Duration (hrs)
                </Label>
                <Select
                  onValueChange={value => {
                    field.handleChange(value);

                    // Every time the value of duration changes, reset the value of time slot.
                    field.form.setFieldValue("timeSlot", "");
                  }}
                  defaultValue={field.state.value}
                  onOpenChange={open => !open && field.handleBlur()}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {validDurationOptions.map(slot => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </form.Field>

          <form.Field
            name="timeSlot"
            validators={{
              onChange: ({ value }) =>
                value ? undefined : "Time Slot is required.",
            }}
          >
            {field => {
              const duration = field.form.getFieldValue("duration");

              // Given a duration and operating hours, (We only use monday, too complicated to derive day of week from date string)
              // this helper function returns an array of string of the form "10:00 AM - 02:00 PM" representing all valid
              // time slots in a presentable format.
              const validTimeSlots = getFormattedTimeSlots(
                duration,
                operatingHours.monday.start,
                operatingHours.monday.end
              );

              return (
                <div className="space-y-2">
                  <Label
                    htmlFor={field.name}
                    className="flex items-center gap-2"
                  >
                    <Clock className="h-4 w-4" />
                    Time Slot
                  </Label>
                  <Select
                    onValueChange={field.handleChange}
                    defaultValue={field.state.value}
                    onOpenChange={open => !open && field.handleBlur()}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {validTimeSlots.map(slot => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {field.state.meta?.errors?.length > 0 ? (
                    <div className="mt-1 text-sm text-red-500">
                      {field.state.meta.errors.map((error, index) => (
                        <p key={index}>{error}</p>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            }}
          </form.Field>

          <form.Field name="notes">
            {field => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>
                  Special Instructions (Optional)
                </Label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  placeholder="Any specific requests or notes for our team..."
                  className="min-h-[80px] resize-none"
                  maxLength={500}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={e => field.handleChange(e.target.value)}
                />
                <p className="text-right text-xs text-gray-500">
                  {field.state.value?.length || 0}/500 characters
                </p>
              </div>
            )}
          </form.Field>
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={form.state.isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <form.Subscribe
              selector={state => ({
                canSubmit: state.canSubmit,
                isSubmitting: state.isSubmitting,
              })}
            >
              {state => (
                <Button
                  type="submit"
                  className="w-full flex-1"
                  disabled={!state.canSubmit || state.isSubmitting}
                >
                  {state.isSubmitting ? "Booking..." : "Book Service"}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}