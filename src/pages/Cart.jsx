import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cart extends Component {
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

  productInfoCard = (productsOnCart) => (
    this.groupProducts(productsOnCart).map((product) => (
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

  render() {
    const {
      props: { productsOnCart },
      productInfoCard,
    } = this;
    const notHaveProduct = (
      <p
        data-testid="shopping-cart-empty-message"
      >
        Seu carrinho está vazio
      </p>
    );

    return (
      productsOnCart.length ? productInfoCard(productsOnCart) : notHaveProduct
    );
  }
}

Cart.propTypes = {
  productsOnCart: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Cart;
