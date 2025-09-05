import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookDetailsPage from './pages/BookDetailsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:id" element={<BookDetailsPage />} />
          <Route path="*" element={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600 mb-4">Page not found</p>
                <a 
                  href="/" 
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Go back to homepage
                </a>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
