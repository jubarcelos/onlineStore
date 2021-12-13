import React, { Component } from 'react';
import { FaBarcode, FaCcDinersClub, FaCcMastercard, FaCcVisa } from 'react-icons/fa';

class Payment extends Component {
  render() {
    return (
      <div>
        <p>Escolha a forma de pagamento:</p>
        <label htmlFor="boleto">
          <input
            type="radio"
            name="payment"
            value="boleto"
          />
          <FaBarcode />
        </label>
        <label htmlFor="mastercard">
          <input
            type="radio"
            name="payment"
            value="mastercard"
          />
          <FaCcMastercard />
        </label>
        <label htmlFor="payment">
          <input
            type="radio"
            name="payment"
            value="visa"
          />
          <FaCcVisa />
        </label>
        <label htmlFor="payment">
          <input
            type="radio"
            name="payment"
            value="elo"
          />
          <FaCcDinersClub />
        </label>
      </div>
    );
  }
}

export default Payment;
