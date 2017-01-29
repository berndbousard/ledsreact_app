import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, TouchableHighlight} from 'react-native';
import {Actions} from 'react-native-router-flux';

// URL: https://medium.com/@ekryski/how-to-actually-use-socket-io-in-react-native-39082d8d6172#.p49pn24a7
import '../utils/UserAgent'; //Moet enkel pre 1.5.1
import io from 'socket.io-client';
import {isEmpty, range} from 'lodash';

import {Colors} from '../globals';

export default class MyDirections extends Component {

  constructor() {
    super();
    this.state = {
      directions: []
    };
  }

  componentDidMount() {
    // IP adres fixed erin steken
    this.socket = io(`ws://192.168.0.234:3000`, {jsonp: false, transports: [`websocket`], query: `client=app`}); //http://stackoverflow.com/questions/13745519/send-custom-data-along-with-handshakedata-in-socket-io/13940399#13940399
    this.socket.on(`init`, directions => this.handleWSDirections(directions));
    this.socket.on(`updateDirections`, socketId => this.handleWSupdateDirections(socketId));
    this.socket.on(`directionJoined`, direction => this.handleWSdirectionJoined(direction));
  }

  handleWSDirections(directions) {
    this.setState({directions});
  }

  handleWSupdateDirections(socketId) {
    const {directions} = this.state;

    const newDirections = directions.filter(d => {
      return d.socketId !== socketId;
    });

    this.setState({directions: newDirections});
  }

  handleWSdirectionJoined(direction) {

    const {directions} = this.state;

    const existing = directions.find(d => {
      return d.socketId === direction.socketId;
    });

    if (!isEmpty(existing)) {
      return;
    }

    directions.push(direction);

    this.setState({directions});
  }

  generateExercises(amount) {
    return (
      <View style={{flexDirection: `column`, alignItems: `center`, marginTop: 50}}>
        <Text>Oefeningen</Text>
        <View style={{flexDirection: `row`}}>
          {
            range(amount).map((a, index) => {
              return (
                <TouchableHighlight style={styles.button} onPress={() => {Actions.exerciseDetail();}} activeOpacity={.25} underlayColor={Colors.white} key={index}>
                  <Text>Oefening</Text>
                </TouchableHighlight>
              );
            })
          }
        </View>
      </View>
    );
  }

  generateDirections() {
    const {directions} = this.state;

    if (isEmpty(directions)) {
      return <Text>Er zijn geen Directions verbonden</Text>;
    }

    return (
      <View style={{flexDirection: `column`, alignItems: `center`}}>
        <Text>Verbonden Directions</Text>
        {
          <View style={{flexDirection: `row`}}>
            {
              directions.map((d, index) => {
                return (
                  <TouchableHighlight style={styles.button} onPress={() => {console.log(`Direction`);}} activeOpacity={.25} underlayColor={Colors.white} key={index}>
                    <View>
                      {/* <Text>{d.socketId}</Text> */}
                      <Text>{`${d.batteryLevel} %`}</Text>
                    </View>
                  </TouchableHighlight>
                );
              })
            }
          </View>
        }
      </View>
    );
  }

  render() {
    return (
      <View style={[styles.center, {backgroundColor: `pink`}]}>
        {this.generateDirections()}
        {this.generateExercises(3)}
        <Button color={Colors.blue} title='Editor' onPress={() => {Actions.editor();}}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`
  },
  button: {
    width: 45,
    height: 45,
    backgroundColor: `red`,
    marginLeft: 10,
    marginRight: 10
  }
});
