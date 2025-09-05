import React from 'react';
import { BookOpen, AlertCircle, RefreshCw } from 'lucide-react';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizeClasses[size]} animate-spin text-blue-600 mb-2`}>
        <RefreshCw className="w-full h-full" />
      </div>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  );
};

const EmptyState = ({ 
  title = 'No books found', 
  description = 'Try adjusting your search or filters',
  icon: Icon = BookOpen,
  action 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <Icon className="w-16 h-16 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-4 max-w-md">{description}</p>
      {action}
    </div>
  );
};

const ErrorMessage = ({ 
  message = 'Something went wrong', 
  onRetry,
  showRetry = true 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center mb-3">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          <h3 className="text-red-800 font-medium">Error</h3>
        </div>
        <p className="text-red-700 text-sm mb-4">{message}</p>
        {showRetry && onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

const BookCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-5 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

const LoadingGrid = ({ count = 12 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <BookCardSkeleton key={index} />
      ))}
    </div>
  );
};

export {
  LoadingSpinner,
  EmptyState,
  ErrorMessage,
  BookCardSkeleton,
  LoadingGrid
};
