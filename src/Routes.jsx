import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Cart from './pages/Cart';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';

class Routes extends Component {
  constructor() {
    super();
    this.state = {
      productsOnCart: [],
    };
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
        return { ...prod, productCounter: prod.productCounter + 1 };
      }
      return prod;
    });

    if (increase) this.setState({ productsOnCart: newCart });
    return { productsOnCart: newCart };
  }

  downDateCart = (productsOnCart, productId, increase = false) => {
    const newCart = productsOnCart.map((prod) => {
      if (prod.productId === productId) {
        return { ...prod, productCounter: prod.productCounter - 1 };
      }
      return prod;
    });

    if (increase) this.setState({ productsOnCart: newCart });
    return { productsOnCart: newCart };
  }

  render() {
    const {
      state: { productsOnCart },
      getProduct,
      deleteProductOnCart,
    } = this;

    return (
      <Switch>
        <Route
          exact
          path="/"
          render={ () => (
            <Home getProduct={ getProduct } productsOnCart={ productsOnCart } />) }
        />
        <Route
          path="/cart"
          render={ () => (
            <Cart
              productsOnCart={ productsOnCart }
              updateCart={ this.updateCart }
              downDateCart={ this.downDateCart }
              deleteProductOnCart={ deleteProductOnCart }
            />) }
        />
        <Route
          path="/productDetails/:id"
          render={ (props) => (
            <ProductDetails
              { ...props }
              productsOnCart={ productsOnCart }
              getProduct={ getProduct }
            />) }
        />
      </Switch>
    );
  }
}

export default Routes;
