import React from 'react';
import * as api from '../services/api';
import BtnHome from './BtnHome';
import Card from './Card';
import InputHome from './InputHome';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      productsList: [],
    };
  }

  handleInput= ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = async (categoryId, query) => {
    const products = await api.getProductsFromCategoryAndQuery(categoryId, query);
    this.setState(({ productsList: products }));
  }

  // MLB1055 - Motorola
  // https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID&q=$QUERY

  render() {
    const { state: { productsList, name },
      handleInput,
      handleClick,
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
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
        { productsList.length === 0 ? (<h1>Nenhum produto foi encontrado</h1>) : (
          productsList.map(({ title, thumbnail, price }) => (
            <div key={ title } data-testid="product">
              <Card
                name={ title }
                image={ thumbnail }
                price={ price }
              />
            </div>
          ))
        )}
      </div>
    );
  }
}

export default Home;
