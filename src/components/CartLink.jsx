import React from 'react';
import { Link } from 'react-router-dom';

class CartLink extends React.Component {
  render() {
    return (
      <div>
        <Link
          to="/cart"
          data-testid="shopping-cart-button"
        >
          <img
            width="25px"
            src="https://cdn-icons-png.flaticon.com/512/126/126510.png"
            alt="logo"
          />
        </Link>
      </div>
    );
  }
}

export default CartLink;
