import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cart from './components/Cart';
import Home from './components/Home';
import Aside from './components/Aside';
import Product from './components/Product';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/cart" component={ Cart } />
            <Route path="/product/:id" component={ Product } />
          </Switch>
          <Aside />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
