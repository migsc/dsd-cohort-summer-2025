'use client'

import React, { useEffect, useState } from "react";

import { useSearchParams } from 'next/navigation';
import { AdvancedMarker, APIProvider, Map, Marker, Pin } from '@vis.gl/react-google-maps';

type LatLng = {
    lat: number,
    lng: number
};


export default function Maps() {
    const searchParams = useSearchParams();
    const[workerAddress, setWorkerAddress] = useState<LatLng | null>(null);
    const[customerAddress, setCustomerAddress] = useState<LatLng | null>(null);
    const[distance, setDistance] = useState('');
    const[duration, setDuration] = useState('');


    // call Geocoding API first to make use of the other APIs easier
    useEffect(() => {
        const worker = searchParams.get('worker');
        const customer = searchParams.get('customer');

        if (!worker || !customer){
            return;
        }

        fetch(`api/geocode?worker=${encodeURIComponent(worker)}&customer=${encodeURIComponent(customer)}`)
        .then(response => response.json())
        .then(data => {
            setWorkerAddress(data.workerCoord);
            setCustomerAddress(data.customerCoord);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    }, [searchParams]);


    useEffect(() => {
        if (!workerAddress || !customerAddress) return;
        const origin = `${workerAddress.lat},${workerAddress.lng}`;
        const destination = `${customerAddress.lat},${customerAddress.lng}`;

        fetch(`api/distance?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`)
        .then(response => response.json())
        .then(data => {
            setDistance(data.distance.text);
            setDuration(data.duration.text);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    }, [workerAddress, customerAddress]);

    if (!workerAddress || !customerAddress || !distance || !duration) {
        return <div>Loading map...</div>;
    }

    const center = {
        lat: (workerAddress.lat + customerAddress.lat) / 2,
        lng: (workerAddress.lng + customerAddress.lng) / 2
    };

    const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;

    return (
        <section className = "space-y-12">
            <APIProvider apiKey={apiKey!}>
                <Map
                    mapId={'1ab038de2bf0f57553dab021'}
                    center={center}
                    zoom={12}
                    style={{ width: '100%', height: '500px', border: '1px solid #ccc' }}
                >
                    <AdvancedMarker position={workerAddress} />
                    <AdvancedMarker position={customerAddress} >
                        <Pin
                        background={'#0f9d58'}
                        borderColor={'#006425'}
                        glyphColor={'#60d98f'}
                        />
                    </AdvancedMarker>
                </Map>

            </APIProvider>
        <p>
            Total distance to destination: {distance}
            <br/>
            Estimated Time of Arrival: {duration}
        </p>
        </section>
    );

}