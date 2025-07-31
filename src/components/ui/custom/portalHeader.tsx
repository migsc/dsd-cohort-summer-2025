'use client';
import { User } from 'lucide-react';
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
                        <User className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">
                        {userName}
                    </span>
                </div>
            </div>
        </header>
    );
};