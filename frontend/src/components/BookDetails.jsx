import React from 'react';
import { X, ExternalLink, Star } from 'lucide-react';

const BookDetails = ({ book, isOpen, onClose }) => {
  if (!isOpen || !book) return null;

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
          className={`w-5 h-5 ${
            i <= rating 
              ? 'text-yellow-400 fill-yellow-400' 
              : 'text-gray-300'
          }`}
        />
      );
    }
    return stars;
  };

  const isInStock = book.stock?.toLowerCase().includes('in stock');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">

        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Book Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="flex justify-center">
              <div className="relative">
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="max-w-full h-auto max-h-80 object-contain rounded-lg shadow-lg"
                  onError={(e) => {
                    e.target.src = '/placeholder-book.png';
                  }}
                />
                {!isInStock && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Out of Stock
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {book.title}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {renderStars(book.rating)}
                </div>
                <span className="text-lg font-semibold text-gray-700">
                  {book.rating}.0
                </span>
                <span className="text-sm text-gray-500">
                  ({book.rating} out of 5 stars)
                </span>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Price</div>
                <div className="text-3xl font-bold text-green-600">
                  {formatPrice(book.price)}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">
                  Availability:
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isInStock
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {book.stock}
                </span>
              </div>

              <div className="pt-4">
                <a
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Website
                </a>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Added:</span>
                    <div className="text-gray-600">
                      {new Date(book.createdAt || book.scrapedAt || Date.now()).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Updated:</span>
                    <div className="text-gray-600">
                      {new Date(book.updatedAt || book.scrapedAt || Date.now()).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
