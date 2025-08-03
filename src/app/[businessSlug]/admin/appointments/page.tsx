import React from "react";
import AppointmentTable from "@/components/AppointmentTable";
import { getBusinessWithCustomers } from "@/lib/queries/getBusinessWithCustomer";

export default async function Appointments({params}:{params: {businessSlug: string} }){
  const businessData = await getBusinessWithCustomers(params.businessSlug)

  if(!businessData){
    return <div>Business Not Found.</div>
  }


  return (
    <>
      <header className="border-b p-4">
        <h1 className="text-3xl">Appointments</h1>
      </header>

      <main className="p-6 flex flex-col gap-6">
        {/* Approved Orders */}
        <section className="bg-background height-full w-5/6 rounded-md p-4">
          <AppointmentTable filter="Approved" bookingInfo={businessData.bookings} />
        </section>
      </main>
    </>
  );
}