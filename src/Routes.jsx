import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Cart from './pages/Cart';
import Home from './pages/Home';
import FinalCart from './components/FinalCart';
import ProductDetails from './pages/ProductDetails';

class Routes extends Component {
  constructor() {
    super();
    this.state = {
      productsOnCart: [],
      allComments: [],
    };
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  componentDidUpdate(prevProps, prevState) {
    const { productsOnCart } = this.state;
    if (prevState.productsOnCart !== productsOnCart) {
      this.setLocalStorage();
    }
  }

  setLocalStorage = () => {
    const { productsOnCart } = this.state;
    localStorage.setItem('cart', JSON.stringify(productsOnCart));
  }

  getLocalStorage = () => {
    const getLocalStorageItens = JSON.parse(localStorage.getItem('cart')) || [];
    this.setState({
      productsOnCart: [...getLocalStorageItens],
    });
  }

  commentsProduct = (commentsOnProduct) => {
    this.setState({
      allComments: commentsOnProduct,
    });
  }

  deleteProductOnCart = (newProductOnCart) => {
    this.setState({
      productsOnCart: newProductOnCart,
    });
  }

  // O Gabis nos ajudou a refatorar o código da getProduct e groupProducts e preferimos criar as func. setCounter e updateCart  para usarmos tbm no incremento.
  // Aprendemos muito sobre uso dos parametros. Muito bom.

  setCounter = ({ productsOnCart }, productSelected) => {
    const {
      productImg,
      productPrice,
      productName,
      productId,
      productStock,
    } = productSelected;

    const filtered = productsOnCart.find((prod) => prod.productId === productId);
    if (!filtered) {
      return {
        productsOnCart:
          [...productsOnCart, {
            productImg,
            productPrice,
            productName,
            productId,
            productStock,
            productCounter: 1,
          }],
      };
    }
    return this.updateCart(productsOnCart, productId);
  }

  getProduct = (productSelected) => {
    this.setState((prevState) => this.setCounter(prevState, productSelected));
  }

  updateCart = (productsOnCart, productId, increase = false) => {
    const newCart = productsOnCart.map((prod) => {
      if (prod.productId === productId) {
        return {
          ...prod,
          productCounter: prod.productCounter + 1,
          productStock: prod.productStock - 1,
        };
      }
      return prod;
    });

    if (increase) {
      this.setState({ productsOnCart: newCart });
    }
    return { productsOnCart: newCart };
  }

  downDateCart = (productsOnCart, productId, increase = false) => {
    const newCart = productsOnCart.map((prod) => {
      if (prod.productId === productId) {
        return {
          ...prod,
          productCounter: prod.productCounter - 1,
          productStock: prod.productStock + 1,
        };
      }
      return prod;
    });

    if (increase) {
      this.setState({ productsOnCart: newCart });
    }
    return { productsOnCart: newCart };
  }

  verifyStock = (param1, param2) => {
    if (param1 >= param2) {
      return true;
    }
    return false;
  }

  totalPurchase = () => {
    const { productsOnCart } = this.state;
    const total = productsOnCart
      .map(({ productCounter, productPrice }) => productCounter * productPrice)
      .reduce((acc, crr) => acc + crr, 0);
    return total.toFixed(2);
  }

  render() {
    const {
      state: { productsOnCart, allComments },
      getProduct,
      deleteProductOnCart,
    } = this;

    return (
      <Switch>
        <Route
          exact
          path="/"
          render={ () => (
            <Home
              getProduct={ getProduct }
              productsOnCart={ productsOnCart }
              verifyStock={ this.verifyStock }
            />) }
        />
        <Route
          path="/cart"
          render={ () => (
            <Cart
              productsOnCart={ productsOnCart }
              updateCart={ this.updateCart }
              downDateCart={ this.downDateCart }
              deleteProductOnCart={ deleteProductOnCart }
              totalPurchase={ this.totalPurchase }
              verifyStock={ this.verifyStock }
            />) }
        />
        <Route
          path="/productDetails/:id"
          render={ (props) => (
            <ProductDetails
              { ...props }
              productsOnCart={ productsOnCart }
              getProduct={ getProduct }
              allComments={ allComments }
              commentsProduct={ this.commentsProduct }
              verifyStock={ this.verifyStock }
            />) }
        />
        <Route
          path="/finalcart"
          render={ (props) => (
            <FinalCart
              { ...props }
              productsOnCart={ productsOnCart }
              totalPurchase={ this.totalPurchase }
            />
          ) }
        />
      </Switch>
    );
  }
}

export default Routes;
