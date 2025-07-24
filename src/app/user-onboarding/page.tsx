"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import z from "zod";

export default function UserOnboardingPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // 1. Redirect if the user has already completed onboarding

    useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => {
        if (data?.user?.onboarded) {
          router.push("/dashboard");
        }
      });
  }, [router]);

  const form = useForm({
    defaultValues: {
      phoneNumber: "",
      role: "User",
    },
    onSubmit: async ({ value }) => {
      const res = await fetch("/api/user-onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });

      if (res.ok) {
        toast.success("Onboarding complete!");
        router.push("/dashboard");
      } else {
        toast.error("Failed to update user info");
      }
    },
    validators: {
      onSubmit: z.object({
        phoneNumber: z.string().min(1, "Required"),
        role: z.enum(["User", "Customer"]),
      }),
    },
  });

  // 2. Block render until we know if they're onboarded
  if (isPending || session?.user?.onboarded) {
    return null;
  }

  // 3. Onboarding form UI
  return (
    <div className="mx-auto mt-10 max-w-md p-6">
      <h1 className="mb-6 text-center text-2xl font-semibold">User Onboarding</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
        className="space-y-4"
      >
        <div>
          <form.Field name="phoneNumber">
            {(field) => (
              <>
                <Label htmlFor={field.name}>Phone Number</Label>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </>
            )}
          </form.Field>
        </div>

        <div>
          <form.Field name="role">
            {(field) => (
              <>
                <Label htmlFor={field.name}>Role</Label>
                <select
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                >
                  <option value="User">User</option>
                  <option value="Customer">Customer</option>
                </select>
              </>
            )}
          </form.Field>
        </div>

        <form.Subscribe>
          {(state) => (
            <Button type="submit" disabled={!state.canSubmit || state.isSubmitting}>
              {state.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
