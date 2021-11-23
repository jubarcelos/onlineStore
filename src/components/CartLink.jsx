import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CartLink extends Component {
  render() {
    return (
      <Link to="/cart" data-testid="shopping-cart-button">
        <img
          width="25px"
          src="https://cdn-icons-png.flaticon.com/512/126/126510.png"
          alt="logo"
        />
      </Link>
    );
  }
}

export default CartLink;
