import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputHome extends Component {
  render() {
    const { name, handleInput } = this.props;
    return (
      <input
        data-testid="query-input"
        type="text"
        value={ name }
        name="name"
        onChange={ handleInput }
      />
    );
  }
}

export default InputHome;

InputHome.propTypes = {
  name: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
};
