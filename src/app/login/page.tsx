"use client";

import { useState } from "react";
import Link from 'next/link'

import SignInForm from "@/components/forms/sign-in-form";
import SignUpForm from "@/components/forms/sign-up-form";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [showSignIn, setShowSignIn] = useState(false);

  return showSignIn ? (
    <>
      <SignInForm onSwitchToSignUp={() => setShowSignIn(false)} />
      <Button className="max-w-30 center">
        <Link href="./">
          Go Back Home
        </Link>
      </Button>
    </>
  ) : (
    <>
      <SignUpForm onSwitchToSignIn={() => setShowSignIn(true)} />
      <Button className="max-w-30 center">
        <Link href="./">
          Go Back Home
        </Link>
      </Button>
    </>
  );
}
