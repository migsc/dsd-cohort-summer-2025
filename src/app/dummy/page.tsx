import ServicesGrid from '@/components/ui/servicesgrid';

// Array of service objects and the data they need to have
// ***THIS DATA WILL COME FROM DATABASE INSTEAD OF BEING MANUALLY INPUT***
const services = [
    {
        _id:'0',
        name: 'Standard House Cleaning',
        desc: 'Regular maintenance cleaning including dusting, vacuuming, mopping, bathroom and kitchen cleaning. Perfect for ongoing home maintenance.',
        durationMin: 1.5,
        durationMax: 3,
        durationUnits: 'hours',
        priceMin: 80,
        priceMax: 150,
        priceUnit: '$'
    },
    {
        _id:'1',
        name: 'Deep Cleaning',
        desc: 'Intensive top-to-bottom cleaning including baseboards, light fixtures, inside appliances, and areas typically missed in regular cleaning. Ideal for first-time clients or seasonal refresh.',
        durationMin: 3,
        durationMax: 6,
        durationUnits: 'hours',
        priceMin: 200,
        priceMax: 400,
        priceUnit: '$'
    },
    {
        _id:'2',
        name: 'Move-in/Move-out Cleaning',
        desc: 'Comprehensive cleaning of empty property including inside cabinets, drawers, closets, and all surfaces. Ensures property is pristine for new occupants.',
        durationMin: 2,
        durationMax: 5,
        durationUnits: 'hours',
        priceMin: 150,
        priceMax: 300,
        priceUnit: '$'
    },
    {
        _id:'3',
        name: 'Window Cleaning',
        desc: 'Interior and exterior window cleaning including screens, sills, and frames. Makes homes brighter and improves curb appeal.',
        durationMin: 1,
        durationMax: 3,
        durationUnits: 'hours',
        priceMin: 100,
        priceMax: 250,
        priceUnit: '$'
    },
    {
        _id:'4',
        name: 'Pressure Washing',
        desc: 'High-pressure cleaning of exterior surfaces including driveways, sidewalks, decks, patios, and house siding. Removes dirt, mold, and grime.',
        durationMin: 1,
        durationMax: 4,
        durationUnits: 'hours',
        priceMin: 150,
        priceMax: 400,
        priceUnit: '$'
    },
    {
        _id:'5',
        name: 'Furniture Assembly',
        desc: 'Professional assembly of furniture from retailers like IKEA, Amazon, or Wayfair. Includes tools, hardware check, and cleanup of packaging materials. Price and duration is per piece of furniture.',
        durationMin: 1/2,
        durationMax: 2,
        durationUnits: 'hours',
        priceMin: 50,
        priceMax: 150,
        priceUnit: '$'
    },
    {
        _id:'6',
        name: 'Gutter Cleaning',
        desc: 'Removal of leaves, debris, and blockages from gutters and downspouts. Includes inspection for damage and proper water flow testing.',
        durationMin: 1,
        durationMax: 3,
        durationUnits: 'hours',
        priceMin: 100,
        priceMax: 250,
        priceUnit: '$'
    }
];

// Page to display services
export default function OurServices() {
    return (
        <section className='mx-3 sm:mx-10'>
            <h1 className='text-center font-bold text-3xl mb-4'>Our Services</h1>
            {/* Business Description - will be configured by business this is just a default for now */}
            <p className='text-center mb-10'>
                Suzy's Cleaners offer services ranging from a standard house cleaning to a true deep clean. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt eum repellat corrupti, delectus voluptas cumque quos quasi perferendis deleniti explicabo? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio eligendi assumenda deleniti veniam aliquid ipsa dignissimos aspernatur! Eaque, nemo officiis.
            </p>
            <ServicesGrid services={services}>
            </ServicesGrid>
        </section>
    )
}