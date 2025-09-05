import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  url: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  scrapedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

BookSchema.index({ title: 'text' });
BookSchema.index({ price: 1 });
BookSchema.index({ rating: 1 });
BookSchema.index({ stock: 1 });

export default mongoose.model('Book', BookSchema);
