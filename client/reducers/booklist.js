const initialBooklistState = {
  isFetching: false,
  items: [],
  page: 0,
};

function booklist(state = initialBooklistState, action) {
  switch (action.type) {
    case 'RECEIVE_BOOKS':
      return Object.assign({}, state, {
        isFetching: false,
        items: [...state.items, ...action.books],
        page: state.page + 1,
      });
    case 'REQUEST_BOOKS':
      return Object.assign({}, state, {
        isFetching: true,
      });
    default:
      return state;
  }
}

const initialState = {
  'ALL_BOOKS-ratingPeople': { isFetching: false, items: [], page: 0 },
};

export default function booklists(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_BOOKS':
      return Object.assign({}, state, {
        [`${action.booklist}-${action.sort}`]: booklist(state[`${action.booklist}-${action.sort}`], action),
      });
    case 'RECEIVE_BOOKS':
      return Object.assign({}, state, {
        [`${action.booklist}-${action.sort}`]: booklist(state[`${action.booklist}-${action.sort}`], action),
      });
    default:
      return state;
  }
}
