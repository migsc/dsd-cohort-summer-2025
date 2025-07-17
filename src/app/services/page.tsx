import ServicesGrid from '@/components/ui/servicesgrid';

// ***THIS DATA WILL COME FROM DATABASE INSTEAD OF BEING MANUALLY INPUT***
const services = [
    {
        key:'0',
        name: "Standard House Cleaning",
        desc: 'Regular maintenance cleaning including dusting, vacuuming, mopping, bathroom and kitchen cleaning. Perfect for ongoing home maintenance.',
        durationMin: 1.5,
        durationMax: 3,
        durationUnits: 'hours',
        priceMin: 80,
        priceMax: 150,
        priceUnit: '$',
        bookingLink: '/book'
    },
    {
        key:'1',
        name: "Deep Cleaning",
        desc: 'Intensive top-to-bottom cleaning including baseboards, light fixtures, inside appliances, and areas typically missed in regular cleaning. Ideal for first-time clients or seasonal refresh.',
        durationMin: 3,
        durationMax: 6,
        durationUnits: 'hours',
        priceMin: 200,
        priceMax: 400,
        priceUnit: '$',
        bookingLink: '/book'
    },
    {
        key:'2',
        name: "Standard House Cleaning",
        desc: 'Regular maintenance cleaning including dusting, vacuuming, mopping, bathroom and kitchen cleaning. Perfect for ongoing home maintenance.',
        durationMin: 1.5,
        durationMax: 3,
        durationUnits: 'hours',
        priceMin: 80,
        priceMax: 150,
        priceUnit: '$',
        bookingLink: '/book'
    },
    {
        key:'3',
        name: "Deep Cleaning",
        desc: 'Intensive top-to-bottom cleaning including baseboards, light fixtures, inside appliances, and areas typically missed in regular cleaning. Ideal for first-time clients or seasonal refresh.',
        durationMin: 3,
        durationMax: 6,
        durationUnits: 'hours',
        priceMin: 200,
        priceMax: 400,
        priceUnit: '$',
        bookingLink: '/book'
    }
];

export default function OurServices() {
    return (
        <section className='mx-3 sm:mx-10'>
            <h1 className='text-center font-bold text-3xl mb-4'>Our Services</h1>
            {/* Business Description - will be configured by business this is just a default for now */}
            <p className='text-center mb-10'>
                We offer services ranging from a standard house cleaning to a true deep clean. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt eum repellat corrupti, delectus voluptas cumque quos quasi perferendis deleniti explicabo? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio eligendi assumenda deleniti veniam aliquid ipsa dignissimos aspernatur! Eaque, nemo officiis.
            </p>
            <ServicesGrid services={services}>
            </ServicesGrid>
        </section>
    )
}