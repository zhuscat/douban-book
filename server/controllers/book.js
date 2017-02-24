import Book from '../models/book';

async function getBooks(ctx) {
  const sortKey = ctx.query.sort || 'ratingPeople';
  const page = ctx.query.page || 0;
  const sortObject = {
    [sortKey]: -1,
  };
  const books = await Book.find()
    .skip(page * 20)
    .limit(20)
    .sort(sortObject)
    .exec();
  ctx.body = books.map(book => book.toObject());
}

async function getBooksByTag(ctx) {
  const tag = decodeURIComponent(ctx.params.tag);
  const sortKey = ctx.query.sort || 'ratingPeople';
  const page = ctx.query.page || 0;
  const sortObject = {
    [sortKey]: -1,
  };
  const books = await Book.find({
    tags: tag,
  }).skip(page * 20)
    .limit(20)
    .sort(sortObject)
    .exec();
  ctx.body = books.map(book => book.toObject());
}

export default { getBooks, getBooksByTag };
