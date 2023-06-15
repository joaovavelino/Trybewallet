import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addCost, fetchCurrencies, updatePrice } from '../actions';
import requestCurrencies from '../api/api';

class Forms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      description: '',
      currency: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
  }

  async componentDidMount() {
    const { fetch } = this.props;
    await fetch();
  }

  eventHandler = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  }

  updateTot = () => {
    const { updateTotal } = this.props;
    const { value, currency, exchangeRates } = this.state;
    const rate = Object.values(exchangeRates).find((e) => e.code === currency).ask;
    console.log(rate, value);
    updateTotal({ price: rate * value });
  }

  btnEvent = async () => {
    const request = await requestCurrencies();
    this.setState({ exchangeRates: request }, () => {
      if (Object.values(this.state).every((e) => e !== '')) {
        const { newCost } = this.props;
        newCost(this.state);
        this.updateTot();
        document.querySelectorAll('input[type=text]').forEach((e) => {
          e.value = '';
        });
      }
    });
  }

  render() {
    const { rateTypes } = this.props;

    return (
      <div>

        <label htmlFor="value">
          Valor:
          <input
            type="text"
            name="value"
            id="value"
            data-testid="value-input"
            onChange={ this.eventHandler }
          />
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            id="description"
            data-testid="description-input"
            onChange={ this.eventHandler }
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            id="currency"
            name="currency"
            onChange={ this.eventHandler }
          >
            {
              rateTypes.filter((types) => types !== 'USDT').map((type, i) => (
                <option key={ i } data-testid={ type }>{type}</option>
              ))
            }
          </select>
        </label>

        <label htmlFor="method">
          Método de Pagamento:
          <select
            data-testid="method-input"
            id="method"
            name="method"
            onChange={ this.eventHandler }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Tag:
          <select
            data-testid="tag-input"
            id="tag"
            name="tag"
            onChange={ this.eventHandler }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <button type="button" onClick={ this.btnEvent }>Adicionar despesa</button>
      </div>
    );
  }
}

Forms.propTypes = {
  newCost: PropTypes.func.isRequired,
  updateTotal: PropTypes.func.isRequired,
  fetch: PropTypes.func.isRequired,
  rateTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  newCost: (data) => dispatch(addCost(data)),
  updateTotal: (value) => dispatch(updatePrice(value)),
  fetch: () => dispatch(fetchCurrencies()),
});

const mapStateToProps = (state) => ({
  rateTypes: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
