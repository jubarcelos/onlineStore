import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      newProductOnCart: [],
    };
  }

  componentDidMount() {
    this.updateState();
  }

  deleteProduct = (product) => {
    const { props: { deleteProductOnCart } } = this;
    this.setState((prevState) => ({
      newProductOnCart: prevState.newProductOnCart
        .filter((prod) => prod.productId !== product.productId),
    }), () => {
      const { state: { newProductOnCart } } = this;
      deleteProductOnCart(newProductOnCart);
    });
  }

  increaseQuantity = (productId) => {
    const { updateCart, productsOnCart } = this.props;
    const isIncrease = true;
    updateCart(productsOnCart, productId, isIncrease);
  }

  decreaseQuantity = (productId) => {
    const { downDateCart, productsOnCart } = this.props;
    const isIncrease = true;
    downDateCart(productsOnCart, productId, isIncrease);
  }

  updateState = () => {
    const { props: { productsOnCart } } = this;
    this.setState({
      newProductOnCart: productsOnCart,
    });
  }

  productInfoCard = () => {
    const { productsOnCart } = this.props;
    return productsOnCart.map((product) => (
      <div key={ product.productName } data-testid="shopping-cart-product-name">
        <p>
          { product.productName }
        </p>
        <button onClick={ () => this.deleteProduct(product) } type="button">x</button>
        <img src={ product.productImg } alt={ product.productName } />
        <p>
          { product.productPrice }
        </p>
        <p id="counter" data-testid="shopping-cart-product-quantity">
          { product.productCounter }
        </p>
        <div>
          <button
            onClick={ () => this.increaseQuantity(product.productId) }
            data-testid="product-increase-quantity"
            type="button"
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
      productsOnCart.length ? productInfoCard() : notHaveProduct
    );
  }
}

Cart.propTypes = {
  productsOnCart: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteProductOnCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  downDateCart: PropTypes.func.isRequired,
};

export default Cart;
