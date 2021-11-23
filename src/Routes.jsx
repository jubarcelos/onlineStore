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

  getProduct = (productSelected) => {
    const { productImg, productPrice, productName } = productSelected;
    this.setState(({ productsOnCart }) => (
      { productsOnCart: [...productsOnCart, { productImg, productPrice, productName }],
      }));
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
