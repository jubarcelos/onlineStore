import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Cart extends Component {
  increaseQuantity = (productId) => {
    const { props: { updateCart, productsOnCart } } = this;
    const isIncrease = true;
    updateCart(productsOnCart, productId, isIncrease);
  }

  decreaseQuantity = (productId) => {
    const { props: { downDateCart, productsOnCart, deleteProduct } } = this;
    const isIncrease = true;
    downDateCart(productsOnCart, productId, isIncrease);
    productsOnCart.filter((product) => product.productCounter === 0)
      .map((option) => deleteProduct(option));
  }

  productInfoCard = () => {
    const { productsOnCart, verifyStock, deleteProduct } = this.props;
    return productsOnCart.map((product) => (
      <div key={ product.productId } data-testid="shopping-cart-product-name">
        <p>
          { product.productName }
        </p>
        <button onClick={ () => deleteProduct(product) } type="button">x</button>
        <img src={ product.productImg } alt={ product.productName } />
        <p>
          { `R$ ${(product.productPrice * product.productCounter).toFixed(2)} ` }
        </p>
        <p id="counter" data-testid="shopping-cart-product-quantity">
          { product.productCounter }
        </p>
        <div>
          <button
            onClick={ () => this.increaseQuantity(product.productId) }
            data-testid="product-increase-quantity"
            type="button"
            disabled={
              verifyStock(product.productStock)
            }
            id={ product.productId }
          >
            +
          </button>
          <button
            onClick={ () => this.decreaseQuantity(product.productId) }
            data-testid="product-decrease-quantity"
            type="button"
            id={ product.productId }
          >
            -
          </button>
        </div>
      </div>
    ));
  };

  render() {
    const {
      props: { productsOnCart, totalPurchase },
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
      productsOnCart.length
        ? (
          <div>
            { productInfoCard() }
            <div>
              <p>{ `Valor Total Da Compra: R$ ${totalPurchase()}` }</p>
            </div>
            <Link
              to="/finalcart"
            >
              <button
                type="button"
                data-testid="checkout-products"
              >
                Finalizar Compra
              </button>
            </Link>
          </div>
        )
        : notHaveProduct
    );
  }
}

Cart.propTypes = {
  productsOnCart: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteProduct: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  downDateCart: PropTypes.func.isRequired,
  totalPurchase: PropTypes.func.isRequired,
  verifyStock: PropTypes.func.isRequired,
};

export default Cart;
