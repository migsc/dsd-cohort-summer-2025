import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import { Check } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface BookingProgressTrackerProps {
  orderNum: string;
  service: string;
  servicePrice: number;
  currentStatus: 'PENDING' | 'CONFIRMED' | 'ON_WAY' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';
  expectedCompletion?: string;
  placedDate?: string;
}

export default function BookingProgressTracker({ 
  orderNum, 
  service, 
  servicePrice, 
  currentStatus, 
  expectedCompletion,
  placedDate 
}: BookingProgressTrackerProps){
  const steps = [
    { status: 'PENDING', label: 'Order placed successfully', shortLabel: 'PENDING' },
    { status: 'CONFIRMED', label: 'Booking confirmed', shortLabel: 'confirmed' },
    { status: 'ON_WAY', label: 'Team dispatched', shortLabel: 'On Way' },
    { status: 'IN_PROGRESS', label: 'Service in progress', shortLabel: 'In Progress' },
    { status: 'COMPLETED', label: 'Service completed', shortLabel: 'completed' }
  ];

  const statusOrder = {
    'PENDING': 0,
    'CONFIRMED': 1,
    'ON_WAY': 2,
    'IN_PROGRESS': 3,
    'COMPLETED': 4,
    'CANCELED': -1
  };

  const currentStepIndex = statusOrder[currentStatus] || 0;

  return (
    <Card className="border border-gray-500 shadow-sm px-2 md:p-6 mb-5 w-full">
      {/* Order Header */}
      <CardHeader>
        <CardTitle className="text-center text-base">
          <div className="flex flex-col">
            <span className="font-semibold">Order #{orderNum}:</span>
            <span className="text-sm sm:text-base">{service}</span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="text-center px-0 sm:px-6 pb-3 sm:pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1 sm:gap-4 text-sm">
          <span className="font-semibold text-sm md:text-lg">${servicePrice}</span>
          {placedDate && <span className="text-xs sm:text-sm">Placed: {placedDate}</span>}
        </div>
        {expectedCompletion && (
          <p className="text-xs sm:text-sm mt-2">
            Expected Completion: <span className="font-medium text-blue-400">{expectedCompletion}</span>
          </p>
        )}
      </CardContent>
      
      <CardFooter className='flex-col gap-3 sm:gap-4 px-0 sm:px-6'>
        {/* Progress Tracker */}
        <div className="w-full space-y-3 sm:space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress 
              value={(currentStepIndex / (steps.length - 1)) * 100} 
              className="w-full h-2 sm:h-3"
            />
            
            <div className="flex justify-between text-xs text-gray-200">
              <span>Order Pending</span>
              <span>Confirmed</span>
              <span>On The Way</span>
              <span>In Progress</span>
              <span>Completed</span>
            </div>
          </div>

          {/* Current Status Display */}
          <div className="text-center">
            <div className={`
              inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium
              ${currentStatus === 'PENDING' ? 'bg-gray-100 text-gray-900' :
                currentStatus === 'CONFIRMED' ? 'bg-purple-100 text-purple-900' :
                currentStatus === 'ON_WAY' ? 'bg-yellow-100 text-yellow-900' :
                currentStatus === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-900' :
                'bg-green-100 text-green-800'
              }
            `}>
              {currentStatus === 'COMPLETED' && <Check size={14} className="sm:w-4 sm:h-4" />}
              <span className="whitespace-nowrap">
                {steps.find(step => step.status === currentStatus)?.label}
              </span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}