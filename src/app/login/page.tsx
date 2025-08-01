"use client";

import { useState } from "react";

import SignInForm from "@/components/forms/sign-in-form";
import SignUpForm from "@/components/forms/sign-up-form";

export default function LoginPage() {
  const [showSignIn, setShowSignIn] = useState(true);

  return showSignIn ? (
      <SignInForm onSwitchToSignUp={() => setShowSignIn(true)} />
  ) : (
      <SignUpForm onSwitchToSignIn={() => setShowSignIn(false)} />
  );
}
