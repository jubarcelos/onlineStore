import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';
import InputHome from '../components/InputHome';
import Card from '../components/Card';
import Aside from '../components/Aside';
import CartLink from '../components/CartLink';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      productsList: [],
      resultSearch: false,
    };
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = async (query) => {
    const products = await api.getByQuery(query);
    this.setState({
      productsList: products,
      resultSearch: true,
    });
  }

  showCards = (productsList) => {
    const { props: { getProduct, verifyStock } } = this;

    return (
      productsList
        .map(({ title, thumbnail, price, id, available_quantity: quantity }) => (
          <div key={ id } data-testid="product">
            <Card
              id={ id }
              name={ title }
              image={ thumbnail }
              price={ price }
              stock={ quantity }
              getProduct={ getProduct }
              verifyStock={ verifyStock }
            />
          </div>
        ))
    );
  }

  render() {
    const {
      props: { productsOnCart, countProducts },
      state: { searchInput, productsList, resultSearch },
      handleClick,
      handleInput,
      showCards,
    } = this;

    return (
      <div>
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
        <InputHome
          searchInput={ searchInput }
          handleInput={ handleInput }
          handleClick={ handleClick }
        />
        <CartLink
          productsOnCart={ productsOnCart }
          countProducts={ countProducts }
        />
        <Aside showCards={ showCards } />
        { productsList.length === 0 ? (
          resultSearch && <h1>Nenhum produto foi encontrado</h1>
        ) : (
          showCards(productsList)
        )}
      </div>
    );
  }
}

Home.propTypes = {
  getProduct: PropTypes.func.isRequired,
  productsOnCart: PropTypes.arrayOf(PropTypes.object).isRequired,
  countProducts: PropTypes.number.isRequired,
  verifyStock: PropTypes.func.isRequired,
};

export default Home;
