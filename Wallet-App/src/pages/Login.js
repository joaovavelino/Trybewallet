import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { saveEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      btnDisabled: true,
      changePage: false,
    };
  }

  inputValidation = () => {
    const { email, password } = this.state;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const maxPasswordLength = 6;

    if (regex.test(email) && password.length >= maxPasswordLength) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  }

  eventHandler = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, () => {
      this.inputValidation();
    });
  }

  render() {
    const { email, btnDisabled, changePage } = this.state;
    const { registerEmail } = this.props;

    if (changePage) return <Redirect to="/carteira" />;

    return (
      <div>
        <h1>Walle-App</h1>
        <input
          type="text"
          data-testid="email-input"
          placeholder="Digite seu e-mail"
          name="email"
          onChange={ this.eventHandler }
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Digite sua senha"
          name="password"
          onChange={ this.eventHandler }
        />
        <button
          type="button"
          onClick={ () => {
            registerEmail(email);
            this.setState({ changePage: true });
          } }
          disabled={ btnDisabled }
        >
          Entrar
        </button>
      </div>);
  }
}

Login.propTypes = {
  registerEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  registerEmail: (email) => dispatch(saveEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
