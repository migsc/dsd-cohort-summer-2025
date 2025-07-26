import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react';

{/* ***TODO: MAKE NOTIFICATIONS COMPONENT THAT UPDATES */}
export default function Notifications() {
    return (
        <Button variant="ghost" size="sm" className="relative cursor-pointer">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
            </span>
        </Button>
    )
}