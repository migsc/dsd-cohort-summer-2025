import ServicesGrid from "@/components/ui/custom/servicesgrid";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import SearchBar from "@/components/ui/custom/searchbar";
import prisma from "@/lib/prisma";
import { LoggedOutPortalHeader, PortalHeader } from "@/components/ui/custom/portalHeader";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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
  let coreService;
  try {
    business = await prisma.business.findFirst({
      where: {
        businessSlug: businessSlug,
      },
    });
    coreService = await prisma.coreService.findMany({
      where:{
        businessId: business?.id
      }
    })

    if (!business) {
      return (
        <div>
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

  // check if logged in
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="mx-1 sm:mx-10">
      {(!session || !session.user) ? (
        <LoggedOutPortalHeader pageName="Our Services"></LoggedOutPortalHeader>
      ) : (
        <PortalHeader 
        pageName="Our Services" 
        userName={session.user.name || "Customer"}
        />
      )}
      <h2 className="mb-1 md:mb-4 mt-2 text-center text-lg md:text-2xl">
        {business.businessName}
      </h2>

      <p className="text-center text-base">{business.businessDescription}</p>

      <div className="my-5 flex w-full justify-center">
        <SearchBar placeholder="Search services..." />
      </div>
      <Suspense fallback={<Skeleton className="h-4 w-[250px]" />}>
        <ServicesGrid
          services={coreService}
          query={query}
        ></ServicesGrid>
      </Suspense>
    </div>
  );
}
