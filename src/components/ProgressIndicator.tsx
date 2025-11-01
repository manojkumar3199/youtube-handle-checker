import React from 'react';
import { CheckProgress } from '@/types';
import { Loader2 } from 'lucide-react';

interface ProgressIndicatorProps {
  progress: CheckProgress;
  isVisible: boolean;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  progress,
  isVisible
}) => {
  if (!isVisible) return null;

  const progressPercentage = progress.total > 0 
    ? Math.round((progress.completed / progress.total) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-5 h-5 text-red-600 animate-spin" />
          <h3 className="text-lg font-semibold text-gray-900">Checking Handles</h3>
        </div>
        <span className="text-sm font-medium text-gray-600">
          {progress.completed} of {progress.total} completed
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
        <div 
          className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="flex justify-between text-sm text-gray-600">
        <span>{progressPercentage}% complete</span>
        <span>
          {progress.inProgress} checking
          {progress.inProgress !== 1 ? 's' : ''}
        </span>
      </div>

      {progress.completed < progress.total && (
        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            We're checking each handle to ensure accurate results. This may take a moment...
          </p>
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;