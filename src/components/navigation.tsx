"use client";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Logout from "@/components/logout";
import { authClient } from "@/lib/auth-client";

export default function Navigation() {
  const { data: session, isPending } = authClient.useSession();

  const links = [
    { href: "/", label: "Home" },
    { href: "/business/dashboard", label: "Business Portal" },
    { href: "/login", label: "Login Page" },
    { href: "/customer/service", label: "Service" },
    { href: "/customer/dummy", label: "Service Catalog" },
  ];

  return (
    <div className="container mx-auto max-w-3xl px-4 py-2">
      <h1 className="mb-4 text-2xl font-bold">
        Welcome to the DSD Cohort Summer 2025 Project
      </h1>
      <div className="mb-4 flex items-center gap-2">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={buttonVariants({ variant: "link" })}
          >
            {link.label}
          </Link>
        ))}
        <Logout />
        {session?.user ? (
          <div>{session?.user.name}</div>
        ) : (
          <div>Unauthenticated</div>
        )}
      </div>
    </div>
  );
}
