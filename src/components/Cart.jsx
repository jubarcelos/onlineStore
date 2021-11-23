import React from 'react';
import PropTypes from 'prop-types';

class Cart extends React.Component {
  groupProducts = (products) => {
    const productsGroupedByName = [];
    for (let index = 0; index < products.length; index += 1) {
      const currentProduct = products[index];
      const existingProduct = productsGroupedByName
        .find((newProduct) => newProduct.productName === currentProduct.productName);
      if (existingProduct) {
        existingProduct.counter += 1;
      } else {
        currentProduct.counter = 1;
        productsGroupedByName.push(currentProduct);
      }
    }
    return productsGroupedByName;
  }

  productInfoCard = () => {
    const { location: { state: { productInfo } } } = this.props;
    return (
      this.groupProducts(productInfo).map((product) => (
        <div key={ product.productName } data-testid="shopping-cart-product-name">
          <p>
            { product.productName }
          </p>
          <img src={ product.productImg } alt={ product.productName } />
          <p>
            { product.productPrice }
          </p>
          <p data-testid="shopping-cart-product-quantity">
            { product.counter }
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
