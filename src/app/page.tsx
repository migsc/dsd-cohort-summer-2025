"use client";
import React from "react";
// Change to NextJS Link component to fix Hydration Error.
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import {  SquareChevronRight } from "lucide-react";
import { HamburgerMenu } from "@/components/HamburgerMenu";

export default function Home(){
	const router = useRouter();

	return(
		<header className="flex md:gap-7 w-screen h-screen flex-col items-center text-black grid-background">
			{/* Navigation For Main site in Desktop mode */}
			<nav className="flex justify-center md:justify-between w-full p-4 px-20 max-w-[2000px]">
				<div className="flex items-center justify-center">
					<img src="/images/small_logo.png" alt="Logo" className=" hidden lg:block h-10 w-10" />
					<p className="hidden md:block ml-2 text-2xl font-bold text-primary">CleanHub</p>
				</div>						
				<div className="hidden md:flex items-center space-x-4 gap-2.5">
					<ul className="flex space-x-4">
						<li><a href="/">Contact</a></li>
					</ul>
					<div>
						<Button onClick={()=>{router.push("/login")}} className="py-3 rounded-md w-[150px] text-white font-light bg-blue-600 cursor-pointer hover:text-black">Login</Button>
					</div>
				</div>
				{/* Hamburger Menu */}
				<div className="md:hidden absolute right-4 top-4">
					<HamburgerMenu />
				</div>
			</nav>
			<div className="pt-10 2xl:pt-30 w-full h-full px-8 sm:px-14 md:max-w-[1800px]">
				<div className="md:flex md:items-center md:justify-evenly w-3/4 md:w-full ">
				{/* content */}
				<div className=" w-full md:w-1/2 max-w-[900px]">
					<hr className="bg-blue-600 w-[100px] h-1.5 mb-5 rounded-sm" />
					<h1 className="text-6xl font-black mb-5 mt-3 uppercase">Your assistant who manages your customers cleaning needs.</h1>
					<p className="max-w-[700px] leading-8 mb-5">Our app is a comprehensive software platform that empowers cleaning businesses to launch and manage their operations online. From initial setup to customer bookings and payment processing, we provide everything cleaning professionals need to run their business efficiently.</p>

					{/* UPDATE: a to be Link component. And add some JSX conditionals for when to show something based on screen size. */}
					<a href="./login" className=" flex gap-2.5 w-fit p-4 rounded-xl border bg-white border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300 cursor-pointer">Get Started<span className="hidden md:inline">Managing Your Business</span><SquareChevronRight /></a> 

				</div>
				{/* large logo */}
				<div className="hidden md:block">
					<img src="/images/main_logo.png" alt="main logo of site" className="floatAnimation" />
				</div>
				</div>
			</div>
		</header>
	);
}