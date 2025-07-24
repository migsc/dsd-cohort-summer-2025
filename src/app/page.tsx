"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import {  SquareChevronRight } from "lucide-react";
import Navigation from "@/components/navigation";

export default function Home(){
	const router = useRouter();
	return(
		<header className="flex gap-7 w-screen h-screen flex-col items-center text-black grid-background">
			<nav className="flex justify-between w-full p-4 px-20 max-w-[2400px]">
				<div className="flex items-center justify-center">
					<img src="/images/small_logo.png" alt="Logo" className="h-10 w-10" />
					<p className="ml-2 text-2xl font-bold text-blue-600">CleanHub</p>
				</div>
				<div className="flex items-center space-x-4 gap-2.5">
					<ul className="flex space-x-4">
						<li><a href="/">Contact</a></li>
					</ul>
					<span>
						<Button onClick={()=>{router.push("/login")}} className="py-3 rounded-md w-[150px] text-white font-light bg-blue-600 cursor-pointer hover:text-black">Login</Button>
					</span>
				</div>
			</nav>
			<div className="pt-60 w-full h-full px-14 max-w-[1800px]">
				<div className="flex items-center justify-evenly w-full ">
				{/* content */}
				<div className=" w-1/2 max-w-[900px]">
					<hr className="bg-blue-600 w-[100px] h-1.5 mb-5 rounded-sm" />
					<h1 className="text-6xl font-black mb-5 mt-3 uppercase	">Your assistant who manages your customers cleaning needs.</h1>
					<p className="max-w-[700px] leading-8 mb-5">Our app is a comprehensive software platform that empowers cleaning businesses to launch and manage their operations online. From initial setup to customer bookings and payment processing, we provide everything cleaning professionals need to run their business efficiently.</p>

					<a href="./login" className=" flex gap-2.5 w-fit p-4 rounded-xl border bg-white border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300 cursor-pointer">Get Started Managing Your Business <SquareChevronRight /></a>
				</div>
				{/* large logo */}
				<div>
					<img src="/images/main_logo.png" alt="main logo of site" className="floatAnimation" />
				</div>
				</div>
			</div>
		</header>
	);
}
