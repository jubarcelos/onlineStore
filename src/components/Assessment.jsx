import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  componentDidMount() {
    this.updateCommentsOnCart();
  }
  // Ajuda do tales da monitoria para conseguir perceber a necessidade do setState ser no didMount e organizar onde apareciam os comments.

  updateCommentsOnCart = () => {
    const { allComments } = this.props;
    this.setState({ commentsOnProduct: allComments });
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
    this.setState((prevState) => (
      { commentsOnProduct: [...prevState.commentsOnProduct, this.newComment()] }
    ), () => {
      const {
        state: { commentsOnProduct },
        props: { commentsProduct },
      } = this;
      this.setState({
        email: '',
        stars: '5',
        comment: '',
        isSaveButtonDisabled: true,
      });
      commentsProduct(commentsOnProduct);
    });
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
    const { state: { stars, email, comment },
      props: { id } } = this;
    const newComment = {
      email,
      stars,
      comment,
      id,
    };
    return newComment;
  }

  commentsAboutProduct = () => {
    const { allComments, id } = this.props;
    return allComments.filter((comment) => comment.id === id)
      .map(({ email, stars, comment }) => (
        <div key={ email }>
          <p>{ email }</p>
          <p>{ stars }</p>
          <p>{ comment }</p>
        </div>
      ));
  }

  render() {
    const {
      state: { isSaveButtonDisabled, email, stars, comment },
      props: { allComments },
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
          type="button"
          disabled={ isSaveButtonDisabled }
          onClick={ this.addAssessment }
        >
          Assessment
        </button>
      </form>
    );
    return (
      <div>
        <p>Avalie o produto</p>
        { commentForm }
        <p>Avaliações Pregressas</p>
        {
          allComments ? this.commentsAboutProduct() : null
        }
      </div>
    );
  }
}

export default Assessment;

Assessment.propTypes = {
  allComments: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  commentsProduct: PropTypes.func.isRequired,
};
