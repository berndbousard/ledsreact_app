import React, {Component} from 'react';
import {View, Button, Text, TouchableOpacity, Dimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Actions} from 'react-native-router-flux';

import {isEmpty} from 'lodash';
import {GeneralStyle, ComponentStyle} from '../styles';
import {Navigation} from '../components';

class MyDirections extends Component {

  constructor(props) {
    super(props);

    this.props = props;

    this.state = {
      connectedDirections: []
    };

    console.log(props);

    this.props.socket.on(`init`, directions => this.handleWSDirections(directions));
    this.props.socket.on(`updateDirections`, socketId => this.handleWSupdateDirections(socketId));
    this.props.socket.on(`directionJoined`, direction => this.handleWSdirectionJoined(direction));
  }

  componentDidMount() {
    if (false) {
      return;
    }

    const {contentContainer} = this.refs;
    const {height} = Dimensions.get(`window`);

    contentContainer.transition({transform: [{translateY: height}], opacity: 0}, {transform: [{translateY: 0}], opacity: 1}, 300, `ease-out-quad`);
  }

  componentsWillUnmount() {
    const {contentContainer} = this.refs;
    const {height} = Dimensions.get(`window`);

    contentContainer.transition({transform: [{translateY: 0}], opacity: 0}, {transform: [{translateY: - height}], opacity: 0}, 300, `ease-out-quad`);
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

  detectDirection(direction) {
    const {socketId} = direction;
    this.props.socket.emit(`lightUpDirection`, {socketId});
  }

  generateConnectedDirections() {

    const {connectedDirections} = this.state;
    console.log(connectedDirections);

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

    console.log(`render`);

    return (
      <View style={GeneralStyle.pageContainer}>

        <Navigation currentPage={this.props.sceneKey} />

        <Animatable.View style={[GeneralStyle.center, {backgroundColor: `pink`}, GeneralStyle.contentContainer]} useNativeDriver={true} ref='contentContainer'>
          <Button title='oefening maken' onPress={() => Actions.editor()} />
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
