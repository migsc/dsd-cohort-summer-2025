import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Navigation } from "lucide-react"

export function HamburgerMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <div className="flex items-center justify-center">
            <img src="/images/small_logo.png" alt="Logo" className="h-30 w-30 md:h-10 md:w-10" />
            <p className="hidden md:block ml-2 text-2xl font-bold text-blue-600">CleanHub</p>
        </div>
        <div className="hidden md:flex items-center space-x-4 gap-2.5">
            <ul className="flex space-x-4">
                <li><a href="/">Contact</a></li>
            </ul>
            <div>
                <Button onClick={()=>{router.push("/login")}} className="py-3 rounded-md w-[150px] text-white font-light bg-blue-600 cursor-pointer hover:text-black">Login</Button>
            </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}