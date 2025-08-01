import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import PortalHeader from '@/components/ui/custom/portalHeader';
import { PreviousBookingRow } from '@/components/ui/custom/tableRows'
import BookingProgressTracker from '@/components/ui/custom/progressTracker'

export default function MyBookings() {
    return (
        <div>
            <PortalHeader pageName='My Bookings' userName="Jane Doe"></PortalHeader>

            {/* In Progress Bookings */}
            {/* ***TODO: pull info for these props from database */}
            <section className="w-full flex justify-center mt-5">
                <div className="w-2xl">
                    <BookingProgressTracker 
                        orderNum="001" 
                        service="Standard House Cleaning" 
                        amount="$250.00" 
                        currentStatus="confirmed" 
                        expectedCompletion="2:00 PM August 2, 2025" 
                        placedDate="August 1, 2025" 
                    />
                </div>
            </section>

            {/* Previous Bookings */}
            {/* ***TODO: Pull previous bookings from DB */}
            <h2 className="text-center font-bold text-lg mt-4 mb-2">Previous Bookings</h2>
            <Table>
                <TableHeader className="bg-blue-500">
                    <TableRow>
                    <TableHead className="w-[100px]">Order No.</TableHead>
                    <TableHead className="w-[100px]">Date Fulfilled</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead className="text-left w-[200px]">Payment Method</TableHead>
                    <TableHead className="text-left w-[120px]">Amount</TableHead>
                    <TableHead className="text-center w-[120px]">Rating</TableHead>
                    <TableHead className="text-center w-[120px]">Rebook</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <PreviousBookingRow orderNum="001" dateFulfilled="07-02-2025" service="Standard House Cleaning" paymentMethod="Credit Card" amount="$250.00"/>
                </TableBody>
            </Table>
        </div>
    )
}