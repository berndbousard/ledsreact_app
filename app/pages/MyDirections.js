import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

import {isEmpty} from 'lodash';
import {GeneralStyle, TextStyles, MyDirectionsStyle, ButtonStyles, Colors} from '../styles';
import {Navigation, Exercise} from '../components';
import {DatabaseUrl, ASyncStorage, Creator} from '../globals';

class MyDirections extends Component {

  state = {
    connectedDirections: [],
    token: ``,
    tokenContent: ``,
    currentRecentTab: 0,
    exercises: [],
    myTrainings: []
  };

  componentDidMount() {

    this.props.socket.on(`init`, directions => this.handleWSDirections(directions));
    this.props.socket.on(`updateDirections`, socketId => this.handleWSupdateDirections(socketId));
    this.props.socket.on(`directionJoined`, direction => this.handleWSdirectionJoined(direction));
    this.props.socket.on(`checkDirections`, directions => this.handleWScheckDirections(directions));

    this.props.socket.emit(`checkDirections`);

    this.fetchExercises();
  }

  fetchExercises() {
    fetch(`${DatabaseUrl}/api/exercises?creator=${Creator}`)
      .then(r => {
        return r.json();
      })
      .then(({exercises}) => {
        this.setState({exercises});
      })
      .catch(e => {
        console.log(e);
      });
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

  handleWSDirections(connectedDirections) {
    connectedDirections = connectedDirections.map(c => {
      c.image = `direction`;
      return c;
    });
    this.setState({connectedDirections});
  }

  handleWSupdateDirections(socketId) {
    const {connectedDirections} = this.state;

    const newDirections = connectedDirections.filter(d => {
      return d.socketId !== socketId;
    });

    this.setState({connectedDirections: newDirections});
  }

  handleWSdirectionJoined(direction) {

    const {connectedDirections} = this.state;

    direction.image = `direction`;

    connectedDirections.push(direction);

    this.setState({connectedDirections});
  }

  handleWScheckDirections(connectedDirections) {
    connectedDirections = connectedDirections.map(c => {
      c.image = `direction`;
      return c;
    });
    this.setState({connectedDirections});
  }

  detectDirection(socketId) {

    let {connectedDirections} = this.state;

    const directionLightTrigger = {
      directionSocketId: socketId,
      time: true
    };

    this.props.socket.emit(`lightUpDirection`, directionLightTrigger);

    connectedDirections = connectedDirections.map(c => {
      if (c.socketId === socketId) {
        c.image = `directionLighted`;
        setTimeout(() => {
          c.image = `direction`;
          this.setState({connectedDirections});
        }, 1000);
      }
      return c;
    });

    this.setState({connectedDirections});
  }

  generateDirections() {
    const {connectedDirections} = this.state;

    if (!isEmpty(connectedDirections)) {
      return (
        connectedDirections.map((c, index) => {

          let url = require(`../assets/png/batteryIconFull.png`);
          if (c.batteryLevel < 20) {
            url = require(`../assets/png/batteryIconEmpty.png`);
          }

          return (
            <Animatable.View animation='fadeInUp' duration={600} delay={8 * index} style={[MyDirectionsStyle.directionListItemWrapper]} key={index}>

              <TouchableOpacity onPress={() => this.detectDirection(c.socketId)}>
                <Image style={[MyDirectionsStyle.directionListItemImage]} source={{uri: `${c.image}`}}/>
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
    } else {
      // return <Text style={[TextStyles.copy, MyDirectionsStyle.noConnectedContent]}>Er zijn geen Directions verbonden</Text>;
      return (
        <Animatable.View animation='fadeInUp' duration={500} easing='ease-out-quad' style={MyDirectionsStyle.notfoundContainer}>
          <Image style={MyDirectionsStyle.notfoundImage} source={require(`../assets/png/directionNotFound.png`)} />
          <View style={MyDirectionsStyle.notFoundContentWrapper}>

            <Text style={TextStyles.subTitle}>{`Problemen met verbinden?`.toUpperCase()}</Text>

            <View style={MyDirectionsStyle.stepWrapper}>
              <View style={MyDirectionsStyle.notFoundNumberWrapper}>
                <Text style={[TextStyles.subTitle, MyDirectionsStyle.notFoundNumber]}>1</Text>
              </View>
              <Text style={TextStyles.copy}>Schakel de Direction in die je wilt verbinden.</Text>
            </View>

            <View style={MyDirectionsStyle.stepWrapper}>
              <View style={MyDirectionsStyle.notFoundNumberWrapper}>
                <Text style={[TextStyles.subTitle, MyDirectionsStyle.notFoundNumber]}>2</Text>
              </View>
              <View style={MyDirectionsStyle.stepTwoWrapper}>
                <Text style={TextStyles.copy}>Controleer of de Bluetooth</Text>
                <Image style={MyDirectionsStyle.bluetoothIcon} source={require(`../assets/png/bluetoothIconBlack.png`)}/>

                <Text style={TextStyles.copy}>van dit toestel aan staat</Text>
              </View>
            </View>

          </View>
        </Animatable.View>
      );
    }
  }

  toggleRecentTab(index) {
    let {currentRecentTab} = this.state;

    currentRecentTab = index;

    this.setState({currentRecentTab});
  }

  generateRecentContent() {
    const {currentRecentTab, myTrainings, exercises} = this.state;

    if (currentRecentTab === 0) {
      // Oefeningen
      if (isEmpty(exercises)) {
        return <Text style={[TextStyles.copy, MyDirectionsStyle.recentEmptyText]}>Je hebt nog geen oefeningen gemaakt.</Text>;
      }

      return exercises.map((e, index) => {
        if (index > 2) return; //Op home max 3
        return (
          <TouchableOpacity onPress={() => Actions.exerciseDetail({exerciseId: `${e._id}`})} style={MyDirectionsStyle.ExerciseCard} key={index}>
            <Exercise index={index} {...e} />
          </TouchableOpacity>
        );
      });
    }

    if (currentRecentTab === 1) {
      // Trainings
      if (isEmpty(myTrainings)) {
        return <Text style={[TextStyles.copy, MyDirectionsStyle.recentEmptyText]}>Je hebt geen trainingen gepland voor vandaag</Text>;
      }
    }
  }

  renderConnectedText() {

    const {connectedDirections} = this.state;

    if (connectedDirections.length > 0) {
      return (
        <View>
          <Animatable.Text animation='fadeInUp' duration={500} easing='ease-out-quad' style={[TextStyles.title, MyDirectionsStyle.directionsHeaderTitle]}>{`verbonden directions: ${connectedDirections.length}`.toUpperCase()}</Animatable.Text>
          <Animatable.Text animation='fadeInUp' duration={550} easing='ease-out-quad' style={[TextStyles.copy, MyDirectionsStyle.directionsHeaderCopy, {opacity: connectedDirections.length > 0 ? 1 : 0}]}>Druk op een Direction om deze te doen oplichten</Animatable.Text>
        </View>
      );
    } else {
      return (
        <View>
          <Animatable.Text animation='fadeInUp' duration={500} easing='ease-out-quad' style={[TextStyles.title, MyDirectionsStyle.directionsHeaderTitle]}>{`Geen directions verbonden`.toUpperCase()}</Animatable.Text>
        </View>
      );
    }
  }

  render() {

    const {connectedDirections, currentRecentTab} = this.state;

    return (
      <View style={GeneralStyle.pageContainer}>

        <Navigation currentPage={this.props.sceneKey} />

        <Animatable.View style={[GeneralStyle.contentContainer]} ref='contentContainer'>
          <View>
            <View style={[MyDirectionsStyle.directionsHeaderWrapper]}>

              {this.renderConnectedText()}

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

            <ScrollView style={[MyDirectionsStyle.directionsListScroller]} horizontal={true} removeClippedSubviews={true} >
              <View style={[MyDirectionsStyle.directionsListWrapper]}>
                {this.generateDirections()}
              </View>
            </ScrollView>
          </View>

          <View>
            <View style={MyDirectionsStyle.recentTabbar}>
              <TouchableOpacity style={[MyDirectionsStyle.recentTabbarTitleWrapper, {borderBottomColor: currentRecentTab === 0 ? Colors.orange : Colors.lightGrey}]} onPress={() => this.toggleRecentTab(0)}>
                <Text style={[TextStyles.title, MyDirectionsStyle.recentTabbarTitle, {color: currentRecentTab === 0 ? Colors.orange : Colors.grey}]}>{`jouw laatste oefeningen`.toUpperCase()}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[MyDirectionsStyle.recentTabbarTitleWrapper, {borderBottomColor: currentRecentTab === 1 ? Colors.orange : Colors.lightGrey}]} onPress={() => this.toggleRecentTab(1)}>
                <Text style={[TextStyles.title, MyDirectionsStyle.recentTabbarTitle, {color: currentRecentTab === 1 ? Colors.orange : Colors.grey}]}>{`jouw laatste training`.toUpperCase()}</Text>
              </TouchableOpacity>
            </View>

            <View style={[MyDirectionsStyle.recentWrapper]}>
              {this.generateRecentContent()}
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
