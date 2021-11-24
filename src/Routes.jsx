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
      allComments: [],
    };
  }

  commentsProduct = (commentsOnProduct) => {
    this.setState({
      allComments: commentsOnProduct,
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
      state: { productsOnCart, allComments },
      getProduct,
    } = this;

    return (
      <Switch>
        <Route
          exact
          path="/"
          render={ () => (
            <Home getProduct={ getProduct } productsOnCart={ productsOnCart } />) }
        />
        <Route path="/cart" render={ () => <Cart productsOnCart={ productsOnCart } /> } />
        <Route
          path="/productDetails/:id"
          render={ (props) => (
            <ProductDetails
              { ...props }
              productsOnCart={ productsOnCart }
              getProduct={ getProduct }
              allComments={ allComments }
              commentsProduct={ this.commentsProduct }
            />) }
        />
      </Switch>
    );
  }
}

export default Routes;
