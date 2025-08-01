"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';

import { Input } from "@/components/ui/input";
import { Router } from "lucide-react";



export default function Maps() {
    const router = useRouter()
    const initAddresses = {
        workerAddress: "",
        customerAddress: ""
    };

    const [values, setValues] = useState(initAddresses);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        })

    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams ({
            worker: values.workerAddress,
            customer: values.customerAddress
        });

        router.push(`/maps?${params.toString()}`)
    }

    return (
        <section className = "space-y-12">
            <form onSubmit={handleSubmit} id = "maps-form" className="w-1/2">
                <section className="flex flex-col m-4 p-2">
                    <label htmlFor="worker-input" className="block text-sm/6 font-medium text-gray-100">Worker Address</label>
                    <Input className={"workerAddressInput"} type= {"text"} id = {"worker-input"} name = {"workerAddress"} value={values.workerAddress} onChange={handleInputChange} />

                    <label htmlFor="customer-input" className="block text-sm/6 font-medium text-gray-100">Customer Address</label>
                    <Input className={"customerAddressInput"} type= {"text"} id = {"customer-input"} name = {"customerAddress"} value={values.customerAddress} onChange={handleInputChange} />
                </section>
                <div className="flex justify-center">
                    <input className="submit" type="submit" value = "Submit" />
                </div>
            </form>
        </section>
    );


}