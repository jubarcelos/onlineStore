import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CartLink extends Component {
  totalProducts = () => {
    const { productsOnCart } = this.props;
    const total = productsOnCart
      .map(({ productCounter }) => productCounter)
      .reduce((acc, crr) => acc + crr, 0);
    return total;
  }

  // salve-nos Victor!

  render() {
    return (
      <div>
        <Link to="/cart" data-testid="shopping-cart-button">
          <img
            width="25px"
            src="https://cdn-icons-png.flaticon.com/512/126/126510.png"
            alt="logo"
          />
        </Link>
        <span data-testid="shopping-cart-size">
          { this.totalProducts() }
        </span>
      </div>
    );
  }
}

export default CartLink;

CartLink.propTypes = {
  productsOnCart: PropTypes.arrayOf(PropTypes.object).isRequired,
};
