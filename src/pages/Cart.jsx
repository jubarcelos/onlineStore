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
      newProductOnCart: prevState.newProductOnCart.filter((prod) => prod !== product),
    }), () => {
      const { state: { newProductOnCart } } = this;
      deleteProductOnCart(newProductOnCart);
    });
  }

  increaseQuantity = (newProductOnCart) => {
    const cartItem = newProductOnCart.find((item) => item.id === id);
    cartItem.counter += 1;
    this.setState({ newProductOnCart });
  }

  decreaseQuantity = (newProductOnCart) => {
    const cartItem = newProductOnCart.find((item) => item.id === id);
    cartItem.counter -= 1;
    if (cartItem.counter === 0) {
      deleteProduct(newProductOnCart);
    }
    this.setState({ newProductOnCart });
  }

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

  updateState = () => {
    const { props: { productsOnCart } } = this;
    this.setState({
      newProductOnCart: productsOnCart,
    });
  }

  productInfoCard = (newProductOnCart) => (
    this.groupProducts(newProductOnCart).map((product) => (
      <div key={ product.productName } data-testid="shopping-cart-product-name">
        <p>
          { product.productName }
        </p>

        <button onClick={ () => this.deleteProduct(product) } type="button">x</button>

        <img src={ product.productImg } alt={ product.productName } />
        <p>
          { product.productPrice }
        </p>
        <p data-testid="shopping-cart-product-quantity">
          { product.counter }
        </p>
        <div>
          <button
            onClick={ this.increaseQuantity }
            data-testid="product-increase-quantity"
            type="button"
          >
            +
          </button>
          <button
            onClick={ this.decreaseQuantity }
            data-testid="product-decrease-quantity"
            type="button"
          >
            -
          </button>
        </div>
      </div>
    ))
  );

  render() {
    const {
      // props: { productsOnCart },
      state: { newProductOnCart },
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
      newProductOnCart.length ? productInfoCard(newProductOnCart) : notHaveProduct
    );
  }
}

Cart.propTypes = {
  productsOnCart: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteProductOnCart: PropTypes.func.isRequired,
};

export default Cart;
