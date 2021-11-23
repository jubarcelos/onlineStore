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

  getProduct = () => {
    console.log('yo');
  }

  render() {
    const {
      state: { productsOnCart },
      getProduct,
    } = this;

    return (
      <Switch>
        <Route exact path="/" render={ () => <Home getProduct={ getProduct } /> } />
        <Route path="/cart" render={ () => <Cart productsOnCart={ productsOnCart } /> } />
        <Route
          path="/product/:id"
          render={ (props) => <ProductDetails { ...props } getProduct={ getProduct } /> }
        />
      </Switch>
    );
  }
}

export default Routes;
