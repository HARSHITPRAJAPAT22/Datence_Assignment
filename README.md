#  Book Explorer

A full-stack web application that scrapes book data from [Books to Scrape](https://books.toscrape.com/) and provides a modern, responsive interface for browsing and filtering books.

## Architecture

```
book-explorer/
├── scraper/     → Node.js scraper with Cheerio + Axios
├── backend/     → Express.js API server + MongoDB
├── frontend/    → React app with Tailwind CSS
└── README.md
```

## Features

###  Web Scraper
- Scrapes **all pages** from books.toscrape.com automatically
- Extracts: title, price, stock, rating, detail URL, thumbnail
- Stores data in MongoDB with timestamps
- Repeatable and refreshable scraping

###  Backend API
- **Clean Architecture**: Models, Routes, Controllers
- **RESTful Endpoints**:
  - `GET /api/books` - Paginated books with filters
  - `GET /api/books/:id` - Single book details
  - `POST /api/refresh` - Re-run scraper
  - `GET /api/stats` - Database statistics
- **Advanced Filtering**: Search, price range, rating, stock status
- **Error Handling & Validation**

### Frontend (React)
- **Modern UI** with Tailwind CSS
- **Responsive Design** for all devices  
- **Real-time Search & Filters**
- **Pagination** with smart controls
- **Book Details Modal** with full information
- **Loading States & Error Handling**
- **Database Statistics Dashboard**

##  Technology Stack

| Layer | Technologies |
|-------|-------------|
| **Scraper** | Node.js, Axios, Cheerio, Mongoose |
| **Backend** | Express.js, MongoDB, Mongoose, CORS |
| **Frontend** | React, React Router, Axios, Tailwind CSS |
| **Database** | MongoDB (local or Atlas) |
| **Icons** | Lucide React |


##  Quick Start

### 1. Install Dependencies
Open a terminal and run:
```bash
cd backend && npm install
cd ../frontend && npm install
cd ../scraper && npm install
```

### 2. Configure Environment Variables
Create a `.env` file in each of the `backend` and `frontend` folders (see below for example values).

### 3. Start MongoDB
If using local MongoDB, run:
```bash
mongod
```
Or use MongoDB Atlas and update your `.env` connection string.

### 4. Run the Scraper (to populate the database)
In a new terminal:
```bash
cd scraper
npm run dev
```

### 5. Start the Backend Server
In a new terminal:
```bash
cd backend
npm run dev
```

### 6. Start the Frontend
In a new terminal:
```bash
cd frontend
npm run dev
```

### 7. Open the App
- Frontend: http://localhost:5173 (or the port shown in your terminal)
- Backend API: http://localhost:3000/api/books

### Prerequisites
- Node.js 18+ 
- MongoDB (local installation or Atlas account)
- Git

### 1. Clone & Setup
```bash
git clone <your-repo>
cd book-explorer

# Install dependencies for all services
cd backend && npm install
cd ../frontend && npm install  
cd ../scraper && npm install
```

### 2. Environment Configuration

Create `.env` files in each directory:

**backend/.env:**
```env
MONGODB_URI=mongodb://localhost:27017/bookexplorer
PORT=3000
NODE_ENV=development
```

**frontend/.env:**
```env
VITE_API_URL=http://localhost:3000/api
```

### 3. Start MongoDB
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (update connection string in .env)
```

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend  
npm run dev
```

**Terminal 3 - Initial Data (Optional):**
```bash
cd scraper
npm run dev
```

### 5. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api/books

##  API Endpoints

### Books
```http
GET /api/books
  Query Parameters:
  - page: Page number (default: 1)  
  - limit: Items per page (default: 12)
  - search: Search by title
  - rating: Minimum rating filter (1-5)
  - minPrice: Minimum price filter
  - maxPrice: Maximum price filter  
  - inStock: Stock filter (true/false/all)

GET /api/books/:id
  Returns single book details

POST /api/refresh  
  Triggers scraper to refresh all data

GET /api/stats
  Returns database statistics
```

### Response Format
```json
{
  "success": true,
  "data": {
    "books": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 25,
      "totalBooks": 300,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

## 🗃️ Database Schema

```javascript
const BookSchema = {
  title: String,      
  price: Number,      
  stock: String,     
  rating: Number,   
  url: String,       
  thumbnail: String, 
  scrapedAt: Date,    
  createdAt: Date,   
  updatedAt: Date     
}
```

## 📱 Frontend Components

### Core Components
- **BookCard** - Individual book display card
- **FilterBar** - Search and filtering controls
- **Pagination** - Page navigation with smart controls  
- **BookDetails** - Modal with complete book information
- **UIComponents** - Loading states, error messages, empty states

### Pages
- **HomePage** - Main application interface with all functionality

### Custom Hooks  
- **useBooks** - Book fetching and state management
- **useBook** - Single book fetching


##  Performance Features

- **Pagination** reduces data transfer
- **Indexed searches** for fast queries  
- **Debounced search** prevents excessive API calls
- **Loading states** improve perceived performance
- **Error boundaries** for graceful failure handling
- **Responsive images** with fallbacks

##  Security Features

- **CORS** configured for cross-origin requests
- **Input validation** on all endpoints
- **Error handling** without sensitive data exposure
- **Environment variables** for sensitive configuration

##  Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Books to Scrape](https://books.toscrape.com/) for providing the data source
- [Tailwind CSS](https://tailwindcss.com/) for the design system
- [Lucide](https://lucide.dev/) for the beautiful icons

---

**Built with ❤️ using Node.js, React, and MongoDB**
