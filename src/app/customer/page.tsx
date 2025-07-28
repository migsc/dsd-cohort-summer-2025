import ServicesGrid from '@/components/ui/custom/servicesgrid';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import SearchBar from '@/components/ui/custom/searchbar';

// Array of service objects and the data they need to have
// ***THIS DATA WILL COME FROM DATABASE INSTEAD OF BEING MANUALLY INPUT***
const services = [
    {
        _id:'0',
        name: 'Standard House Cleaning',
        description: 'Regular maintenance cleaning including dusting, vacuuming, mopping, bathroom and kitchen cleaning. Perfect for ongoing home maintenance.',
        durationMin: 1.5,
        durationMax: 3,
        priceMin: 80,
        priceMax: 150,
        pricingModel: 'per hour',
    },
    {
        _id:'1',
        name: 'Deep Cleaning',
        description: 'Intensive top-to-bottom cleaning including baseboards, light fixtures, inside appliances, and areas typically missed in regular cleaning. Ideal for first-time clients or seasonal refresh.',
        durationMin: 3,
        durationMax: 6,
        priceMin: 200,
        priceMax: 400,
        pricingModel: 'per hour',
    },
    {
        _id:'2',
        name: 'Move-in/Move-out Cleaning',
        description: 'Comprehensive cleaning of empty property including inside cabinets, drawers, closets, and all surfaces. Ensures property is pristine for new occupants.',
        durationMin: 2,
        durationMax: 5,
        priceMin: 150,
        priceMax: 300,
        pricingModel: 'per hour',
    },
    {
        _id:'3',
        name: 'Window Cleaning',
        description: 'Interior and exterior window cleaning including screens, sills, and frames. Makes homes brighter and improves curb appeal.',
        durationMin: 1,
        durationMax: 3,
        priceMin: 100,
        priceMax: 250,
        pricingModel: 'per hour',
    },
    {
        _id:'4',
        name: 'Pressure Washing',
        description: 'High-pressure cleaning of exterior surfaces including driveways, sidewalks, decks, patios, and house siding. Removes dirt, mold, and grime.',
        durationMin: 1,
        durationMax: 4,
        priceMin: 150,
        priceMax: 400,
        pricingModel: 'per hour',
    },
    {
        _id:'5',
        name: 'Furniture Assembly',
        description: 'Professional assembly of furniture from retailers like IKEA, Amazon, or Wayfair. Includes tools, hardware check, and cleanup of packaging materials. Price and duration is per piece of furniture.',
        durationMin: 1/2,
        durationMax: 2,
        priceMin: 50,
        priceMax: 150,
        pricingModel: 'per hour',
    },
    {
        _id:'6',
        name: 'Gutter Cleaning',
        description: 'Removal of leaves, debris, and blockages from gutters and downspouts. Includes inspection for damage and proper water flow testing.',
        durationMin: 1,
        durationMax: 3,
        priceMin: 100,
        priceMax: 250,
        pricingModel: 'per hour'
    }
];

export default async function OurServices(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';

    return (
        <section className='mx-1 sm:mx-10'>
            <h1 className='text-center font-bold text-3xl mt-2 mb-4'>Our Services</h1>
            {!query && (
                <p className='text-center'>
                    Suzy's Cleaners offer services ranging from a standard house cleaning to a true deep clean. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt eum repellat corrupti, delectus voluptas cumque quos quasi perferendis deleniti explicabo? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio eligendi assumenda deleniti veniam aliquid ipsa dignissimos aspernatur!
                </p>
            )}
            <div className='w-full flex justify-center my-5'>
                <SearchBar placeholder='Search services...'/>
            </div>
            <Suspense key={query} fallback={<Skeleton className='h-4 w-[250px]' />}>
                <ServicesGrid services={services} query={query}></ServicesGrid>
            </Suspense>
        </section>
    );
};