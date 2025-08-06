<<<<<<< HEAD
import { Button, buttonVariants } from "@/components/ui/button"
import { Menu } from "lucide-react"
=======
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";
>>>>>>> 913deae0197e9811499238b3a5f586a0241ecf8a
import React from "react";
import { useRouter } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
<<<<<<< HEAD
} from "@/components/ui/sheet"
=======
} from "@/components/ui/sheet";
import { Navigation } from "lucide-react";
>>>>>>> 913deae0197e9811499238b3a5f586a0241ecf8a
import Link from "next/link";

export function HamburgerMenu() {
  const router = useRouter();
  return (
    <Sheet>
      <SheetTrigger asChild>
<<<<<<< HEAD
        <Button className={buttonVariants({variant: "default"})}>
            <Menu />
=======
        <Button className="bg-blue-600 text-white hover:bg-blue-700">
          <Menu />
>>>>>>> 913deae0197e9811499238b3a5f586a0241ecf8a
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] bg-white p-2.5 md:w-[400px]">
        <SheetHeader>
          <SheetTitle className="mb-4 flex flex-col items-center justify-center gap-5">
            <img src="/images/small_logo.png" alt="Logo" className="w-20" />
            <p className="ml-2 text-2xl font-bold text-blue-600">CleanHub</p>
          </SheetTitle>
        </SheetHeader>
<<<<<<< HEAD
        {/* create a map to be able to recieve all the links and contact that get passed a props. */}
        <nav className="text-black p-3 w-full">
            <Link href="/" className="hover:text-blue-600">Contact</Link>
        </nav>
        <SheetFooter>
            <Button onClick={()=>{router.push("/login")}} className={buttonVariants({variant: "default"})}>Login</Button>
=======
        <nav className="w-full p-3 text-black">
          <Link href="/" className="hover:text-blue-600">
            Contact
          </Link>
        </nav>
        <SheetFooter>
          <Button
            onClick={() => {
              router.push("/login");
            }}
            className="cursor-pointer rounded-md bg-blue-600 py-3 font-light text-white hover:text-black"
          >
            Login
          </Button>
>>>>>>> 913deae0197e9811499238b3a5f586a0241ecf8a
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
