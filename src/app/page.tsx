"use client";
import React from "react";
// Change to NextJS Link component to fix Hydration Error.
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { SquareChevronRight } from "lucide-react";
import { HamburgerMenu } from "@/components/HamburgerMenu";

export default function Home() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <>
      {/* Header section */}
      {/* <div className="grid-patterns"></div> */}
      <header className="grid-patterns flex h-screen w-screen flex-col items-center md:gap-7">
        {/* Desktop Navigation */}
        <nav className="flex w-full max-w-[2000px] justify-center p-4 px-20 md:justify-between">
          <div className="flex items-center justify-center">
            <img
              src="/images/small_logo.png"
              alt="Logo"
              className=" hidden h-10 w-10 md:block"
            />
            <p className="ml-2 hidden text-2xl font-bold text-blue-500 md:block">
              CleanHub
            </p>
          </div>
          <div className="hidden items-center gap-2.5 space-x-4 md:flex">
            <div>
              <Button onClick={handleLoginClick}>Login</Button>
            </div>
          </div>
          {/* Hamburger Menu */}
          <div className="absolute right-4 top-4 md:hidden">
            <HamburgerMenu />
          </div>
        </nav>
        <div className="2xl:pt-30 h-full w-full px-8 pt-10 sm:px-14 md:max-w-[1800px]">
          <div className="w-3/4 md:flex md:w-full md:items-center md:justify-evenly ">
            {/* content */}
            <div className=" w-full max-w-[900px] md:w-1/2">
              <hr className="mb-5 h-1.5 w-[100px] rounded-sm bg-blue-500" />
              <h1 className="mb-5 mt-3 text-6xl font-black uppercase">
                Your assistant who manages your customers cleaning needs.
              </h1>
              <p className="mb-5 max-w-[700px] leading-8">
                Our app is a comprehensive software platform that empowers
                cleaning businesses to launch and manage their operations
                online. From initial setup to customer bookings and payment
                processing, we provide everything cleaning professionals need to
                run their business efficiently.
              </p>

              {/* UPDATE: a to be Link component. And add some JSX conditionals for when to show something based on screen size. */}
              <a
                href="/login"
                className={buttonVariants({ variant: "default" })}
              >
                Get Started
                <span className="hidden md:inline">Managing Your Business</span>
                <SquareChevronRight />
              </a>
            </div>
            {/* large logo */}
            <div className="hidden md:block">
              <img
                src="/images/main_logo.png"
                alt="main logo of site"
                className="floatAnimation"
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
