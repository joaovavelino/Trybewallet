import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, total } = this.props;

    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">
          {total !== undefined
            ? total.reduce((acc, cur) => acc + cur.price, 0).toFixed(2) : '0' }
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

Header.propTypes = ({
  email: PropTypes.string.isRequired,
  total: PropTypes.arrayOf(PropTypes.object).isRequired,
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.prices,
});

export default connect(mapStateToProps)(Header);
