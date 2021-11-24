import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';
import CartLink from '../components/CartLink';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      productName: '',
      productPrice: '',
      productImg: '',
      productId: '',
      productAttributes: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.getProductsFunction(id);
  }

  getProductsFunction = async (id) => {
    const response = await api.getProductById(id);
    const { title, price, thumbnail, attributes } = response;
    this.setState({
      productName: title,
      productPrice: price,
      productImg: thumbnail,
      productAttributes: attributes,
      productId: id,
    });
  }

  render() {
    const {
      state: { productName,
        productPrice,
        productImg,
        productAttributes,
      },
      props: { getProduct, productsOnCart },
    } = this;
    // console.log(getProduct);
    return (
      <div>
        <h2 data-testid="product-detail-name">
          { productName }
          -
          { `R$${productPrice}` }
        </h2>
        <img src={ `${productImg}` } alt="productImage" />
        <div>
          <p>Especificações Técnicas</p>
          <ul>
            { productAttributes.map((attribute) => (
              <li key={ attribute.id }>
                { attribute.name }
                :
                { attribute.value_name }
              </li>
            )) }
          </ul>
        </div>
        <button
          type="button"
          name={ productName }
          data-testid="product-detail-add-to-cart"
          onClick={ () => getProduct(this.state) }
        >
          Add to cart
        </button>
        <CartLink
          productsOnCart={ productsOnCart }
        />
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  productsOnCart: PropTypes.arrayOf(PropTypes.object).isRequired,
  getProduct: PropTypes.func.isRequired,
};

export default ProductDetails;
