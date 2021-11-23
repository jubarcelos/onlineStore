import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends Component {
  render() {
    const { name, image, price, id, getProduct } = this.props;
    return (
      <div>
        <Link to={ `/product/${id}` } data-testid="product-detail-link">
          <h3>{ name }</h3>
          <img src={ image } alt={ name } />
          <p>{ price }</p>
        </Link>
        <button type="button" onClick={ getProduct }>
          Buy
        </button>
      </div>
    );
  }
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  getProduct: PropTypes.func.isRequired,
};

export default Card;
