import ServicesGrid from "@/components/ui/custom/servicesgrid";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import SearchBar from "@/components/ui/custom/searchbar";
import prisma from "@/lib/prisma";
import { getBusinessWithServices } from "@/lib/services";

interface PageProps {
  params: Promise<{
    businessSlug: string;
  }>;
  searchParams?: Promise<{
    query?: string;
  }>;
}

export default async function OurServices(props: PageProps) {
  const { params, searchParams: searchParamsPromise } = props;
  const { businessSlug } = await params;
  const searchParams = await searchParamsPromise;
  const query = searchParams?.query || "";

  let business;
  try {
    business = await prisma.business.findFirst({
      where: {
        businessSlug: businessSlug,
      },
    });

    if (!business) {
      return (
        <div>
          <h1 className="my-2 text-center text-3xl font-bold">Our Services</h1>
          <div>Business not found for slug: {businessSlug}</div>
        </div>
      );
    }
  } catch (error) {
    console.error(`Error fetching business for slug ${businessSlug}:`, error);
    return (
      <div>
        <h1 className="my-2 text-center text-3xl font-bold">Our Services</h1>
        <div>Error loading business data.</div>
      </div>
    );
  }

  console.log(business.businessName);

  return (
    <section className="mx-1 sm:mx-10">
      <h1 className="my-2 text-center text-3xl font-bold">Our Services</h1>
      <h2 className="mb-4 mt-2 text-center text-2xl">
        {business.businessName}
      </h2>

      <p className="text-center text-black">{business.businessDescription}</p>

      <div className="my-5 flex w-full justify-center">
        <SearchBar placeholder="Search services..." />
      </div>
      <Suspense fallback={<Skeleton className="h-4 w-[250px]" />}>
        <ServicesGrid
          services={business.coreServices}
          query={query}
        ></ServicesGrid>
      </Suspense>
    </section>
  );
}
