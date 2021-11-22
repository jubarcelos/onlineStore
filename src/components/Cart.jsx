import React from 'react';
import PropTypes from 'prop-types';
// import Product from './Product';

class Cart extends React.Component {
  render() {
    const { productInfo } = this.props;
    const notHaveProduct = <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>;
    const productInfoCard = (
      <div>
        <p>
          { productInfo.productName }
        </p>
        <img src={ productInfo.productImg } alt={ productInfo.productName } />
        <p>
          { productInfo.productPrice }
        </p>
      </div>
    );

    return (
      productInfo ? productInfoCard : notHaveProduct
    );
  }
}

export default Cart;

Cart.propTypes = {
  productInfo: PropTypes.shape({
    productName: PropTypes.string,
    productPrice: PropTypes.number,
    productImg: PropTypes.string,
  }).isRequired,
};
