import React, { Component } from 'react';

class BuyerInfo extends Component {
  constructor(props) {
    super();
    this.state = {

    };
  }

  render() {
    const Form = (
      <div>
        <form action="">
          <div>
            <label htmlFor="fullname">Full Name:</label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              data-testid="checkout-fullname"
              placeholder="Put your fullname"
            />
          </div>
          <div>
            <label htmlFor="email">E-mail: </label>
            <input
              type="email"
              name="email"
              id="email"
              data-testid="checkout-email"
              placeholder="Put your email"
            />
          </div>
          <div>
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              name="cpf"
              id="cpf"
              data-testid="checkout-cpf"
              placeholder="Put your cpf"
            />
          </div>
          <div>
            <label htmlFor="cep">CEP:</label>
            <input
              type="text"
              name="cep"
              id="cep"
              data-testid="checkout-cep"
              placeholder="Put your cep"
            />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              id="address"
              data-testid="checkout-address"
              placeholder="Put your cep"
            />
          </div>
        </form>
        <button
          type="button">
          Finalizar compra
        </button>
      </div>
    );

    return (
      <div>
        { Form }
      </div>
    );
  }
}

export default BuyerInfo;
