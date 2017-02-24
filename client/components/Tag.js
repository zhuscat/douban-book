import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import '../styles/tag.scss';

const propTypes = {
  name: PropTypes.string,
  selected: PropTypes.bool,
  to: PropTypes.string,
};

export default class Tag extends Component {
  render() {
    const className = this.props.selected ? 'db-tag--active' : 'db-tag';
    return (
      <Link className={className} to={this.props.to}>{ this.props.name }</Link>
    );
  }
}

Tag.propTypes = propTypes;
