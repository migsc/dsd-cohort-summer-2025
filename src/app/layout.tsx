import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/providers";

import "../styles/globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "client",
	description: "client",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers>
					<div className="container mx-auto max-w-3xl px-4 py-2">
						<h1 className="text-2xl font-bold mb-4">
							Welcome to the DSD Cohort Summer 2025 Project
						</h1>
						<div className="flex items-center gap-2 mb-4">
							<a
								href="./"
								className="text-white bg-red-400 p-1 rounded-xs hover:bg-red-200 transition-all ease-in-out duration-200 hover:text-black"
							>
								Home
							</a>
							<a
								href="./dashboard"
								className="text-white bg-red-400 p-1 rounded-xs hover:bg-red-200 transition-all ease-in-out duration-200 hover:text-black"
							>
								Go to Dashboard
							</a>
							<a
								href="./login"
								className="text-white bg-red-400 p-1 rounded-xs hover:bg-red-200 transition-all ease-in-out duration-200 hover:text-black"
							>
								Login Page
							</a>
							<a
								href="./health"
								className="text-white bg-red-400 p-1 rounded-xs hover:bg-red-200 transition-all ease-in-out duration-200 hover:text-black"
							>
								Health
							</a>
						</div>
					</div>
					<div className="grid grid-rows-[auto_1fr]">{children}</div>
				</Providers>
			</body>
		</html>
	);
}
