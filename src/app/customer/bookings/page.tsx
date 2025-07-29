import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function MyBookings() {
    return (
        <div>
            <h1 className='text-center font-bold text-3xl mb-4 text-black'>
                My Bookings
            </h1>

            {/* Current/In Progress Booking */}
            <h2 className="text-black text-center font-bold text-lg text-gray-600 mb-2">In Progress</h2>
            <Table className="text-black">
                <TableHeader className="bg-blue-500">
                    <TableRow>
                    <TableHead className="w-[100px]">Order No.</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Rating</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                    <TableCell className="font-medium">1234</TableCell>
                    <TableCell>Standard House Cleaning</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                    <TableCell className="text-right">Pending</TableCell>
                    <TableCell className="text-right">
                        {/* ***TODO: have this button open a modal to enter new date/time slot */}
                        <Button className="cursor-pointer">
                            Rebook
                        </Button>
                    </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            {/* Previous Bookings */}
            <h2 className="text-black text-center font-bold text-lg text-gray-600 mt-4 mb-2">Previous Bookings</h2>
            <Table className="text-black">
                <TableHeader className="bg-blue-500">
                    <TableRow>
                    <TableHead className="w-[100px]">Order No.</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Rating</TableHead>
                    <TableHead className="text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                    <TableCell className="font-medium">1234</TableCell>
                    <TableCell>Standard House Cleaning</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                    <TableCell className="text-right">5 Stars</TableCell>
                    <TableCell className="text-right">
                        {/* ***TODO: have this button open a modal to enter new date/time slot */}
                        <Button className="cursor-pointer">
                            Rebook
                        </Button>
                    </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}