'use client';
import SearchBar from './searchbar';
import { User } from 'lucide-react';
import Notifications from './notifications';
import type { Component } from 'react';

interface PortalHeaderProps {
    logoSrc: string;
    logoAlt: string;
    businessName: string;
}

export default function PortalHeader({ logoSrc, logoAlt, businessName }: PortalHeaderProps) {
    return (
        <header className='flex items-center justify-between p-4 border-b z-10'>
            <img src={logoSrc} alt={logoAlt} width={50} height={50}/>
            <h1 className='text-xl font-bold text-gray-300'>{businessName}</h1>
            <SearchBar placeholder='Search services...'></SearchBar>
             {/* Notifications */}
            <div className="flex items-center gap-3">
                {/* ***TODO: MAKE NOTIFICATIONS COMPONENT THAT UPDATES */}
                <Notifications></Notifications>

                {/* Profile */}
                {/* ***TODO: MAKE PROFILE DYNAMIC COMPONENT, PULL FROM DB */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-300">
                        John Doe
                    </span>
                </div>
            </div>
        </header>
    );
};