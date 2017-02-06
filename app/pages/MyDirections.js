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
    tokenContent: ``,
    currentRecentTab: 0,
    myExercises: [],
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
    fetch(`${DatabaseUrl}/api/exercises`)
      .then(r => {
        return r.json();
      })
      .then(({exercises}) => {
        this.setState({myExercises: exercises});
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

  toggleRecentTab(index) {
    let {currentRecentTab} = this.state;

    currentRecentTab = index;

    this.setState({currentRecentTab});
  }

  generateRecentContent() {
    const {currentRecentTab, myTrainings, myExercises, connectedDirections} = this.state;

    if (currentRecentTab === 0) {
      // Oefeningen
      if (isEmpty(myExercises)) {
        return <Text style={[TextStyles.copy, MyDirectionsStyle.recentEmptyText]}>Je hebt nog geen oefeningen gemaakt.</Text>;
      }

      return myExercises.map((e, index) => {
        if (index > 2) return;
        return (
          <Animatable.View animation='fadeInUp' duration={600} delay={8 * index} key={index} style={MyDirectionsStyle.ExerciseCard}>
            <View style={MyDirectionsStyle.ExerciseCardHeader}>
              <Image style={MyDirectionsStyle.ExerciseCardSportIcon} source={require(`../assets/png/soccerIcon.png`)} />
              <Text style={[TextStyles.subTitle, MyDirectionsStyle.ExerciseCardTitle]}>{`Aanvallen op de flank`.toUpperCase()}</Text>
            </View>

            <View style={MyDirectionsStyle.ExerciseCardImageWrapper}>
              <View style={MyDirectionsStyle.ExerciseCardImage}></View>

              <View style={MyDirectionsStyle.ExerciseCardSpecsWrapper}>
                <View style={MyDirectionsStyle.ExerciseCardSpec}>
                  <Image style={MyDirectionsStyle.ExerciseCardSpecIcon} source={require(`../assets/png/directionIcon.png`)} />
                  <Text style={TextStyles.copy}>5</Text>
                </View>

                <View style={[MyDirectionsStyle.ExerciseCardSpec, MyDirectionsStyle.ExerciseCardSpecIconMiddle]}>
                  <Image style={MyDirectionsStyle.ExerciseCardSpecIcon} source={require(`../assets/png/groupSizeIcon.png`)} />
                  <Text style={TextStyles.copy}>5- 10</Text>
                </View>

                <View style={[MyDirectionsStyle.ExerciseCardSpec, MyDirectionsStyle.ExerciseCardSpecIconLast]}>
                  <Image style={MyDirectionsStyle.ExerciseCardSpecIcon} source={require(`../assets/png/intensivityIcon.png`)} />
                  <Text style={TextStyles.copy}>Makkelijk</Text>
                </View>
              </View>
            </View>

          </Animatable.View>
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

  render() {

    const {connectedDirections, currentRecentTab} = this.state;

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
              {this.generateRecentContent()}
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
