import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const { name, image, price } = this.props;
    return (
      <div>
        <h3>{ name }</h3>
        <img src={ image } alt={ name } />
        <p>{ price }</p>
      </div>
    );
  }
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Card;
