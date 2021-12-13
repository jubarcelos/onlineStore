import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PurchaseResume extends Component {
  render() {
    const { productsOnCart, totalPurchase } = this.props;

    return (
      <div>
        {
          productsOnCart.map((product) => (
            <div key={ product.productId } data-testid="shopping-cart-product-name">
              <p>
                { product.productName }
              </p>
              <img src={ product.productImg } alt={ product.productName } />
              <p id="counter" data-testid="shopping-cart-product-quantity">
                { `Quantidade: ${product.productCounter} ` }
              </p>
              <p>
                { `R$ ${(product.productPrice * product.productCounter).toFixed(2)} ` }
              </p>
            </div>
          ))
        }
        { `Total a pagar: ${totalPurchase()}` }
      </div>
    );
  }
}

export default PurchaseResume;

PurchaseResume.propTypes = {
  productsOnCart: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalPurchase: PropTypes.func.isRequired,
};
