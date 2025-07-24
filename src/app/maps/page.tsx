'use client'

import React, { useEffect, useState } from "react";

import { useSearchParams } from 'next/navigation';

type LatLng = {
    lat: number,
    lng: number
};




export default function Maps() {
    const searchParams = useSearchParams();
    const[workerAddress, setWorkerAddress] = useState<LatLng | null>(null);
    const[customerAddress, setCustomerAddress] = useState<LatLng | null>(null);
    searchParams.forEach((value, key) => {
        console.log(value, key);
        });


    useEffect(() => {
        const worker = searchParams.get('worker');
        const customer = searchParams.get('customer');

        if (!worker || !customer){
            return;
        }

        fetch(`api/geocode?worker=${encodeURIComponent(worker)}&customer=${encodeURIComponent(customer)}`)

    }, [searchParams]);

    return (
        <section className = "space-y-12">
            
        </section>
    );

}