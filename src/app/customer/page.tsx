import ServicesGrid from '@/components/ui/custom/servicesgrid';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import SearchBar from '@/components/ui/custom/searchbar';
import { getBusinessWithServices } from '@/lib/services';
import PortalHeader from '@/components/ui/custom/portalHeader';

export default async function OurServices(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';

    // ***TODO: fetch businessId from database. hardcoded right now
    const businessId = '6888eda1126c69ebb2d37bf2';
    
    // Fetch business info & services from database
    const businessData = await getBusinessWithServices(businessId);

    if (!businessData) {
        return (
            <div>
                <PortalHeader pageName='Our Services' userName="Jane Doe"></PortalHeader>
                <div>Business not found</div>
            </div>
    );
    }

    return (
        <section className='mx-1 sm:mx-10'>
            <PortalHeader pageName='Our Services' userName="Jane Doe"></PortalHeader>
            <h2 className='text-center text-2xl mt-5 mb-4'>{businessData.businessName}</h2>
            {!query && (
                <p className='text-center'>
                    {businessData.businessDescription}
                </p>
            )}
            <div className='w-full flex justify-center my-5'>
                <SearchBar placeholder='Search services...'/>
            </div>
            <Suspense key={query} fallback={<Skeleton className='h-4 w-[250px]' />}>
                <ServicesGrid services={businessData.services} query={query}></ServicesGrid>
            </Suspense>
        </section>
    );
};