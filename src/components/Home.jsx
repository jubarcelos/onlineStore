import React from 'react';
import * as api from '../services/api';
import BtnHome from './BtnHome';
import Card from './Card';
import InputHome from './InputHome';
import CartLink from './CartLink';
import Aside from './Aside';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      productsList: [],
      name: '',
      productOnCart: [],
      search: false,
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
    this.setState(({
      productsList: products,
      search: true,
    }));
  }

  showCards = (list) => (
    list.map(({ title, thumbnail, price, id }) => (
      <div key={ title } data-testid="product">
        <Card
          id={ id }
          name={ title }
          image={ thumbnail }
          price={ price }
        />
      </div>
    ))
  );

  render() {
    const { state: { productsList, name, productOnCart, search },
      handleInput,
      handleClick,
      showCards,
    } = this;

    return (
      <div>
        <InputHome
          name={ name }
          handleInput={ handleInput }
        />
        <BtnHome
          name={ name }
          handleClick={ handleClick }
        />
        <CartLink
          productOnCart={ productOnCart }
        />
        <Aside />
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
        { productsList.length === 0 ? (
          search && <h1>Nenhum produto foi encontrado</h1>
        ) : (
          showCards(productsList)
        )}
      </div>
    );
  }
}

export default Home;
