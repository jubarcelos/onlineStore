import React, { Component } from 'react';

class Assessment extends Component {
  render() {
    return (
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
        <button type="submit">Assessment</button>
      </form>
    );
  }
}

export default Assessment;
