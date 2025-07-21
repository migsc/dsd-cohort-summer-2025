"use client";

import { useState } from "react";

import SignInForm from "@/components/forms/sign-in-form";
import SignUpForm from "@/components/forms/sign-up-form";

export default function LoginPage() {
  const [showSignIn, setShowSignIn] = useState(false);

  return showSignIn ? (
      <SignInForm onSwitchToSignUp={() => setShowSignIn(false)} />
  ) : (
      <SignUpForm onSwitchToSignIn={() => setShowSignIn(true)} />
  );
}
