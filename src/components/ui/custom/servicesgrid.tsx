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

export interface ServiceCardProps {
    _id: string;
    name: string;
    desc: string;
    durationMin: number;
    durationMax: number;
    durationUnits: string;
    priceMin: number;
    priceMax: number;
    priceUnit: string;
};

// ServiceCard Component used to make individual cards
export function ServiceCard({ name, desc, durationMin, durationMax, durationUnits, priceMin, priceMax, priceUnit }: ServiceCardProps) {
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
                    {/* *** ADD SLUG FOR SPECIFIC SERVICE. I.E., /book/deep-clean *** */}
                    <Link href='/book'>Book Now</Link>
                </Button>
            </CardFooter>
        </Card>
    )
};

// ServicesGrid Component. Accepts an array of services (objects) and maps each service to a ServiceCard
export default function ServicesGrid({ services }: {services: ServiceCardProps[]}) {
return (
        <section className='grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
            {/* *** LOOP THROUGH SERVICES FROM DATABASE     */}
            {services.map((service: ServiceCardProps) => (
                <div key={service._id}>
                    <ServiceCard {...service} />
                </div>
            ))}
        </section>
    )
}