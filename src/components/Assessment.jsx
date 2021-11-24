import React, { Component } from 'react';

class Assessment extends Component {
  constructor() {
    super();
    this.state = {
      isSaveButtonDisabled: true,
      stars: '5',
      email: '',
      comment: '',
      commentsOnProduct: [],
    };
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const inputValue = target.value;
    this.setState(({ [name]: inputValue }), () => (
      this.setState({ isSaveButtonDisabled: this.formValidation() })
    ));
  }

  addAssessment = (event) => {
    event.preventDefault();
    const {
      state: { commentsOnProduct },
      props: { allComments },
    } = this;
    // this.setState({ commentsOnProduct: allComments }, () => {
    this.setState((prevState) => (
      { commentsOnProduct: [...prevState.commentsOnProduct, this.newComment()] }
    ));
  };

  formValidation = () => {
    const { email } = this.state;
    const number = 5;
    if (email.length > number && email.includes('@') && email.includes('.com')) {
      return false;
    }
    return true;
  }

  newComment = () => {
    const { stars, email, comment } = this.state;
    const newComment = {
      email,
      stars,
      comment,
    };
    console.log(newComment);
  }

  render() {
    const {
      state: { isSaveButtonDisabled, email, stars, comment },
    } = this;

    const commentForm = (
      <form method="get">
        <div>
          <label htmlFor="email">
            Email:
            <input
              name="email"
              value={ email }
              onChange={ this.onInputChange }
              type="email"
              placeholder="Digite seu email"
            />
          </label>
        </div>

        <label htmlFor="stars">
          Avaliação
          <select
            name="stars"
            id="stars"
            value={ stars }
            onChange={ this.onInputChange }
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

        </label>

        <div>
          <label htmlFor="textArea">
            Descrição:
            <textarea
              maxLength="500"
              name="comment"
              data-testid="product-detail-evaluation"
              placeholder="Conte-nos sua opinião sobre o produto"
              value={ comment }
              onChange={ this.onInputChange }
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={ isSaveButtonDisabled }
          onClick={ this.addAssessment }
        >
          Assessment
        </button>
      </form>
    );
    return (
      <div>
        <p>Avalição dos consumidores</p>
        { commentForm }
        {/* { allComments } */ }
      </div>
    );
  }
}

export default Assessment;
