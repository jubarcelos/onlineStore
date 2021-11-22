import React from 'react';
import PropTypes from 'prop-types';

class Cart extends React.Component {
  productInfoCard = () => {
    const { location: { state: { productInfo } } } = this.props;
    let counter = 0;
    productInfo.forEach((data) => {
      counter = productInfo
        .filter((value) => value.productName === data.productName).length;
    });
    return (
      productInfo.map((product) => (
        <div key={ product.productName } data-testid="shopping-cart-product-name">
          <p>
            { product.productName }
          </p>
          <img src={ product.productImg } alt={ product.productName } />
          <p>
            { product.productPrice }
          </p>
          <p data-testid="shopping-cart-product-quantity">
            { counter }
          </p>
        </div>
      ))
    );
  }

  render() {
    const { location: { state: { productInfo } } } = this.props;
    const notHaveProduct = (
      <p
        data-testid="shopping-cart-empty-message"
      >
        Seu carrinho está vazio
      </p>
    );

    return (
      productInfo.length ? this.productInfoCard() : notHaveProduct
    );
  }
}

export default Cart;

Cart.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      productInfo: PropTypes.arrayOf(PropTypes.shape({
        productName: PropTypes.string,
        productPrice: PropTypes.number,
        productImg: PropTypes.string,
      })),
    }),
  }).isRequired,
};
