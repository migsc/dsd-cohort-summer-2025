import React from 'react';
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
    { status: 'received', label: 'Order placed successfully' },
    { status: 'confirmed', label: 'Booking Confirmed' },
    { status: 'on_way', label: 'Team dispatched' },
    { status: 'in_progress', label: 'Service in progress' },
    { status: 'completed', label: 'Service completed' }
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
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
      {/* Order Header */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Order #{orderNum}: {service}
        </h3>
        <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{amount}</span>
          {placedDate && <span>Placed: {placedDate}</span>}
        </div>
        {expectedCompletion && (
          <p className="text-sm text-gray-600 mt-2">
            Expected Completion: <span className="font-medium text-blue-600">{expectedCompletion}</span>
          </p>
        )}
      </div>

      {/* Progress Tracker */}
      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress 
            value={(currentStepIndex / (steps.length - 1)) * 100} 
            className="w-full h-3 [&>div]:bg-gradient-to-r [&>div]:from-gray-100 [&>div]:to-gray-600"
          />
          <div className="flex justify-between text-xs text-gray-600">
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
            inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
            ${currentStatus === 'received' ? 'bg-gray-100 text-gray-800' :
              currentStatus === 'confirmed' ? 'bg-purple-100 text-purple-800' :
              currentStatus === 'on_way' ? 'bg-yellow-100 text-yellow-800' :
              currentStatus === 'in_progress' ? 'bg-blue-100 text-blue-800' :
              'bg-green-100 text-green-800'
            }
          `}>
            {currentStatus === 'completed' && <Check size={16} />}
            <span>
              {steps.find(step => step.status === currentStatus)?.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};