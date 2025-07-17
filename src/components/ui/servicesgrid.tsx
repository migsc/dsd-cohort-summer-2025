import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

// props to be passed into ServiceCard
export interface ServiceCardProps {
    key: string;
    name: string;
    desc: string;
    durationMin: number;
    durationMax: number;
    durationUnits: string;
    priceMin: number;
    priceMax: number;
    priceUnit: string;
    bookingLink: string;
};

export function ServiceCard({ key, name, desc, durationMin, durationMax, durationUnits, priceMin, priceMax, priceUnit, bookingLink }: ServiceCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2 className="text-xl">{name}</h2>
                    </CardTitle>
                <CardDescription>
                    <p>{desc}</p>
                    </CardDescription>
            </CardHeader>
            <CardContent>
                <p>{durationMin}-{durationMax} {durationUnits}</p>
                <p className="text-lime-500 font-bold text-xl">{priceUnit}{priceMin}-{priceUnit}{priceMax}</p>
            </CardContent>
            <CardFooter>
                <Button asChild>
                    <Link href={bookingLink}>Book Now</Link>
                </Button>
            </CardFooter>
        </Card>
    )
};

export default function ServicesGrid({ services }: {services: any}) {
return (
        <section className='grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
            {/* *** LOOP THROUGH SERVICES FROM DATABASE     */}
            {services.map((service: ServiceCardProps) => (
                <ServiceCard 
                key={service.key}
                name={service.name}
                desc={service.desc}
                durationMin={service.durationMin}
                durationMax={service.durationMax}
                durationUnits={service.durationUnits}
                priceMin={service.priceMin}
                priceMax={service.priceMax}
                priceUnit={service.priceUnit}
                bookingLink={service.bookingLink}
                ></ServiceCard>
            ))}
        </section>
    )
}