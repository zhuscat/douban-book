import Book from '../models/book';

async function getTags(ctx) {
  const tags = await Book.aggregate([
    { $unwind: '$tags' },
    { $group: { _id: '$tags', total: { $sum: 1 } } },
    { $sort: { total: -1 } },
  ]).limit(20).exec();
  ctx.body = tags;
}

export default { getTags };
