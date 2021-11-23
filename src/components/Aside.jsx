import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';

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
          categoriesLink: requestJson,
        });
      });
  }

  getCategoryFiltered = async ({ target: { id } }) => {
    const catalogue = await api.getByCategoryId(id);
    this.setState({ catalogueCategory: catalogue });
  }

  getButtons = (categoriesLink, getCategoryFiltered) => (
    categoriesLink.map(({ name, id }) => (
      <button
        key={ id }
        data-testid="category"
        name={ name }
        type="button"
        id={ id }
        onClick={ getCategoryFiltered }
      >
        { name }
      </button>
    )));

  render() {
    const {
      props: { showCards },
      state: { categoriesLink, catalogueCategory },
      getCategoryFiltered,
      getButtons,
    } = this;

    return (
      <div>
        { getButtons(categoriesLink, getCategoryFiltered) }
        {
          catalogueCategory.length !== 0 && (
            <section>{ showCards(catalogueCategory) }</section>)
        }
      </div>
    );
  }
}

Aside.propTypes = {
  showCards: PropTypes.func.isRequired,
};

export default Aside;
