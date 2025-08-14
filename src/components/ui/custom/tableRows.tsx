import {
  TableCell,
  TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"

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
                <Dialog>
                    <DialogTrigger>
                        <Button className="cursor-pointer">
                            Rate/Review
                        </Button> 
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Rate/Review</DialogTitle>
                            <DialogDescription>
                                What did you think of the appointment? Leave a rating/review down below!
                                <Label htmlFor="serviceName"></Label>
                                <Input type="text" id="serviceName" placeholder="Service name"></Input>
                                <Label htmlFor="date"></Label>
                                <Input type="date" id="date" placeholder="New date"></Input>
                                <Label htmlFor="timeSlot"></Label>
                                <Input type="text" id="timeSlot" placeholder="Time slot"></Input>
                                <Label htmlFor="notes"></Label>
                                <Input type="text" id="notes" placeholder="Notes"></Input>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button type="submit">Confirm</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                
            </TableCell>
            <TableCell className="text-center">
                {/* ***TODO: have this button open a modal to enter new date/time slot */}
                <Dialog>
                    <DialogTrigger>
                        <Button className="cursor-pointer">
                            Rebook
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Rebook appointment</DialogTitle>
                        <DialogDescription>
                            Change the information below to rebook your appointment
                        </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </TableCell>
        </TableRow>
    )
}