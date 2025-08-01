'use client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import Notifications from './notifications';

interface PortalHeaderProps {
    pageName: string;
    userName: string;
}

export default function PortalHeader({ pageName, userName }: PortalHeaderProps) {
    return (
        <header className='flex items-center justify-between p-4 border-b z-10 gap-2'>
            <div className='flex items-center gap-5'>
                <h1 className='text-xl text-center font-bold'>{pageName}</h1>
            </div>
             {/* Notifications */}
            <div className="flex items-center gap-3">
                {/* ***TODO: MAKE NOTIFICATIONS COMPONENT THAT UPDATES */}
                <Notifications></Notifications>

                {/* Profile */}
                {/* ***TODO: MAKE PROFILE DYNAMIC COMPONENT, PULL FROM DB */}
                <div className="flex items-center gap-2">
                    <div className="hidden md:flex w-8 h-8 bg-gray-300 rounded-full items-center justify-center">
                        <div className="flex flex-row flex-wrap items-center gap-12">
                        <Avatar className="rounded-2xl border-white border-1">
        <AvatarImage
          src="https://github.com/evilrabbit.png"
          alt="@evilrabbit"
        />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
                        </div>
                    </div>
                    <span className="text-sm font-medium">
                        {userName}
                    </span>
                </div>
            </div>
        </header>
    );
};