import React, { Component, PropTypes } from 'react';
import imgLazyLoader from '../utils/imgLazyLoader';

const propTypes = {
  children: PropTypes.any,
};

class LazyLoad extends Component {
  componentDidMount() {
    imgLazyLoader.init();
  }

  componentDidUpdate() {
    imgLazyLoader.findImages();
  }

  componentWillUnmount() {
    imgLazyLoader.stop();
  }

  render() {
    return this.props.children;
  }
}

LazyLoad.propTypes = propTypes;

export default LazyLoad;
