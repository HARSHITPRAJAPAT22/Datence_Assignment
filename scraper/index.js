import axios from "axios";
import * as cheerio from "cheerio";
import { connectDatabase, disconnectDatabase } from "../backend/database/script.js";
import Book from "../backend/models/Book.js";

const BASE_URL = "https://books.toscrape.com";

function getRating(ratingClass) {
  const ratings = { 'One': 1, 'Two': 2, 'Three': 3, 'Four': 4, 'Five': 5 };
  const ratingText = ratingClass?.split(' ')[1]; 
  return ratings[ratingText] || 0;
}

function getPrice(priceText) {
  return parseFloat(priceText?.replace(/[£$]/g, '') || 0);
}

async function runScraper() {
  try {
    await connectDatabase();
    await Book.deleteMany({});
  
    let page = 1;
    let totalBooks = 0;
    
    while (true) {
      const url = page === 1 ? `${BASE_URL}/index.html` : `${BASE_URL}/catalogue/page-${page}.html`;
         
      try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        
        const books = [];
  
        $('.product_pod').each((i, el) => {
          const $book = $(el);
          
          const title = $book.find('h3 a').attr('title') || $book.find('h3 a').text().trim();
          const priceText = $book.find('.price_color').text();
          const price = getPrice(priceText);
          const stock = $book.find('.availability').text().trim();
          const ratingClass = $book.find('p[class*="star-rating"]').attr('class');
          const rating = getRating(ratingClass);
          const detailPath = $book.find('h3 a').attr('href')?.replace('../', 'catalogue/');
          const imagePath = $book.find('img').attr('src')?.replace('../', '');
          
          const url = detailPath ? `${BASE_URL}/${detailPath}` : '';
          const thumbnail = imagePath ? `${BASE_URL}/${imagePath}` : '';
          
          if (title && price > 0 && url) {
            books.push({
              title,
              price,
              stock: stock || 'Unknown',
              rating,
              url,
              thumbnail
            });
          }
        });
        
        if (books.length === 0) {
          break;
        }
        
        await Book.insertMany(books);
        totalBooks += books.length;
        const hasNext = $('.next a').length > 0;
        if (!hasNext) {
          break;
        }
        
        page++;
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        if (error.response?.status === 404) {
          console.log(`📄 Page ${page} not found, stopping.`);
          break;
        }
        throw error;
      }
    }
    
     
  } catch (error) {
    console.error('Scraper error:', error.message);
  } finally {
    await disconnectDatabase();
  }
}

export { runScraper };

if (import.meta.url === `file://${process.argv[1]}`) {
  runScraper().then(() => process.exit(0));
}
