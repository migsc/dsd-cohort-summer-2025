"use client";
import { User } from "lucide-react";
import Notifications from "./notifications";

interface PortalHeaderProps {
  logoSrc: string;
  logoAlt: string;
  businessName: string;
}

export default function PortalHeader({
  logoSrc,
  logoAlt,
  businessName,
}: PortalHeaderProps) {
  return (
    <header className="z-10 flex items-center justify-between gap-2 border-b p-4">
      <div className="flex items-center gap-5">
        <img src={logoSrc} alt={logoAlt} width={50} height={50} />
        <h1 className="text-center text-xl font-bold text-gray-300">
          {businessName}
        </h1>
      </div>
      {/* Notifications */}
      <div className="flex items-center gap-3">
        {/* ***TODO: MAKE NOTIFICATIONS COMPONENT THAT UPDATES */}
        <Notifications></Notifications>

        {/* Profile */}
        {/* ***TODO: MAKE PROFILE DYNAMIC COMPONENT, PULL FROM DB */}
        <div className="flex items-center gap-2">
          <div className="hidden h-8 w-8 items-center justify-center rounded-full bg-gray-300 md:flex">
            <User className="h-4 w-4 text-gray-600" />
          </div>
          <span className="text-sm font-medium text-gray-300">John Doe</span>
        </div>
      </div>
    </header>
  );
}
