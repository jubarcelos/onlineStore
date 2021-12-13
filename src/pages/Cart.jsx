import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
    const { props: { updateCart, productsOnCart } } = this;
    const isIncrease = true;
    updateCart(productsOnCart, productId, isIncrease);
    this.time();
  }

  decreaseQuantity = (productId) => {
    const { props: { downDateCart, productsOnCart } } = this;
    const isIncrease = true;
    downDateCart(productsOnCart, productId, isIncrease);
    this.time();
    productsOnCart.filter((product) => product.productCounter === 0)
      .map((option) => this.deleteProduct(option));
  }

  time = () => {
    const mil = 1000;
    setTimeout(() => { this.updateState(); }, mil);
  }
  // resolve o delay de atualização para o routes.

  updateState = () => {
    const { props: { productsOnCart } } = this;
    this.setState({
      newProductOnCart: productsOnCart,
    });
  }

  productInfoCard = () => {
    const { productsOnCart } = this.props;
    return productsOnCart.map((product) => (
      <div key={ product.productId } data-testid="shopping-cart-product-name">
        <p>
          { product.productName }
        </p>
        <button onClick={ () => this.deleteProduct(product) } type="button">x</button>
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
              <button type="button">Finalizar Compra</button>
            </Link>
          </div>
        )
        : notHaveProduct
    );
  }
}

Cart.propTypes = {
  productsOnCart: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteProductOnCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  downDateCart: PropTypes.func.isRequired,
  totalPurchase: PropTypes.func.isRequired,
};

export default Cart;
