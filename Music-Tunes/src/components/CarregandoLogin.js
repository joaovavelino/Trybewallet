import React, { Component } from 'react';
import { Redirect } from 'react-router';

class CarregandoLogin extends Component {
  constructor() {
    super();
    this.state = {
      storage: false,
    };
    this.verifyLocal = this.verifyLocal.bind(this);
  }

  componentDidMount() {
    const maxTime = 1500;
    setInterval(this.verifyLocal, maxTime);
  }

  verifyLocal() {
    const local = localStorage.getItem('user');
    if (local) {
      this.setState({ storage: true });
    }
  }

  render() {
    const { storage } = this.state;
    return (
      <div>
        { storage ? <Redirect to="/search" /> : <h1>Carregando...</h1>}

      </div>
    );
  }
}

export default CarregandoLogin;
