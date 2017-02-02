import React, {PureComponent} from 'react';
import {Router, Scene} from 'react-native-router-flux';
// URL: https://medium.com/@ekryski/how-to-actually-use-socket-io-in-react-native-39082d8d6172#.p49pn24a7
import './globals/UserAgent'; //Moet enkel pre 1.5.1
import io from 'socket.io-client';

import {Onboarding, Login, MyDirections} from './pages';

class Main extends PureComponent {

  constructor() {
    super();

    // IP adres fixed erin steken om op iPad te laten werken
    //this.socket = io(`ws://192.168.0.234:3000`, {jsonp: false, transports: [`websocket`], query: `client=app`}); //http://stackoverflow.com/questions/13745519/send-custom-data-along-with-handshakedata-in-socket-io/13940399#13940399
    this.socket = io(`ws://localhost:3000`, {jsonp: false, transports: [`websocket`], query: `client=app`}); //http://stackoverflow.com/questions/13745519/send-custom-data-along-with-handshakedata-in-socket-io/13940399#13940399
  }

  render() {
    return (
      <Router>
        <Scene key='onboarding' component={Onboarding} title='Onboarding' />
        <Scene key='login' component={Login} title='Login' backTitle='onboarding' />

        <Scene key='myDirections' component={MyDirections} title='MyDirections' socket={this.socket} initial />
      </Router>
    );
  }
}

export default Main;
