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

  render() {
    const { categoriesLink } = this.state;
    return (
      <div>
        {
          categoriesLink.map((category) => (
            <label htmlFor={ category } key={ category } data-testid="category">
              { category }
              <input
                type="radio"
                id={ category }
              />
            </label>
          ))
        }
      </div>
    );
  }
}

export default Aside;
