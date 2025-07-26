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
    <div className="flex items-center justify-center w-full h-screen">
    <Card className="container mx-auto w-full h-80 max-w-lg px-4 py-2">
      <CardHeader>
        <CardTitle className="text-4xl">Onboarding Options</CardTitle>
        <CardDescription>
          Choose whether you want to onboard as Business or Customer
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex-col gap-2">
        <Link href={"/onboarding/customer"} className="w-full ">
          <Button className="w-full cursor-pointer">Customer</Button>
        </Link>
        <Link href={"/onboarding/business"} className="w-full">
          <Button className="w-full cursor-pointer">Business</Button>
        </Link>
      </CardFooter>
    </Card>
    </div>
  );
}
