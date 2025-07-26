import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction, // Not used, consider removing if truly unused
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link"; // App Router: import { Link } from "next/link";

export default function CardDemo() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
    <Card className="container mx-auto w-full h-80 max-w-lg px-4 py-2">
      <CardHeader>
        <CardTitle className="text-4xl">Onboarding Options</CardTitle>
        <CardDescription>
          Choose whether you want to onboard as Business or User
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex-col gap-2">
        <Link href={"/onboarding/client"} className="w-full">
          <Button className="w-full">Client</Button>
        </Link>
        <Link href={"/onboarding/business"} className="w-full">
          <Button className="w-full">Business</Button>
        </Link>
      </CardFooter>
    </Card>
    </div>
  );
}
