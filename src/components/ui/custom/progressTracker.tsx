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
  amount: string;
  currentStatus: 'received' | 'confirmed' | 'on_way' | 'in_progress' | 'completed';
  expectedCompletion?: string;
  placedDate?: string;
}

export default function BookingProgressTracker({ 
  orderNum, 
  service, 
  amount, 
  currentStatus, 
  expectedCompletion,
  placedDate 
}: BookingProgressTrackerProps){
  const steps = [
    { status: 'received', label: 'Order placed successfully', shortLabel: 'Received' },
    { status: 'confirmed', label: 'Booking Confirmed', shortLabel: 'Confirmed' },
    { status: 'on_way', label: 'Team dispatched', shortLabel: 'On Way' },
    { status: 'in_progress', label: 'Service in progress', shortLabel: 'In Progress' },
    { status: 'completed', label: 'Service completed', shortLabel: 'Completed' }
  ];

  const statusOrder = {
    'received': 0,
    'confirmed': 1,
    'on_way': 2,
    'in_progress': 3,
    'completed': 4
  };

  const currentStepIndex = statusOrder[currentStatus] || 0;

  return (
    <Card className="border border-gray-500 p-3 sm:p-6 mb-6 shadow-sm">
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
          <span className="font-semibold text-base sm:text-lg">{amount}</span>
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
              <span>Order Received</span>
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
              ${currentStatus === 'received' ? 'bg-gray-100 text-gray-900' :
                currentStatus === 'confirmed' ? 'bg-purple-100 text-purple-900' :
                currentStatus === 'on_way' ? 'bg-yellow-100 text-yellow-900' :
                currentStatus === 'in_progress' ? 'bg-blue-100 text-blue-900' :
                'bg-green-100 text-green-800'
              }
            `}>
              {currentStatus === 'completed' && <Check size={14} className="sm:w-4 sm:h-4" />}
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