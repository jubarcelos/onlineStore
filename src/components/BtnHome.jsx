import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BtnHome extends Component {
  render() {
    const { handleClick, name } = this.props;
    return (
      <button
        data-testid="query-button"
        type="button"
        onClick={ () => handleClick(name) }
      >
        Search
      </button>
    );
  }
}

export default BtnHome;

BtnHome.propTypes = {
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
