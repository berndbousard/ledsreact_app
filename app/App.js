import React, {PureComponent} from 'react';
import {Router, Scene} from 'react-native-router-flux';
// URL: https://medium.com/@ekryski/how-to-actually-use-socket-io-in-react-native-39082d8d6172#.p49pn24a7
import './globals/UserAgent'; //Moet enkel pre 1.5.1
import io from 'socket.io-client';

import {Onboarding, MyDirections, Discover, MyExercises, MyTrainings, Analytics, Editor, ExerciseDetail, Deployment} from './pages';

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
        <Scene key='onboarding' component={Onboarding} title='Onboarding' hideNavBar initial  />
        {/* <Scene key='login' component={Login} title='Login' backTitle='onboarding' /> */}

        {/* <Scene key='myDirections'> */}
        {/* </Scene> */}
        <Scene key='directionOverview' component={MyDirections} title='overview' socket={this.socket} hideNavBar />
        <Scene key='editor' component={Editor} title='editor' hideNavBar direction='vertical' panHandlers={null}  />

        <Scene key='deployment' component={Deployment} socket={this.socket} title='deployment' hideNavBar direction='vertical' panHandlers={null}  />

        <Scene key='discover' component={Discover} title='discover' socket={this.socket} hideNavBar />

        <Scene key='myExercises' component={MyExercises} title='myExercises' socket={this.socket} hideNavBar />
        <Scene key='exerciseDetail' component={ExerciseDetail} title='ExerciseDetail' socket={this.socket} hideNavBar />

        <Scene key='myTrainings' component={MyTrainings} title='myTrainings' socket={this.socket} hideNavBar />
        <Scene key='analytics' component={Analytics} title='analytics' socket={this.socket} hideNavBar />
      </Router>
    );
  }
}

export default Main;
