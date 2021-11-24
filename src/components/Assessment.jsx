import React, { Component } from 'react';

class Assessment extends Component {
  constructor() {
    super();
    this.state = {
      allComents: [],
    };
  }

  addAssessment = () => {
    // precisa de uma condicional para checar que os campos estão preenchidos.
    this.setState(({ allComents }) => (
      { allComents: [...allComents], comment }
    ));
  }

  render() {
    const comment = (
      <form>
        <label htmlFor="email">
          Email:
          <input name="email" type="email" placeholder="Digite seu email" />
        </label>
        <label htmlFor="textArea">
          Avaliação:
          <textarea
            maxLength="500"
            name="textArea"
            data-testid="product-detail-evaluation"
            placeholder="Conte-nos sua opinião sobre o produto"
          />
        </label>
        <button
          type="submit"
          onClick={ this.addAssessment }
        >
          Assessment
        </button>
      </form>
    );
    return (
      { comment }
    );
  }
}

export default Assessment;
