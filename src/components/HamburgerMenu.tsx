import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";
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
} from "@/components/ui/sheet";
import { Navigation } from "lucide-react";
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
      <SheetContent className="w-[300px] bg-white p-2.5 md:w-[400px]">
        <SheetHeader>
          <SheetTitle className="mb-4 flex flex-col items-center justify-center gap-5">
            <img src="/images/small_logo.png" alt="Logo" className="w-20" />
            <p className="ml-2 text-2xl font-bold text-blue-600">CleanHub</p>
          </SheetTitle>
        </SheetHeader>
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
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
