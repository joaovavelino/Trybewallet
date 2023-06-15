import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Wallet from './pages/Wallet';

export default class App extends Component {
  path = () => (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/carteira" component={ Wallet } />
    </Switch>
  );

  render() {
    return (
      <div>
        {this.path()}
      </div>
    );
  }
}
