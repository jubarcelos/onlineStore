import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BuyerInfo from './BuyerInfo';
import PurchaseResume from './PurchaseResume';
import Payment from './Payment';

class FinalCart extends Component {
  render() {
    const { productsOnCart, totalPurchase } = this.props;
    // console.log(this);
    return (
      <div>
        <PurchaseResume
          productsOnCart={ productsOnCart }
          totalPurchase={ totalPurchase }
        />
        <BuyerInfo />
        <Payment />
      </div>
    );
  }
}

export default FinalCart;

FinalCart.propTypes = {
  productsOnCart: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalPurchase: PropTypes.func.isRequired,
};
