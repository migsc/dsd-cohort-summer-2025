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

export interface RebookingFormProps {
  isOpen: boolean;
  onClose: () => void;
//   serviceId: string;
//   operatingHours: OperatingHours;
//   notes: string;
}

export default function RebookingForm({
    isOpen,
    onClose,
    // serviceId,
    // operatingHours,
    // notes,
}: RebookingFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    return (
        <div>
            ***TODO:Rebooking Form
        </div>
    )
}