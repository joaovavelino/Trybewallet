import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { costs } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {
              costs.map((cost) => {
                const { value, description, currency, method, tag, exchangeRates } = cost;
                const rateObj = Object
                  .values(exchangeRates)
                  .find((rate) => rate.code === currency);
                return (
                  <>
                    <td>{description}</td>
                    <td>{tag}</td>
                    <td>{method}</td>
                    <td>{value}</td>
                    <td>{rateObj.name.split('/')[0]}</td>
                    <td>{Number(rateObj.ask).toFixed(2)}</td>
                    <td>{(value * Number(rateObj.ask)).toFixed(2)}</td>
                    <td>{rateObj.name.split('/')[1]}</td>
                    <td>Real</td>
                    <td>
                      <button type="button">EDIT</button>
                      <button type="button">X</button>
                    </td>
                  </>
                );
              })
            }
          </tr>
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  costs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  costs: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
