import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';
import CartLink from '../components/CartLink';
import Assessment from '../components/Assessment';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      productName: '',
      productPrice: '',
      productImg: '',
      productId: '',
      productShipping: false,
      productAttributes: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.getProductsFunction(id);
  }

  getProductsFunction = async (id) => {
    const response = await api.getProductById(id);
    const {
      title, price, thumbnail, attributes, shipping: { free_shipping: freeShipping },
    } = response;
    this.setState({
      productName: title,
      productPrice: price,
      productImg: thumbnail,
      productAttributes: attributes,
      productId: id,
      productShipping: freeShipping,
    });
  }

  // Iniciar novo raciocício de pegar as infos de estoque e produtos no carrinho para desabilitar o botão Add to cart
  findProdCounter = () => {
    const { productsOnCart } = this.props;
    const { productId } = this.state;
    const prod = productsOnCart.find((product) => product.productId === productId);
    if (prod) return prod.productCounter;
  };

  findProdStock = () => {
    const { productsOnCart } = this.props;
    const { productId } = this.state;
    const prodStock = productsOnCart.find((product) => product.productId === productId);
    if (prodStock) return prodStock.productStock;
  }

  render() {
    const {
      state: { productName,
        productPrice,
        productImg,
        productAttributes,
        productShipping,
      },
      props: { getProduct, productsOnCart, allComments, commentsProduct, verifyStock },
    } = this;
    const { match: { params: { id } } } = this.props;

    return (
      <div>
        <h2 data-testid="product-detail-name">
          { productName }
          -
          { `R$${productPrice}` }
        </h2>
        {
          productShipping && <p data-testid="free-shipping">Frete Grátis</p>
        }
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
          disabled={ verifyStock(this.findProdStock()) }
          data-testid="product-detail-add-to-cart"
          onClick={ () => getProduct(this.state) }
        >
          Add to cart
        </button>
        <CartLink
          productsOnCart={ productsOnCart }
        />
        <Assessment
          allComments={ allComments }
          commentsProduct={ commentsProduct }
          id={ id }
        />
      </div>
    );
  }
}

export default ProductDetails;

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  productsOnCart: PropTypes.arrayOf(PropTypes.object).isRequired,
  getProduct: PropTypes.func.isRequired,
  allComments: PropTypes.arrayOf(PropTypes.object).isRequired,
  commentsProduct: PropTypes.func.isRequired,
  verifyStock: PropTypes.func.isRequired,
};
