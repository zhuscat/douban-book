import { normalize } from 'normalizr';
import fetch from 'isomorphic-fetch';
import { bookSchema } from '../constants/Schemas';
import config from '../../server/config';

export function requestBook(bookId) {
  return {
    type: 'REQUEST_BOOK',
    bookId,
  };
}

export function receiveBook(book) {
  return {
    type: 'RECEIVE_BOOK',
    book,
  };
}

function fetchBook(bookId) {
  return (dispatch) => {
    dispatch(requestBook(bookId));
    const url = __SERVER__ ? `http://localhost:${config.port}/api/book/${bookId}` : `/api/book/${bookId}`;
    return fetch(url)
      .then(response => response.json())
      .then((json) => {
        dispatch(receiveBook(json));
      })
      .catch((err) => { throw err; });
  };
}

export function requestBooks(tag, sort) {
  return {
    type: 'REQUEST_BOOKS',
    booklist: tag,
    sort,
  };
}

export function receiveBooks(entities, books, tag, sort) {
  return {
    type: 'RECEIVE_BOOKS',
    entities,
    books,
    booklist: tag,
    sort,
  };
}

export function fetchBooks(tag, sort = 'ratingPeople', page = 0) {
  return (dispatch) => {
    dispatch(requestBooks(tag ? tag : 'ALL_BOOKS', sort));
    const pathPart = `${encodeURIComponent(tag ? tag : '')}?sort=${sort}&page=${page}`;
    const url = __SERVER__ ? `http://localhost:${config.port}/api/books/${pathPart}` : `/api/books/${pathPart}`;
    return fetch(url)
      .then(response => response.json())
      .then((json) => {
        const normalized = normalize(json, [bookSchema]);
        const { entities, result } = normalized;
        dispatch(receiveBooks(entities, result, tag ? tag : 'ALL_BOOKS', sort));
      })
      .catch((err) => { throw err; });
  };
}
