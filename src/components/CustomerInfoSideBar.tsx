import React from 'react'
import { Button } from './ui/button';
import { Sheet, SheetTrigger, SheetTitle, SheetDescription, SheetContent, SheetFooter, SheetHeader, SheetClose } from './ui/sheet';
import AppCalendar from './app-calendar';

//Mock data for customer and order information.
const customerInfo = {
    customerId: '12345',
    customerName: 'John Doe',
    customerEmail: 'johndoe98@gmail.com',
    customerPhone: '123-456-7890',
    customerAddress: '123 Main St, Springfield, USA',
}
const orderInfo = {
    orderId: '54321',
    orderDate: '2025-07-07',
    orderAddress: '123 Main St, Springfield, USA',
    orderStatus: 'Pending',
    orderTotal: 99.99,
    orderNotes: 'Leave at the front door if not home',
}

interface CustomerInfoSideBarProps {
  // Define any props if needed
  //customer information
    customerId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
}
interface OrderInfoProps {
  // Define any props if needed
    //order information
    orderId: string;
    orderDate: string;
    orderStatus: string;
    orderAddress: string;
    orderTotal: number;
    orderNotes?: string; //Optional notes field
}

//IMPORTANT NOTE: Each custome rhas there own sheet that display there data on the side and this sheet dinamically updates on the type of information it is using a trigger. Not sure how to use it for mutltiple components yet.

// {customerId, customerName, customerEmail, customerAddress, customerPhone}: CustomerInfoSideBarProps, {orderId, orderDate, orderStatus, orderTotal, orderNotes}:OrderInfoProps

const CustomerInfoSideBar = () => {
  return (
    <div>
        CustomerInfoSideBar
        {/* Testing out how the calendar works */}
        <AppCalendar
            events={[
                {
                    title: 'Order Delivery',
                    start: new Date(orderInfo.orderDate),
                    end: new Date(orderInfo.orderDate),
                    location: customerInfo.customerAddress,
                    contact: customerInfo.customerName,
                    allDay: true,
                },
            ]} />
    </div>
  )
}

export default CustomerInfoSideBar