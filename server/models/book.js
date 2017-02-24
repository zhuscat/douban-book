import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const bookSchema = mongoose.Schema({
  douban_id: String,
  title: String,
  author: String,
  subtitle: String,
  publisher: String,
  originalTitle: String,
  translator: String,
  year: String,
  pages: Number,
  price: String,
  binding: String,
  series: String,
  isbn: String,
  tags: Array,
  rating: Number,
  ratingPeople: Number,
  picUrl: String,
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
