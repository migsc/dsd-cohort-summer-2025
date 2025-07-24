"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      onClick={handleLogout}
      className="rounded-xs bg-red-400 p-1 text-white transition-all duration-200 ease-in-out hover:bg-red-200 hover:text-black"
    >
      Logout
    </button>
  );
}
