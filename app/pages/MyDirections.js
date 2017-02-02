import React, {PureComponent} from 'react';
import {View, Button, Text, TouchableOpacity} from 'react-native';

import {isEmpty} from 'lodash';
import {GeneralStyle, ComponentStyle} from '../styles';
import {Navigation} from '../components';

class MyDirections extends PureComponent {

  constructor(props) {
    super(props);

    this.props = props;

    this.state = {
      connectedDirections: []
    };

    this.props.socket.on(`init`, directions => this.handleWSDirections(directions));
    this.props.socket.on(`updateDirections`, socketId => this.handleWSupdateDirections(socketId));
    this.props.socket.on(`directionJoined`, direction => this.handleWSdirectionJoined(direction));
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

    if (isEmpty(connectedDirections)) {
      return <Text>Er zijn geen Directions verbonden</Text>;
    }

    return (
      connectedDirections.map((d, index) => {
        return (
          <TouchableOpacity style={ComponentStyle.button} onPress={() => {this.detectDirection(d);}} key={index}>
            <View>
              <Text>{d.socketId}</Text>
              <Text>{`${d.batteryLevel} %`}</Text>
            </View>
          </TouchableOpacity>
        );
      })
    );
  }

  render() {

    console.log(`render`);

    return (
      <View style={{flexDirection: `row`, flex: 1}}>

        <Navigation currentPage={this.props.name} />

        <View style={[GeneralStyle.center, {backgroundColor: `pink`}, GeneralStyle.contentContainer]}>
          <Button title='oefening maken' onPress={() => {console.log(`blabla`);}} />
          <View style={{flexDirection: `column`, alignItems: `center`}}>
            <Text>Verbonden Directions</Text>
            <View style={{flexDirection: `row`, alignItems: `center`, justifyContent: `center`}}>
              {this.generateConnectedDirections()}
            </View>
          </View>
        </View>


      </View>

    );
  }
}

MyDirections.propTypes = {
  socket: React.PropTypes.object,
  name: React.PropTypes.string
};

export default MyDirections;
