import React, {Component} from 'react';
import {View, Button, Text, TouchableOpacity, Dimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Actions} from 'react-native-router-flux';

import {isEmpty} from 'lodash';
import {GeneralStyle, ComponentStyle} from '../styles';
import {Navigation} from '../components';
import {DatabaseUrl, ASyncStorage} from '../globals';

class MyDirections extends Component {

  state = {
    connectedDirections: [],
    token: ``,
    tokenContent: ``
  };

  componentDidMount() {

    this.props.socket.on(`init`, directions => this.handleWSDirections(directions));
    this.props.socket.on(`updateDirections`, socketId => this.handleWSupdateDirections(socketId));
    this.props.socket.on(`directionJoined`, direction => this.handleWSdirectionJoined(direction));
    this.props.socket.on(`checkDirections`, directions => this.handleWScheckDirections(directions));

    this.props.socket.emit(`checkDirections`);

    this.login();

    if (true) {
      return;
    }

    const {contentContainer} = this.refs;
    const {height} = Dimensions.get(`window`);

    contentContainer.transition({transform: [{translateY: height}], opacity: 0}, {transform: [{translateY: 0}], opacity: 1}, 300, `ease-out-quad`);
  }

  componentWillUnmount() {
    this.props.socket.off(`init`);
    this.props.socket.off(`updateDirections`);
    this.props.socket.off(`directionJoined`);
    this.props.socket.off(`checkDirections`);

    const {contentContainer} = this.refs;
    const {height} = Dimensions.get(`window`);

    contentContainer.transition({transform: [{translateY: 0}], opacity: 0}, {transform: [{translateY: - height}], opacity: 0}, 300, `ease-out-quad`);
  }

  login() {
    fetch(`${DatabaseUrl}/api/auth`, {
      method: `POST`,
      headers: {Accept: `application/json`, 'Content-Type': `application/json`},
      body: JSON.stringify({
        login: `bernd.bousard@gmail.com`,
        password: `bernd`,
        audience: `app`
      })
    })
    .then(r => {
      return r.json();
    })
    .then(r => {
      ASyncStorage.setItem(`token`, r.token);
      ASyncStorage.getItem(`token`)
        .then(r => {
          this.setState({token: r});
        });
    })
    .catch(e => {
      console.log(e);
    });
  }

  changePageHandler(page) {
    console.log(page);
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

    console.log(direction);

    const {connectedDirections} = this.state;

    const updatedDirections = connectedDirections.push(direction);

    this.setState({updatedDirections});
  }

  handleWScheckDirections(connectedDirections) {
    this.setState({connectedDirections});
  }

  detectDirection(direction) {
    const {socketId} = direction;
    this.props.socket.emit(`lightUpDirection`, {socketId});
  }

  generateConnectedDirections() {

    const {connectedDirections} = this.state;

    if (isEmpty(connectedDirections)) {
      return <Text>Er zijn geen Directions verbonden</Text>;
    }

    return (
      connectedDirections.map((d, index) => {
        return (
          <TouchableOpacity style={ComponentStyle.button} onPress={() => {this.detectDirection(d);}} key={index}>
            <Animatable.View animation='bounceIn' easing='ease-out' ref='direction'>
              <Text>{d.socketId}</Text>
              <Text>{`${d.batteryLevel} %`}</Text>
            </Animatable.View>
          </TouchableOpacity>
        );
      })
    );
  }

  render() {

    const {connectedDirections} = this.state;

    return (
      <View style={GeneralStyle.pageContainer}>

        <Navigation currentPage={this.props.sceneKey} />

        <Animatable.View style={[GeneralStyle.center, GeneralStyle.contentContainer]} useNativeDriver={true} ref='contentContainer'>
          <Button title='oefening maken' onPress={() => Actions.editor({connectedDirections})} />
          <View style={{flexDirection: `column`, alignItems: `center`}}>
            <Text>Verbonden Directions</Text>
            <View style={{flexDirection: `row`, alignItems: `center`, justifyContent: `center`}}>
              {this.generateConnectedDirections()}
            </View>
          </View>
        </Animatable.View>

      </View>
    );
  }
}

MyDirections.propTypes = {
  socket: React.PropTypes.object,
  sceneKey: React.PropTypes.string
};

export default MyDirections;
