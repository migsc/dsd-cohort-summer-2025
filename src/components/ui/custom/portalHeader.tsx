"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import Notifications from "./notifications";

interface PortalHeaderProps {
  pageName?: string;
  userName?: string;
  logoSrc?: string;
  logoAlt?: string;
  businessName?: string;
}

export default function PortalHeader({
  pageName,
  userName,
}: PortalHeaderProps) {
  return (
    <header className="z-10 flex items-center justify-between gap-2 border-b p-4">
      <div className="flex items-center gap-5">
        <h1 className="text-center text-xl font-bold">{pageName}</h1>
      </div>
      {/* Notifications */}
      <div className="flex items-center gap-3">
        {/* ***TODO: MAKE NOTIFICATIONS COMPONENT THAT UPDATES */}
        {/* <Notifications></Notifications> */}

        {/* Profile */}
        {/* ***TODO: MAKE PROFILE DYNAMIC COMPONENT, PULL FROM DB */}
        <div className="flex items-center gap-2">
          <div className="hidden h-8 w-8 items-center justify-center rounded-full bg-gray-300 md:flex">
            <div className="flex flex-row flex-wrap items-center gap-12">
              <Avatar className="border-1 rounded-2xl border-white">
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <span className="text-sm font-medium">{userName}</span>
        </div>
      </div>
    </header>
  );
}
