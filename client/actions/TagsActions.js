import fetch from 'isomorphic-fetch';
import config from '../../server/config';

export function requestHotTags() {
  return {
    type: 'REQUEST_HOT_TAGS',
  };
}

export function receiveHotTags(tags) {
  return {
    type: 'RECEIVE_HOT_TAGS',
    tags,
  };
}

export function fetchHotTags() {
  return (dispatch) => {
    dispatch(requestHotTags());
    const url = __SERVER__ ? `http://localhost:${config.port}/api/tags` : '/api/tags';
    return fetch(url)
      .then(response => response.json())
      .then((json) => {
        dispatch(receiveHotTags(json));
      })
      .catch((err) => { throw err; });
  };
}

