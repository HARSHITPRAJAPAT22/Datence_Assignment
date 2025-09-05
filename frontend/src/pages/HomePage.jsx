import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Database, TrendingUp } from 'lucide-react';
import { useBooks } from '../hooks/useBooks';
import BookCard from '../components/BookCard';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import { 
  LoadingGrid, 
  EmptyState, 
  ErrorMessage, 
  LoadingSpinner 
} from '../components/UIComponents';
import { booksAPI } from '../services/api';

const HomePage = () => {
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [stats, setStats] = useState(null);

  const { books, loading, error, pagination, fetchBooks } = useBooks();

  useEffect(() => {
    const params = {
      ...filters,
      page: currentPage,
      limit: 12
    };
    
    Object.keys(params).forEach(key => {
      if (params[key] === '' || params[key] === 'all') {
        delete params[key];
      }
    });

    fetchBooks(params);
  }, [filters, currentPage, fetchBooks]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await booksAPI.getStats();
        if (response.success) {
          setStats(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };
    fetchStats();
  }, []);

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); 
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookSearch = (searchTerm) => {
    setFilters(prev => ({
      ...prev,
      search: searchTerm
    }));
    setCurrentPage(1); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRefreshData = async () => {
    setIsRefreshing(true);
    try {
      await booksAPI.refreshBooks();
      await fetchBooks({ ...filters, page: currentPage, limit: 12 });
     
      const statsResponse = await booksAPI.getStats();
      if (statsResponse.success) {
        setStats(statsResponse.data);
      }
    } catch (error) {
      console.error('Failed to refresh data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                 Book Explorer
              </h1>
              <p className="text-gray-600 mt-1">
                Discover amazing books from our curated collection
              </p>
            </div>
            
            <button
              onClick={handleRefreshData}
              disabled={isRefreshing}
              className={`
                inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white
                ${isRefreshing 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }
              `}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <Database className="w-8 h-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Total Books</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalBooks}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-green-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">In Stock</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.inStock}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <RefreshCw className="w-8 h-8 text-orange-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Out of Stock</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.outOfStock}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        <FilterBar 
          onFiltersChange={handleFiltersChange} 
          isLoading={loading || isRefreshing}
          initialFilters={filters}
        />

        {error ? (
          <ErrorMessage 
            message={error} 
            onRetry={() => fetchBooks({ ...filters, page: currentPage, limit: 12 })}
          />
        ) : loading ? (
          <LoadingGrid />
        ) : books.length === 0 ? (
          <EmptyState
            title="No books found"
            description="Try adjusting your search criteria or refresh the data"
            action={
              <button
                onClick={handleRefreshData}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Data
              </button>
            }
          />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {books.map((book) => (
                <BookCard 
                  key={book._id} 
                  book={book}
                  onSearchBook={handleBookSearch}
                />
              ))}
            </div>

            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
              isLoading={loading}
            />
          </>
        )}

        {isRefreshing && (
          <div className="fixed inset-0 bg-black bg-opacity-25 z-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <LoadingSpinner size="large" text="Scraping latest books..." />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
