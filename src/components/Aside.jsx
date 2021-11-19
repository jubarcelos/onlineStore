import React, { Component } from 'react';
// import { getCategories } from '../services/api';
import * as api from '../services/api';

class Aside extends Component {
  constructor() {
    super();

    this.state = {
      categoriesLink: [],
    };
  }

  componentDidMount() {
    this.getCategory();
  }

  getCategory = () => {
    api.getCategories()
      .then((requestJson) => {
        this.setState({
          categoriesLink: requestJson.map(({ name }) => name),
        });
      });
  }

  getCategoryFiltered = () => {

  }

  render() {
    const { categoriesLink } = this.state;
    return (
      <div>
        {
          categoriesLink.map((category) => (
            <button
              key={ category }
              data-testid="category"
              name="button"
              type="button"
              id={ category }
              onClick={ getCategoryFiltered }
            >
              { category }
            </button>
          ))
        }
      </div>
    );
  }
}

export default Aside;
