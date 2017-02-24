import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import booklists from './booklist';
import tags from './tags';
import entities from './entities';

const rootReducer = combineReducers({
  booklists,
  tags,
  entities,
  routing: routerReducer,
});

export default rootReducer;
