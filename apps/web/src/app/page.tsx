"use client";

import { Layout } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-2">
      <h1 className="text-2xl font-bold mb-4">
        Welcome to the DSD Cohort Summer 2025 Project
      </h1>
      <div className="flex items-center gap-2 mb-4">
        <a href="./dashboard" className="text-white bg-red-400 p-1 rounded-xs hover:bg-red-200 transition-all ease-in-out duration-200 hover:text-black">Go to Dashboard</a>
        <a href="./login" className="text-white bg-red-400 p-1 rounded-xs hover:bg-red-200 transition-all ease-in-out duration-200 hover:text-black">Login Page</a>
      </div>
    </div>
  );
}
