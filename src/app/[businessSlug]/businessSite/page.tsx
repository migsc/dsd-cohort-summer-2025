"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { HamburgerMenu } from "@/components/HamburgerMenu";

const bussinesInfo = {
  name: "Suzy's Cleaning Services",
  slogan:
    "We take care of your cleaning needs so you can focus on what matters most.",
  callToAction: "Book Now",
  bgAccentColor: "bg-green-600", // Example accent color
  textAccentColor: "bg-green-600", // Example accent color
  logo: "/images/small_logo.png", // Example logo path
  logoAlt: "Suzy's Cleaning Services Logo",
  description:
    "Suzy's Cleaning Services is dedicated to providing top-notch cleaning solutions tailored to your needs. Our team of professionals ensures a spotless environment, allowing you to enjoy a clean and healthy space.",
  services: [
    "Residential Cleaning",
    "Commercial Cleaning",
    "Deep Cleaning",
    "Move-In/Move-Out Cleaning",
  ],
};

export default function BusinessSite() {
  const router = useRouter();

  // I need to make sure that I am able to pass in the logo of the business and name and there other stuff that makes this site unique to the user. Add a customize site section in the business dashboard. and we are able to customize each section of the site.

  return (
    <>
      <header className=" flex h-screen w-screen flex-col items-center bg-purple-200 text-black md:gap-7">
        {/* Navigation For Main site in Desktop mode */}
        <nav className="flex w-full max-w-[2000px] justify-center p-4 px-20 md:justify-between">
          {/* Custom Logo for each business and name of business */}
          <div className="flex items-center justify-center">
            <img
              src="/images/small_logo.png"
              alt="Logo"
              className=" hidden h-10 w-10 lg:block"
            />
          </div>
          {/* Navigation Links : Turn these links into something that can be changes, add smaller componets for this business page.*/}
          <div className="hidden items-center gap-2.5 space-x-4 md:flex">
            <ul className="flex space-x-4">
              <li>
                <a href="/">About</a>
              </li>
            </ul>
            <ul className="flex space-x-4">
              <li>
                <a href="/">Services</a>
              </li>
            </ul>
            <ul className="flex space-x-4">
              <li>
                <a href="/">Contact</a>
              </li>
            </ul>
            <div>
              <Button
                onClick={() => {
                  router.push("../../login");
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
          <div className="w-3/4 text-center md:flex md:w-full md:items-center md:justify-center ">
            {/* content */}
            <div className=" flex w-full max-w-[900px] flex-col items-center justify-center text-center md:w-1/2">
              <h1 className="mb-5 mt-3 text-6xl font-black uppercase">
                {bussinesInfo.name}
              </h1>
              <hr className={`mb-5 h-1.5 w-[100px] rounded-sm ${"Busines"}`} />
              <p className="mb-5 max-w-[700px] leading-8">
                {bussinesInfo.slogan}
              </p>

              {/* UPDATE: a to be Link component. And add some JSX conditionals for when to show something based on screen size. */}
              <a
                href="./login"
                className={`w-[300px] cursor-pointer rounded-xl border border-blue-600 bg-white p-4 text-blue-600 transition-colors duration-300 hover:bg-blue-600 hover:text-white`}
              >
                {bussinesInfo.callToAction}
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
