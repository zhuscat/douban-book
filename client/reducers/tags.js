const initialTagsState = {
  isFetching: false,
  items: [],
};

export default function tags(state = initialTagsState, action) {
  switch (action.type) {
    case 'REQUEST_HOT_TAGS':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'RECEIVE_HOT_TAGS':
      return Object.assign({}, state, {
        items: action.tags,
      });
    default:
      return state;
  }
}
