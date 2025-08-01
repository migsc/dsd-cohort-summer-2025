import { Button } from "@/components/ui/button"
import {Separator} from "@/components/ui/separator"
import { Menu } from "lucide-react"
import React from "react";
import { useRouter } from "next/navigation";

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
import Link from "next/link";

export function HamburgerMenu() {
    const router = useRouter();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-blue-600 text-white hover:bg-blue-700">
            <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white p-2.5 w-[300px] md:w-[400px]">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-center flex-col mb-4 gap-5">
            <img src="/images/small_logo.png" alt="Logo" className="w-20" />
            <p className="ml-2 text-2xl font-bold text-blue-600">CleanHub</p>
          </SheetTitle>
        </SheetHeader>
        {/* create a map to be able to recieve all the links and contact that get passed a props. */}
        <nav className="text-black p-3 w-full">
            <Link href="/" className="hover:text-blue-600">Contact</Link>
        </nav>
        <SheetFooter>
            <Button onClick={()=>{router.push("/login")}} className="py-3 rounded-md text-white font-light bg-blue-600 cursor-pointer hover:text-black">Login</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}