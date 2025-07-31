import {
  TableCell,
  TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface CurrentBookingProps {
    orderNum: string,
    service: string,
    paymentMethod: 'Credit Card' | 'Cash' | 'Check',
    amount: string,
    status: 'Under Review' | 'Approved' | 'On The Way' | 'In Progress' | 'Completed'
}

export function CurrentBookingRow({ 
    orderNum, 
    service, 
    paymentMethod, 
    amount, 
    status 
}: CurrentBookingProps) {
    return (
        <TableRow>
            <TableCell className="font-medium">
                {orderNum}
            </TableCell>
            <TableCell>
                {service}
            </TableCell>
            <TableCell>
                {paymentMethod}
            </TableCell>
            <TableCell className="text-right">
                {amount}
            </TableCell>
            <TableCell className="text-right">
                {status}
            </TableCell>
        </TableRow>
    )
}
interface PreviousBookingProps {
    orderNum: string,
    dateFulfilled: string,
    service: string,
    paymentMethod: 'Credit Card' | 'Cash' | 'Check',
    amount: string
}

export function PreviousBookingRow({ 
    orderNum, 
    dateFulfilled, 
    service, 
    paymentMethod, 
    amount 
}: PreviousBookingProps) {
    return (
        <TableRow>
            <TableCell className="font-medium">
                {orderNum}
            </TableCell>
            <TableCell className="font-medium">
                {dateFulfilled}
            </TableCell>
            <TableCell>
                {service}
            </TableCell>
            <TableCell className="text-left">
                {paymentMethod}
            </TableCell>
            <TableCell className="text-left">
                {amount}
            </TableCell>
            <TableCell className="text-center">
                {/* ***TODO: have this button open a modal to rate/review */}
                <Button className="cursor-pointer">
                    Rate/Review
                </Button> 
            </TableCell>
            <TableCell className="text-center">
                {/* ***TODO: have this button open a modal to enter new date/time slot */}
                <Button className="cursor-pointer">
                    Rebook
                </Button>
            </TableCell>
        </TableRow>
    )
}