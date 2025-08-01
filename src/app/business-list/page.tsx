import prisma from "@/lib/prisma";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BusinessItem {
  businessName: string;
  businessSlug: string;
}

export default async function BusinessesListPage() {
  let businesses: BusinessItem[] = [];
  let error: string | null = null;

  try {
    const fetchedBusinesses = await prisma.business.findMany({
      select: {
        businessName: true,
        businessSlug: true,
      },
    });
    businesses = fetchedBusinesses;
  } catch (err: any) {
    console.error("Error fetching businesses:", err);
    error = "Failed to fetch businesses. Please try again later.";
  }

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Select Your Business
      </h1>

      {error && (
        <Card className="border-red-500 bg-red-50 text-red-700">
          <CardHeader>
            <CardTitle className="text-red-800">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {!error && businesses.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>No Businesses Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              It looks like there are no businesses available yet.
            </p>
          </CardContent>
        </Card>
      )}

      {!error && businesses.length > 0 && (
        <ScrollArea className="h-[calc(100vh-180px)] w-full rounded-md border p-4">
          <div className="grid grid-cols-1 gap-4">
            {businesses.map(business => (
              <Link
                key={business.businessSlug}
                href={`/${business.businessSlug}`}
                passHref
              >
                <Card className="cursor-pointer transition-shadow duration-200 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle>{business.businessName}</CardTitle>
                    <CardDescription>
                      {`Access ${business.businessName}'s dashboard.`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-end">
                    <Button variant="outline">Go to Business</Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
