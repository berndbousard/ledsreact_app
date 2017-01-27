import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Router, Scene, ActionConst } from 'react-native-router-flux';

import { Onboarding, Login, MyDirections } from './pages';

export default class Main extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="onboarding" component={Onboarding} title="Onboarding"  />

          <Scene key="login" component={Login} title="Login" backTitle="onboarding" />

          <Scene key="myDirections" component={MyDirections} title='Mijn Directions' type={ActionConst.RESET} initial />
        </Scene>
      </Router>
    );
  }
}
