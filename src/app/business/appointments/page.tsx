"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

// const mockServices = [
//   {
//     id: "service-1",
//     name: "Standard Cleaning",
//     businessId: "business-123",
//   },
//   {
//     id: "service-2",
//     name: "Deep Cleaning",
//     businessId: "business-123",
//   },
//   {
//     id: "service-3",
//     name: "Move-Out Cleaning",
//     businessId: "business-123",
//   },
// ];

type CoreService = {
  id: string;
  name: string;
  description: string;
  durationMin: number;
  durationMax: number;
  typicalCleanersAssigned: number;
  pricingModel: string;
  priceMin: number;
  priceMax: number;
};

export default function Appointments() {
  // <div>Appointments page</div>
  const [selectedService, setSelectedService] = useState<CoreService[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const fetchBusiness = async () => {
      const res = await fetch("/api/business/self");
      const data = await res.json();

      if (res.ok) {
        setStatusMessage(data.coreServices);
      } else {
        setStatusMessage("Could not load services.");
      }
    };

    fetchBusiness();
  }, []);

  async function handleBooking(service: CoreService) {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        businessId: service.id,
        serviceType: service.name,
        date,
        time,
        address,
        notes,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setStatusMessage("Booking successful.");
      console.log("Booking created:", data);
      toast.success("Booking created and successful!");
    } else {
      setStatusMessage(`Booking failed: ${data.message}`);
      console.error("Booking error:", data.message);
      toast.error("Booking failed.");
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4">Create a Booking</h2>

      <label className="block mb-2">
        <span className="font-medium">Select a Service</span>
        <select
          value={selectedService.id}
          onChange={(e) =>
            setSelectedService(
              mockServices.find((s) => s.id === e.target.value) || null
            )
          }
          className="mt-1 block w-full border px-3 py-2 rounded"
        >
          {mockServices.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-2 mt-4">
        <span className="font-medium">Date</span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full border px-3 py-2 rounded"
        />
      </label>

      <label className="block mb-2 mt-4">
        <span className="font-medium">Time</span>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="mt-1 block w-full border px-3 py-2 rounded"
        />
      </label>

      <label className="block mb-2 mt-4">
        <span className="font-medium">Address</span>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="123 Main St, City, State"
          className="mt-1 block w-full border px-3 py-2 rounded"
        />
      </label>

      <label className="block mb-2 mt-4">
        <span className="font-medium">Notes (optional)</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-1 block w-full border px-3 py-2 rounded"
          rows={3}
        />
      </label>

      <button
        onClick={() => handleBooking(selectedService)}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Book
      </button>

      {statusMessage && (
        <p className="mt-4 text-sm text-gray-700">{statusMessage}</p>
      )}
    </div>
  );
}

// type CoreService = {
//   id: string;
//   name: string;
//   description: string;
//   durationMin: number;
//   durationMax: number;
//   typicalCleanersAssigned: number;
//   pricingModel: string;
//   priceMin: number;
//   priceMax: number;
// };

// export default function Appointments() {
//   const [services, setServices] = useState<CoreService[]>([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchBusiness = async () => {
//       const res = await fetch("/api/business/self");
//       const data = await res.json();

//       if (res.ok) {
//         setServices(data.coreServices);
//       } else {
//         setMessage("Could not load services.");
//       }
//     };

//     fetchBusiness();
//   }, []);

//   const handleBooking = async (service: CoreService) => {
//     const bookingPayload = {
//       businessId: "688bad4bde5f557da29565a9", // replace with dynamic logic later
//       customerId: "PUT_REAL_CUSTOMER_ID_HERE",
//       serviceType: service.name,
//       date: new Date("2025-08-05"),
//       time: "10:00",
//       address: "123 Customer St, Sample City",
//       notes: "",
//     };

//     const res = await fetch('/api/bookings', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(bookingPayload),
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       setMessage("Booking failed: " + data.message);
//     } else {
//       setMessage("Booking successful!");
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Book a Cleaning Service</h1>
//       {services.map((service) => (
//         <div key={service.id} className="border p-4 mb-2">
//           <p><strong>{service.name}</strong></p>
//           <p>{service.description}</p>
//           <p>
//             ${service.priceMin} - ${service.priceMax} ({service.pricingModel})
//           </p>
//           <button
//             className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
//             onClick={() => handleBooking(service)}
//           >
//             Book
//           </button>
//         </div>
//       ))}
//       {message && <p className="mt-4">{message}</p>}
//     </div>
//   );
// }