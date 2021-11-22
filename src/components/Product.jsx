import React from 'react';
import PropTypes from 'prop-types';
// import CartLink from './CartLink';
import * as api from '../services/api';
import Cart from './Cart';

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      productName: '',
      productPrice: '',
      productImg: '',
      productAttributes: [],
      productInfo: {},
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.getProductsFunction(id);
  }

  getProduct = () => {
    const { productName, productPrice, productImg } = this.state;
    this.setState({
      productInfo: { productName, productPrice, productImg },
    });
  }

  async getProductsFunction(id) {
    const response = await api.getProductById(id);
    const { title, price, thumbnail, attributes } = response;
    this.setState({
      productName: title,
      productPrice: price,
      productImg: thumbnail,
      productAttributes: attributes,
    });
  }

  render() {
    const { productName, productPrice, productImg, productAttributes, productInfo } = this.state;
    console.log(productInfo);
    return (
      <div>
        <h2 data-testid="product-detail-name">
          { productName }
          -
          { productPrice }
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
          onClick={ this.getProduct }
        >
          Adicionar ao carrinho
        </button>
        {/* <Link
          to={ {
            pathName: '/cart',
            state: productInfo,
          } }
        />
        <CartLink /> */}
        <Cart
          productInfo={ productInfo }
        />
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
