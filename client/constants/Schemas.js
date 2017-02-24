import { schema } from 'normalizr';

const book = new schema.Entity('books', {}, { idAttribute: '_id' });

export const bookSchema = book;

