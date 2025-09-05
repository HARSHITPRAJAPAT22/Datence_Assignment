import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  
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
        <span
          key={i}
          className={`text-lg ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const isInStock = book.stock?.toLowerCase().includes('in stock');

  const handleClick = () => {
    navigate(`/book/${book._id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      
      <div className="relative h-90 bg-gray-100 overflow-hidden">
        <img
          src={book.thumbnail}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.target.src = '/placeholder-book.png';
          }}
        />
        {!isInStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Out of Stock
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm leading-tight">
          {book.title}
        </h3>

        <div className="flex items-center mb-2">
          <div className="flex">{renderStars(book.rating)}</div>
          <span className="ml-1 text-sm text-gray-600">({book.rating})</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-green-600">
            {formatPrice(book.price)}
          </span>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              isInStock
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {isInStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
