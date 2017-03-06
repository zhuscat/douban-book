import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { fetchBooks } from '../actions/BooksActions';
import { fetchHotTags } from '../actions/TagsActions';
import BookItem from '../components/BookItem';
import Tag from '../components/Tag';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  tag: PropTypes.string,
  booklists: PropTypes.object,
  tags: PropTypes.object,
  entities: PropTypes.object,
  sort: PropTypes.string,
};

export default class BookList extends Component {

  static fetchData({ dispatch, location, params }) {
    const dispatchTask = [];
    dispatchTask.push(dispatch(fetchHotTags()));
    dispatchTask.push(dispatch(fetchBooks(params.tag, location.query.sort)));
    return dispatchTask;
  }

  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
  }

  componentWillMount() {
    const { dispatch, booklists } = this.props;
    const originalTag = this.props.tag;
    const { sort } = this.props;
    const tag = this.props.tag ? this.props.tag : 'ALL_BOOKS';
    dispatch(fetchHotTags());
    if (!(`${tag}-${sort}` in booklists) || booklists[`${tag}-${sort}`].items.length === 0) {
      dispatch(fetchBooks(originalTag, sort));
    }
  }

  componentDidMount() {
    if (__CLIENT__) {
      window.addEventListener('scroll', this.onScroll, false);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, booklists } = nextProps;
    const originalTag = nextProps.tag;
    const tag = nextProps.tag ? nextProps.tag : 'ALL_BOOKS';
    const { sort } = nextProps;
    const previousTag = this.props.tag ? this.props.tag : 'ALL_BOOKS';
    const previousSort = this.props.sort;
    if (tag !== previousTag || sort !== previousSort) {
      if (!(`${tag}-${sort}` in booklists) || booklists[`${tag}-${sort}`].items.length === 0) {
        dispatch(fetchBooks(originalTag, sort));
      }
    }
  }

  componentWillUnmount() {
    if (__CLIENT__) {
      window.removeEventListener('scroll', this.onScroll, false);
    }
  }

  onScroll() {
    const { dispatch } = this.props;
    const { tag, booklists, sort } = this.props;
    const booklist = booklists[`${tag ? tag : 'ALL_BOOKS'}-${sort}`];
    const { isFetching } = booklist;
    if (window &&
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 200) && 
      !isFetching) {
      dispatch(fetchBooks(this.props.tag, this.props.sort, booklist.page + 1));
    }
  }

  render() {
    const { tags, tag, booklists, entities } = this.props;
    const { sort } = this.props;
    const booklist = booklists[`${tag ? tag : 'ALL_BOOKS'}-${sort}`];
    const items = (booklist && booklist.items) || [];
    const { location } = this.props;
    const { pathname } = location;
    return (
      <div className="db-container">
        <div className="db-tag-container">
          <Tag name={'全部'} to="/" selected={!tag} />
        {
          tags.items.map((t, idx) => {
            return (
              <Tag key={`${idx}`} name={decodeURI(t['_id'])} to={`/${t['_id']}`} selected={t['_id'] === this.props.tag} />
            );
          })
        }
        </div>
        <div className="db-sort-container">
          <Link className="db-sort-tag" to={{ pathname, query: { sort: 'rating' }}}>评分排序</Link>
          <Link className="db-sort-tag" to={{ pathname, query: { sort: 'ratingPeople' }}}>人数排序</Link>
        </div>
        <div className="db-book-container">
          {
            items.map((bookId, idx) => {
              const book = entities.books[bookId];
              return (
                <BookItem key={`${bookId}-${idx}`} {...book} />
              );
            })
          }
          <div className="book-item" />
          <div className="book-item" />
          <div className="book-item" />
          <div className="book-item" />
          <div className="book-item" />
          <div className="book-item" />
        </div>
      </div>
    );
  }
}

BookList.propTypes = propTypes;
