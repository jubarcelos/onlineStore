import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends Component {
  compareId = () => {
    const { productsOnCart, id } = this.props;
    if (productsOnCart.length !== 0) {
      const compare = (
        productsOnCart.find((product) => product.productId === `${id}`)
      );
      if (compare) return compare.productCounter;
      return null;
    }
    return null;
  }

  render() {
    const {
      name, image, price, id, stock, getProduct, verifyStock, freeShipping,
    } = this.props;

    return (
      <div>
        <Link
          to={ `/productDetails/${id}` }
          data-testid="product-detail-link"
        >
          <h3>{ name }</h3>
          <img src={ image } alt={ name } />
          <p>{ price }</p>
        </Link>
        {
          freeShipping && <p data-testid="free-shipping">Frete Grátis</p>
        }
        <button
          data-testid="product-add-to-cart"
          disabled={
            verifyStock(this.compareId(), stock)
          }
          type="button"
          onClick={ () => (
            getProduct({
              productImg: image,
              productPrice: price,
              productName: name,
              productId: id,
              productStock: stock,
            })) }
        >
          Buy
        </button>
      </div>
    );
  }
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  getProduct: PropTypes.func.isRequired,
  stock: PropTypes.number.isRequired,
  productsOnCart: PropTypes.arrayOf(PropTypes.object).isRequired,
  verifyStock: PropTypes.func.isRequired,
  freeShipping: PropTypes.bool.isRequired,
};

export default Card;
