import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function CardDemo() {
  return (
    <Card className="container mx-auto w-full max-w-sm px-4 py-2">
      <CardHeader>
        <CardTitle>Onboarding Options</CardTitle>
        <CardDescription>
          Choose whether you want to onboard as Business or Customer
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex-col gap-2">
        <Link href={"/onboarding/customer"} className="w-full ">
          <Button className="w-full cursor-pointer">Customer</Button>
        </Link>
        <Link href={"/onboarding/business"} className="w-full">
          <Button className="w-full cursor-pointer">Business</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
