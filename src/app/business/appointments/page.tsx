import React from 'react';
import WorkOrderInfoCard from '@/components/WorkOrderInfoCard';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

//ADD DUMMY DATA HERE FOR NOW
const dummyAppointments = [
  { id: 1, 
    dateCreated: '2023-10-01', 
    timeCreated: '10:00 AM', //Could be taking the actual time of creation using javascript and formatting it.
    workOrderInfo: {
      orderId: 1001,
      status: 'In Review', 
      fulfillmentDate: '2023-10-05',
      fulfillmentTime: '2:00 PM',
      address: '123 Main St, Springfield, IL',
      description: 'I have a kitchen and living room that needs to be cleaned. Please detail appliances and wash the carpet.',
    },
    customerInfo: {
      clientId: 101,
      clientName: 'John Doe',
      clientPhone: '123-456-7890',
      clientEmail: 'johndoe@gmail.com' 
    }
  },
  { id: 2, 
    dateCreated: '2023-10-02', 
    timeCreated: '11:30 AM',
    workOrderInfo: {
      orderId: 1002,
      status: 'Scheduled', 
      fulfillmentDate: '2023-10-07',
      fulfillmentTime: '9:00 AM',
      address: '456 Oak Ave, Lincoln, NE',
      description: 'Bathroom deep cleaning and window washing.',
    },
    customerInfo: {
      clientId: 102,
      clientName: 'Jane Smith',
      clientPhone: '555-123-4567',
      clientEmail: 'janesmith@email.com' 
    }
  },
  { id: 3, 
    dateCreated: '2023-10-03', 
    timeCreated: '2:15 PM',
    workOrderInfo: {
      orderId: 1003,
      status: 'Approved', 
      fulfillmentDate: '2023-10-04',
      fulfillmentTime: '1:00 PM',
      address: '789 Pine Rd, Madison, WI',
      description: 'Carpet cleaning in two bedrooms.',
    },
    customerInfo: {
      clientId: 103,
      clientName: 'Carlos Rivera',
      clientPhone: '222-333-4444',
      clientEmail: 'carlos.rivera@mail.com' 
    }
  },
  { id: 4, 
    dateCreated: '2023-10-04', 
    timeCreated: '4:45 PM',
    workOrderInfo: {
      orderId: 1004,
      status: 'Pending', 
      fulfillmentDate: '2023-10-10',
      fulfillmentTime: '3:30 PM',
      address: '321 Maple St, Denver, CO',
      description: 'Move-out cleaning for apartment.',
    },
    customerInfo: {
      clientId: 104,
      clientName: 'Emily Chen',
      clientPhone: '777-888-9999',
      clientEmail: 'emily.chen@email.com' 
    }
  },
  { id: 5, 
    dateCreated: '2023-10-05', 
    timeCreated: '9:00 AM',
    workOrderInfo: {
      orderId: 1005,
      status: 'Declined', 
      fulfillmentDate: '2023-10-12',
      fulfillmentTime: '10:00 AM',
      address: '654 Cedar Blvd, Austin, TX',
      description: 'Garage cleaning and power washing.',
    },
    customerInfo: {
      clientId: 105,
      clientName: 'Michael Brown',
      clientPhone: '888-555-1212',
      clientEmail: 'michael.brown@email.com' 
    }
  },
];

export default function Appointments() {
  return (
  <>
    <header>
      <h1>Appointments</h1>
    </header>
    {/* Sheet Compoent Goes here */}

    <main>
      {/* Approved Orders */}
      <section>
      {/* here we will be using Shadcn to create that list of mapped items */}
      </section>

      {/* Pending/In Review Orders */}
      <section>
      {/* here we will be using Shadcn to create that list of mapped items */}
      </section>

      {/* Declined Orders */}
      <section>
      {/* here we will be using Shadcn to create that list of mapped items */}
      </section>
    </main>
  </>
);
}
