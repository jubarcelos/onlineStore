import React, { Component } from 'react';
// import { getCategories } from '../services/api';
import * as api from '../services/api';
import Card from './Card';

class Aside extends Component {
  constructor() {
    super();

    this.state = {
      categoriesLink: [],
      catalogueCategory: [],
    };
  }

  componentDidMount() {
    this.getCategory();
  }

  getCategory = () => {
    api.getCategories()
      .then((requestJson) => {
        this.setState({
          categoriesLink: requestJson.map((obj) => obj),
        });
      });
  }

  getCategoryFiltered = async ({ target: { name } }) => {
    const catalogue = await api.getByCategoryId(name);
    this.setState({ catalogueCategory: catalogue });
  }

  showCataloguesCard = () => {
    const { catalogueCategory } = this.state;
    return catalogueCategory.map((category) => (
      <div key={ category.title } data-testid="product">
        <Card
          name={ category.title }
          image={ category.thumbnail }
          price={ category.price }
        />
      </div>
    ));
  }

  render() {
    const { categoriesLink } = this.state;
    // console.log(catalogueCategory);
    return (
      <div>
        {
          categoriesLink.map((category) => (
            <button
              key={ category.name }
              data-testid="category"
              name={ category.id }
              type="button"
              id={ category.name }
              onClick={ this.getCategoryFiltered }
            >
              { category.name }
            </button>
          ))
        }
        { this.showCataloguesCard() }
      </div>
    );
  }
}

export default Aside;
