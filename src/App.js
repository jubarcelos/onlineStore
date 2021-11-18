import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import Aside from './components/Aside';


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/cart" component={ Cart } />
          </Switch>
        </BrowserRouter>
        <Aside />
      </div>
    );
  }
}

export default App;
