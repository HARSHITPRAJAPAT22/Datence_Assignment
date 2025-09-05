import { useState, useEffect, useCallback } from 'react';
import { booksAPI } from '../services/api';

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalBooks: 0,
    hasNextPage: false,
    hasPrevPage: false
  });

  const fetchBooks = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await booksAPI.getBooks(params);
      
      if (response.success) {
        setBooks(response.data.books);
        setPagination(response.data.pagination);
      } else {
        throw new Error(response.message || 'Failed to fetch books');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch books');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      await booksAPI.refreshBooks();
      await fetchBooks({ page: 1 });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to refresh books');
    } finally {
      setLoading(false);
    }
  };

  return {
    books,
    loading,
    error,
    pagination,
    fetchBooks,
    refreshBooks,
  };
};

export const useBook = (id) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBook = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const response = await booksAPI.getBook(id);
      
      if (response.success) {
        setBook(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch book');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch book');
      setBook(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  return {
    book,
    loading,
    error,
    refetch: fetchBook,
  };
};
