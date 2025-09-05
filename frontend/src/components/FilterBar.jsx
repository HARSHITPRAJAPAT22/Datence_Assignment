import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';

const FilterBar = ({ onFiltersChange, onSearch, isLoading, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    search: '',
    rating: 'all',
    minPrice: '',
    maxPrice: '',
    inStock: 'all',
    ...initialFilters
  });

  const [localSearch, setLocalSearch] = useState(initialFilters.search || '');

  useEffect(() => {
    if (initialFilters.search !== filters.search) {
      setFilters(prev => ({ ...prev, ...initialFilters }));
      setLocalSearch(initialFilters.search || '');
    }
  }, [initialFilters]);

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSearch = () => {
    setFilters(prev => ({
      ...prev,
      search: localSearch
    }));
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearFilters = () => {
    const defaultFilters = {
      search: '',
      rating: 'all',
      minPrice: '',
      maxPrice: '',
      inStock: 'all'
    };
    setFilters(defaultFilters);
    setLocalSearch('');
  };

  const hasActiveFilters = filters.rating !== 'all' || 
                          filters.inStock !== 'all' || 
                          filters.minPrice || 
                          filters.maxPrice || 
                          filters.search;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">

        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search Books
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search by title..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              disabled={isLoading}
            />
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
            disabled={isLoading}
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
            <option value="1">1+ Stars</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min Price (£)
          </label>
          <input
            type="number"
            placeholder="0.00"
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Price (£)
          </label>
          <input
            type="number"
            placeholder="100.00"
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Availability
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.inStock}
            onChange={(e) => handleFilterChange('inStock', e.target.value)}
            disabled={isLoading}
          >
            <option value="all">All Books</option>
            <option value="true">In Stock Only</option>
            <option value="false">Out of Stock</option>
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={clearFilters}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            <X className="h-4 w-4 mr-1" />
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
