import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputHome extends Component {
  render() {
    const {
      props: { handleClick, searchInput, handleInput },
    } = this;
    return (
      <div>
        <input
          data-testid="query-input"
          type="text"
          value={ searchInput }
          name="searchInput"
          onChange={ handleInput }
          placeholder="Search"
        />
        <button
          data-testid="query-button"
          type="button"
          onClick={ () => handleClick(searchInput) }
        >
          Search
        </button>
      </div>
    );
  }
}

export default InputHome;

InputHome.propTypes = {
  searchInput: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};
