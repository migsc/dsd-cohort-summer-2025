import ServicesGrid from "@/components/ui/custom/servicesgrid";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import SearchBar from "@/components/ui/custom/searchbar";
import { getBusinessWithServices } from "@/lib/services";

export default async function OurServices(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  // ***TODO: fetch businessId from database. hardcoded right now
  const businessId = "6887f7eae150d0e2757ea0b4";

  // Fetch business info & services from database
  const businessData = await getBusinessWithServices(businessId);

  if (!businessData) {
    return <div>Business not found</div>;
  }

  return (
    <section className="mx-1 sm:mx-10">
      <h1 className="my-2 text-center text-3xl font-bold">Our Services</h1>
      <h2 className="mb-4 mt-2 text-center text-2xl">
        {businessData.businessName}
      </h2>
      {!query && (
        <p className="text-center">{businessData.businessDescription}</p>
      )}
      <div className="my-5 flex w-full justify-center">
        <SearchBar placeholder="Search services..." />
      </div>
      <Suspense key={query} fallback={<Skeleton className="h-4 w-[250px]" />}>
        <ServicesGrid
          services={businessData.services}
          query={query}
        ></ServicesGrid>
      </Suspense>
    </section>
  );
}
