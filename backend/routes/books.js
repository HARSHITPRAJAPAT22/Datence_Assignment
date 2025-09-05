import express from 'express';
import Book from '../models/Book.js';
import { runScraper } from '../../scraper/index.js';

const router = express.Router();
router.get('/books', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      search, 
      rating, 
      minPrice, 
      maxPrice, 
      inStock 
    } = req.query;
    const filter = {};
    if (search) {
      filter.$text = { $search: search };
    }
    if (rating && rating !== 'all') {
      filter.rating = { $gte: parseInt(rating) };
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    if (inStock === 'true') {
      filter.stock = { $regex: /in stock/i };
    } else if (inStock === 'false') {
      filter.stock = { $not: { $regex: /in stock/i } };
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [books, totalBooks] = await Promise.all([
      Book.find(filter)
        .skip(skip)
        .limit(limitNum)
        .sort({ scrapedAt: -1 }),
      Book.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(totalBooks / limitNum);

    res.json({
      success: true,
      data: {
        books,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalBooks,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1
        }
      }
    });

  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch books',
      error: error.message
    });
  }
});

router.get('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const book = await Book.findById(id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.json({
      success: true,
      data: book
    });

  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch book details',
      error: error.message
    });
  }
});

router.post('/refresh', async (req, res) => {
  try {
    await Book.deleteMany({});
    const scrapedBooks = await runScraper();
    
    res.json({
      success: true,
      message: `Successfully scraped and stored ${scrapedBooks.length} books`,
      data: {
        booksCount: scrapedBooks.length
      }
    });

  } catch (error) {
    console.error('Error refreshing data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to refresh data',
      error: error.message
    });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const inStock = await Book.countDocuments({ stock: { $regex: /in stock/i } });
    const outOfStock = totalBooks - inStock;
    
    const ratingStats = await Book.aggregate([
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        totalBooks,
        inStock,
        outOfStock,
        ratingStats
      }
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message
    });
  }
});

export default router;
