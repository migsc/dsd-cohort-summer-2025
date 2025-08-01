"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SquareChevronRight } from "lucide-react";
import { HamburgerMenu } from "@/components/HamburgerMenu";

export default function Home() {
  const router = useRouter();

  return (
    <header className="grid-background flex h-screen w-screen flex-col items-center text-black md:gap-7">
      {/* Navigation For Main site in Desktop mode */}
      <nav className="flex w-full max-w-[2000px] justify-center p-4 px-20 md:justify-between">
        <div className="flex items-center justify-center">
          <img
            src="/images/small_logo.png"
            alt="Logo"
            className=" hidden h-10 w-10 lg:block"
          />
          <p className="ml-2 hidden text-2xl font-bold text-blue-600 md:block">
            CleanHub
          </p>
        </div>
        <div className="hidden items-center gap-2.5 space-x-4 md:flex">
          <ul className="flex space-x-4">
            <li>
              <a href="/">Contact</a>
            </li>
          </ul>
          <div>
            <Button
              onClick={() => {
                router.push("/login");
              }}
              className="w-[150px] cursor-pointer rounded-md bg-blue-600 py-3 font-light text-white hover:text-black"
            >
              Login
            </Button>
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
            <hr className="mb-5 h-1.5 w-[100px] rounded-sm bg-blue-600" />
            <h1 className="mb-5 mt-3 text-6xl font-black uppercase">
              Your assistant who manages your customers cleaning needs.
            </h1>
            <p className="mb-5 max-w-[700px] leading-8">
              Our app is a comprehensive software platform that empowers
              cleaning businesses to launch and manage their operations online.
              From initial setup to customer bookings and payment processing, we
              provide everything cleaning professionals need to run their
              business efficiently.
            </p>

            {/* UPDATE: a to be Link component. And add some JSX conditionals for when to show something based on screen size. */}
            <a
              href="./onboarding"
              className=" flex w-fit cursor-pointer gap-2.5 rounded-xl border border-blue-600 bg-white p-4 text-blue-600 transition-colors duration-300 hover:bg-blue-600 hover:text-white"
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
  );
}
