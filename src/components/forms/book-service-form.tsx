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

export interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
  serviceName: string;
  serviceDuration: string;
  servicePrice: string;
}

export interface BookingFormData {
  serviceId: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  notes?: string;
  serviceDuration: string;
  servicePrice: string;
}

const timeSlots = [
  "8:00 AM - 10:00 AM",
  "10:00 AM - 12:00 PM",
  "12:00 PM - 2:00 PM",
  "2:00 PM - 4:00 PM",
  "4:00 PM - 6:00 PM",
  "6:00 PM - 8:00 PM",
];

export default function BookingForm({
  isOpen,
  onClose,
  serviceId,
  serviceName,
  serviceDuration,
  servicePrice,
}: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const form = useForm({
    defaultValues: {
      date: "",
      timeSlot: "",
      notes: "",
    },
    onSubmit: async value => {
      const bookingInfo = {
        ...value.value,
        serviceId,
        serviceName,
        serviceDuration,
        servicePrice,
      };

      console.log("bookingInfo: ", bookingInfo);
      try {
        const response = await fetch(`/api/bookings`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingInfo),
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
            Book {serviceName}
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
          <form.Field name="date">
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
              </div>
            )}
          </form.Field>

          <form.Field name="timeSlot">
            {field => (
              <div className="space-y-2">
                <Label htmlFor={field.name} className="flex items-center gap-2">
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
                    {timeSlots.map(slot => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
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
