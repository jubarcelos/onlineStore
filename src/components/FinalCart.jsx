import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BuyerInfo from './BuyerInfo';
import PurchaseResume from './PurchaseResume';

class FinalCart extends Component {
  render() {
    const { productsOnCart } = this.props;
    // console.log(this);
    return (
      <div>
        {/* resumo da compra */}
        <PurchaseResume
          productsOnCart={ productsOnCart }
        />
        <BuyerInfo />
        {/* dados de pagamento */}
      </div>
    );
  }
}

export default FinalCart;

FinalCart.propTypes = {
  productsOnCart: PropTypes.arrayOf(PropTypes.object).isRequired,
};
