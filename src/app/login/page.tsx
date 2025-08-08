"use client";

import { useState, Suspense } from "react";

import SignInForm from "@/components/forms/sign-in-form";
import SignUpForm from "@/components/forms/sign-up-form";

export default function LoginPage() {
  const [showSignIn, setShowSignIn] = useState(true);

  return (
    <Suspense fallback={<div>Loading forms...</div>}>
      {/* main conatiner */}
      <div className="flex md:flex-row overflow-hidden">
        {/* left side */}
        <div className="md:flex items-center justify-center bg-primary hidden w-full md:h-screen md:w-1/2">
            <div className="animate-in fade-in-0 slide-in-from-bottom-20 duration-800 flex flex-col items-center justify-center gap-2">
            <img
              src="/images/bluelogo.png"
              alt="Logo"
              className=" hidden md:block w-1/2"
            />
            <p className="ml-2 hidden text-6xl font-bold text-blue-950 md:block">
              CleanHub
            </p>
            <p className="ml-2 hidden text-blue-950 md:block text-center w-3/4">
              Your assistant who manages your customers cleaning needs
            </p>
          </div>
        </div>
        {/* right side */}
        <div className="flex h-screen w-full md:items-center">
          {showSignIn ? (
            <SignInForm onSwitchToSignUp={() => setShowSignIn(false)} />
          ) : (
            <SignUpForm onSwitchToSignIn={() => setShowSignIn(true)} />
          )}
        </div>
      </div>
    </Suspense>
  );
}
