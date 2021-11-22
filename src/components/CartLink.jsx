import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CartLink extends React.Component {
  render() {
    const { productOnCart } = this.props;
    // o to do link, é um atributo de location para armazenar as informacoes do item adicionado e conseguir acessar em outro componentes.
    return (
      <div>
        <Link
          to={ {
            pathname: '/cart',
            state: { productInfo: productOnCart },
          } }
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

CartLink.propTypes = {
  productOnCart: PropTypes.shape({
    productName: PropTypes.string,
    productPrice: PropTypes.number,
    productImg: PropTypes.string,
  }).isRequired,
};
