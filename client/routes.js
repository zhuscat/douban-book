import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './containers/App';
import BookListContainer from './containers/BookListContainer';
import './styles/base.scss';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={BookListContainer} />
      <Route path=":tag" component={BookListContainer} />
    </Route>
  </Router>
);
