import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

{
  /* ***TODO: MAKE NOTIFICATIONS COMPONENT THAT UPDATES */
}
export default function Notifications() {
  return (
    <Button variant="ghost" size="sm" className="relative cursor-pointer">
      <Bell className="h-5 w-5" />
      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
        3
      </span>
    </Button>
  );
}
