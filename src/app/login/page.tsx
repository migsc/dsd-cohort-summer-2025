"use client";

import { useState, Suspense } from "react";

import SignInForm from "@/components/forms/sign-in-form";
import SignUpForm from "@/components/forms/sign-up-form";

export default function LoginPage() {
  const [showSignIn, setShowSignIn] = useState(true);

<<<<<<< HEAD
  return showSignIn ? (
      <SignInForm onSwitchToSignUp={() => setShowSignIn(true)} />
  ) : (
      <SignUpForm onSwitchToSignIn={() => setShowSignIn(false)} />
=======
  return (
    <Suspense fallback={<div>Loading forms...</div>}>
      {showSignIn ? (
        <SignInForm onSwitchToSignUp={() => setShowSignIn(false)} />
      ) : (
        <SignUpForm onSwitchToSignIn={() => setShowSignIn(true)} />
      )}
    </Suspense>
>>>>>>> 048f0e9bbf53031ab02809f0c53dd55659f513ae
  );
}
