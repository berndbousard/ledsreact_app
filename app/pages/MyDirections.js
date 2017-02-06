import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

import {isEmpty, range} from 'lodash';
import {GeneralStyle, TextStyles, MyDirectionsStyle, ButtonStyles, Colors} from '../styles';
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
  }

  componentWillUnmount() {
    this.props.socket.off(`init`);
    this.props.socket.off(`updateDirections`);
    this.props.socket.off(`directionJoined`);
    this.props.socket.off(`checkDirections`);
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

  detectDirection(socketId) {
    this.props.socket.emit(`lightUpDirection`, socketId);
  }

  generateConnectedDirections() {

    const {connectedDirections} = this.state;

    if (isEmpty(connectedDirections)) {
      return <Text>Er zijn geen Directions verbonden</Text>;
    }

    return (
      connectedDirections.map((d, index) => {


        return (
          <TouchableOpacity style={ButtonStyles.button} key={index}>
            <Animatable.View animation='bounceIn' easing='ease-out' ref='direction'>
              <Text>{d.socketId}</Text>
              <Text>{`${d.batteryLevel} %`}</Text>
            </Animatable.View>
          </TouchableOpacity>
        );
      })
    );
  }

  generateDirections() {
    const {connectedDirections} = this.state;

    return (
      connectedDirections.map((c, index) => {

        let url = require(`../assets/png/batteryIconFull.png`);
        if (c.batteryLevel < 20) {
          url = require(`../assets/png/batteryIconEmpty.png`);
        }

        console.log(c.socketId);

        return (
          <Animatable.View animation='fadeInUp' duration={600} delay={8 * index} style={[MyDirectionsStyle.directionListItemWrapper]} key={index}>

            <TouchableOpacity onPress={() => this.detectDirection(c.socketId)}>
              <Image style={[MyDirectionsStyle.directionListItemImage]} source={require(`../assets/png/direction.png`)}/>
            </TouchableOpacity>

            <View style={[MyDirectionsStyle.directionListItemInfo]}>
              <View style={[MyDirectionsStyle.directionListItemBatteryWrapper]}>
                <Text style={[TextStyles.batteryPercentage]}>{`${c.batteryLevel}%`}</Text>
                <Image style={[MyDirectionsStyle.directionListItemBattery]} source={url} />
              </View>
              <Image style={[MyDirectionsStyle.directionListItemPower]} source={require(`../assets/png/onOffIconBlack.png`)} />
            </View>

          </Animatable.View>
        );
      })
    );

  }

  render() {

    const {connectedDirections} = this.state;

    return (
      <View style={GeneralStyle.pageContainer}>

        <Navigation currentPage={this.props.sceneKey} />

        <Animatable.View style={[GeneralStyle.contentContainer]} ref='contentContainer'>
          <View>
            <View style={[MyDirectionsStyle.directionsHeaderWrapper]}>
              <View>
                <Text style={[TextStyles.title, MyDirectionsStyle.directionsHeaderTitle]}>{`verbonden directions: ${connectedDirections.length}`.toUpperCase()}</Text>
                <Text style={[TextStyles.copy, MyDirectionsStyle.directionsHeaderCopy]}>Druk op een Direction om deze te doen oplichten</Text>
              </View>

              <View style={[MyDirectionsStyle.directionsHeaderButtonWrapper]}>
                <TouchableOpacity style={[MyDirectionsStyle.directionsHeaderSecundairyButtonWrapper]}>
                  <View style={[ButtonStyles.secundairyButton]}>
                    <Image style={[MyDirectionsStyle.buttonIcon]} source={require(`../assets/png/onOffIconOrange.png`)} />
                    <Text style={[TextStyles.secundairyButton]}>{`directions uitzetten`.toUpperCase()}</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPressOut={() => Actions.editor()}>
                  <LinearGradient style={[ButtonStyles.primaryButton]} colors={[Colors.orange, Colors.gradientOrange]}>
                    <Image style={[MyDirectionsStyle.buttonIcon]} source={require(`../assets/png/plusIconButtonWhite.png`)} />
                    <Text style={[TextStyles.primaryButton]}>{`nieuwe oefening`.toUpperCase()}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView horizontal={true}>
              <View style={[MyDirectionsStyle.directionsListWrapper]}>
                {this.generateDirections()}
              </View>
            </ScrollView>
          </View>

          <View>

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
