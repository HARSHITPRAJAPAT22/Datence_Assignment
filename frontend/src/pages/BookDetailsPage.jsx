import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Star, ShoppingCart } from 'lucide-react';
import { useBook } from '../hooks/useBooks';
import { LoadingSpinner, ErrorMessage } from '../components/UIComponents';

const BookDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { book, loading, error } = useBook(id);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-6 h-6 ${
            i <= rating 
              ? 'text-yellow-400 fill-yellow-400' 
              : 'text-gray-300'
          }`}
        />
      );
    }
    return stars;
  };

  const isInStock = book?.stock?.toLowerCase().includes('in stock');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading book details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Books
          </button>
          <ErrorMessage 
            message={error} 
            onRetry={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Book not found</h2>
          <Link 
            to="/"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
     
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Books
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
    
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-full max-w-sm">
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="w-full h-96 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.src = '/placeholder-book.png';
                  }}
                />
                {!isInStock && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Out of Stock
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                  {book.title}
                </h1>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  {renderStars(book.rating)}
                </div>
                <div className="text-lg font-semibold text-gray-700">
                  {book.rating}.0 out of 5
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-green-700 font-medium mb-1">
                      Price
                    </div>
                    <div className="text-4xl font-bold text-green-600">
                      {formatPrice(book.price)}
                    </div>
                  </div>
                  <ShoppingCart className="w-12 h-12 text-green-500" />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Availability
                </h3>
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      isInStock
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}
                  >
                    {book.stock}
                  </span>
                </div>
              </div>

              <div className="pt-6 space-y-3">                
                <button
                  onClick={() => navigate('/')}
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-8 py-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Book Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <span className="font-medium text-gray-700">Rating:</span>
                <div className="text-gray-600">{book.rating} out of 5 stars</div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Price:</span>
                <div className="text-gray-600">{formatPrice(book.price)}</div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Stock Status:</span>
                <div className="text-gray-600">{book.stock}</div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Added to Database:</span>
                <div className="text-gray-600">
                  {new Date(book.createdAt || book.scrapedAt || Date.now()).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Last Updated:</span>
                <div className="text-gray-600">
                  {new Date(book.updatedAt || book.scrapedAt || Date.now()).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetailsPage;
