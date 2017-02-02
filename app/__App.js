import React, {PureComponent} from 'react';
import {Router, Scene} from 'react-native-router-flux';
// URL: https://medium.com/@ekryski/how-to-actually-use-socket-io-in-react-native-39082d8d6172#.p49pn24a7
import './globals/UserAgent'; //Moet enkel pre 1.5.1
import io from 'socket.io-client';
import {isEmpty} from 'lodash';

import {MyDirections} from './pages';

class Main extends PureComponent {

  constructor() {
    super();

    this.state = {
      connectedDirections: []
    };

    // IP adres fixed erin steken om op iPad te laten werken
    //this.socket = io(`ws://192.168.0.234:3000`, {jsonp: false, transports: [`websocket`], query: `client=app`}); //http://stackoverflow.com/questions/13745519/send-custom-data-along-with-handshakedata-in-socket-io/13940399#13940399
    this.socket = io(`ws://localhost:3000`, {jsonp: false, transports: [`websocket`], query: `client=app`}); //http://stackoverflow.com/questions/13745519/send-custom-data-along-with-handshakedata-in-socket-io/13940399#13940399
    // this.socket.on(`init`, directions => this.handleWSDirections(directions));
    // this.socket.on(`updateDirections`, socketId => this.handleWSupdateDirections(socketId));
    // this.socket.on(`directionJoined`, direction => this.handleWSdirectionJoined(direction));
  }

  componentDidReceiveProps() {

  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  handleWSDirections(connectedDirections) {
    this.setState({connectedDirections});
  }

  handleWSupdateDirections(socketId) {
    console.log(`update`);
    const {connectedDirections} = this.state;

    const newDirections = connectedDirections.filter(d => {
      return d.socketId !== socketId;
    });

    this.setState({connectedDirections: newDirections});
  }

  handleWSdirectionJoined(direction) {

    const {connectedDirections} = this.state;

    const existing = connectedDirections.find(d => {
      return d.socketId === direction.socketId;
    });

    if (!isEmpty(existing)) {
      return;
    }

    connectedDirections.push(direction);

    this.setState({connectedDirections});
  }

  addDirection() {
    console.log(`add`);
    const {connectedDirections} = this.state;

    const newDirection = {
      name: `direction 2`,
      function: `bla ${Math.random()}`
    };

    connectedDirections.push(newDirection);

    this.setState({connectedDirections});
    // this.forceUpdate();
  }

  render() {
    const {connectedDirections} = this.state;

    return (
      <Router>
        <Scene key='myDirections' component={MyDirections} title='Mijn Directions' addDirection={() => {this.addDirection();}} directions={connectedDirections} socket={this.socket} initial />
      </Router>
    );
  }
}

export default Main;
