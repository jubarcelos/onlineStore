import React from 'react';
import PropTypes from 'prop-types';
import CartLink from './CartLink';
import * as api from '../services/api';

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      productName: '',
      productPrice: '',
      productImg: '',
      productAttributes: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    console.log(id);
    this.getProductsFunction(id);
  }

  async getProductsFunction(id) {
    const response = await api.getProductById(id);
    console.log(response);
    const { title, price, thumbnail, attributes } = response;
    this.setState({
      productName: title,
      productPrice: price,
      productImg: thumbnail,
      productAttributes: attributes,
    });
  }

  render() {
    const { productName, productPrice, productImg, productAttributes } = this.state;
    return (
      <div>
        <CartLink />
        <h2 data-testid="product-detail-name">
          {productName}
          -
          {productPrice}
        </h2>
        <img src={ `${productImg}` } alt="productImage" />
        <div>
          <p>Especificações Técnicas</p>
          <ul>
            {productAttributes.map((attribute) => (
              <li key={ attribute.id }>
                {attribute.name}
                :
                {attribute.value_name}
              </li>
            ))}

          </ul>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Product;
