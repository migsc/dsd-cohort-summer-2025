import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function OnboardingOptionsCard() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="mx-auto w-full max-w-lg px-6 py-8 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="mb-2 text-4xl font-bold tracking-tight">
            Onboarding Options
          </CardTitle>
          <CardDescription className="text-md text-gray-600">
            Choose whether you want to onboard as a Business or a Customer.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex-col gap-4 pt-6">
          <Link href={"/onboarding/customer"} className="w-full">
            <Button
              className="w-full cursor-pointer py-6 text-lg"
              aria-label="Onboard as Customer"
            >
              Customer
            </Button>
          </Link>
          <Link href={"/onboarding/business"} className="w-full">
            <Button
              className="w-full cursor-pointer py-6 text-lg"
              variant="outline"
              aria-label="Onboard as Business"
            >
              Business
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
