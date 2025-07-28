import ServicesGrid from '@/components/ui/custom/servicesgrid';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import SearchBar from '@/components/ui/custom/searchbar';
import { getBusinessWithServices } from '@/lib/services';

export default async function OurServices(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';

    // ***TODO: fetch businessId from database. hardcoded right now
    const businessId = '6887d955689e4dcb75ec70e6';
    
    // Fetch business info & services from database
    const businessData = await getBusinessWithServices(businessId);

    if (!businessData) {
        return <div>Business not found</div>;
    }

    return (
        <section className='mx-1 sm:mx-10'>
            <h1 className='text-center font-bold text-3xl my-2'>Our Services</h1>
            <h2 className='text-center text-2xl mt-2 mb-4'>{businessData.businessName}</h2>
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