import React, { Component } from 'react';

class BuyerInfo extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <form action="">
          <div>
            <label htmlFor="fullname">
              Full Name:
              <input
                type="text"
                name="fullname"
                id="fullname"
                data-testid="checkout-fullname"
                placeholder="Put your fullname"
              />
            </label>
          </div>
          <div>
            <label htmlFor="email">
              E-mail:
              <input
                type="email"
                name="email"
                id="email"
                data-testid="checkout-email"
                placeholder="Put your email"
              />
            </label>
          </div>
          <div>
            <label htmlFor="cpf">
              CPF:
              <input
                type="text"
                name="cpf"
                id="cpf"
                data-testid="checkout-cpf"
                placeholder="Put your cpf"
              />
            </label>
          </div>
          <div>
            <label htmlFor="tel">
              Telefone:
              <input
                type="tel"
                name="tel"
                id="tel"
                data-testid="checkout-phone"
                placeholder="Put your phone"
              />
            </label>
          </div>
          <div>
            <label htmlFor="cep">
              CEP:
              <input
                type="text"
                name="cep"
                id="cep"
                data-testid="checkout-cep"
                placeholder="Put your cep"
              />
            </label>
          </div>
          <div>
            <label htmlFor="address">
              Address:

              <input
                type="text"
                name="address"
                id="address"
                data-testid="checkout-address"
                placeholder="Put your cep"
              />
            </label>
          </div>
        </form>
      </div>

    );
  }
}

export default BuyerInfo;
