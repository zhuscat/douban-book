import React, { Component, PropTypes } from 'react';
import '../styles/book-item.scss';

const propTypes = {
  picUrl: PropTypes.string,
  rating: PropTypes.number,
  title: PropTypes.string,
  author: PropTypes.string,
};

export default class BookItem extends Component {
  render() {
    return (
      <div className="book-item">
        <div className="book-item__cover">
          <img src={this.props.picUrl} alt={this.props.title} />
        </div>
        <div className="book-item__info">
          <span className="book-item__title">{this.props.title}</span>
          <span className="book-item__author">{this.props.author}</span>
          <span className="book-item__rating">{this.props.rating}</span>
        </div>
      </div>
    );
  }
}

BookItem.propTypes = propTypes;
