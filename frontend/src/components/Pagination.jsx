import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ pagination, onPageChange, isLoading }) => {
  const { currentPage, totalPages, totalBooks, hasNextPage, hasPrevPage } = pagination;

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const delta = 2; 
    const pages = [];
    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);

    if (rangeStart > 2) {
      pages.push('...');
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    if (rangeEnd < totalPages - 1) {
      pages.push('...');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
  
      <div className="text-sm text-gray-700">
        Showing page <span className="font-medium">{currentPage}</span> of{' '}
        <span className="font-medium">{totalPages}</span> (
        <span className="font-medium">{totalBooks}</span> total books)
      </div>

      <div className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevPage || isLoading}
          className={`
            inline-flex items-center px-3 py-2 rounded-md text-sm font-medium
            ${!hasPrevPage || isLoading
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
            }
          `}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>

        <div className="flex items-center space-x-1">
          {pageNumbers.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-3 py-2 text-gray-400">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(page)}
                  disabled={isLoading}
                  className={`
                    px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${page === currentPage
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                    ${isLoading ? 'cursor-not-allowed opacity-50' : ''}
                  `}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage || isLoading}
          className={`
            inline-flex items-center px-3 py-2 rounded-md text-sm font-medium
            ${!hasNextPage || isLoading
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
            }
          `}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
