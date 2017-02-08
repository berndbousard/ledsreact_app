import React, {Component} from 'react';
import {View, Button, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {GeneralStyle} from '../styles';
import {DatabaseUrl} from '../globals';

class MyTrainings extends Component {

  state = {
    directionsNeeded: [],
    connectedDirections: []
  };

  componentDidMount() {

    this.props.socket.on(`checkDirections`, directions => this.handleWScheckDirections(directions));

    const {exerciseId} = this.props;

    fetch(`${DatabaseUrl}/api/directions?exercise${exerciseId}`)
      .then(r => {
        return r.json();
      })
      .then(r => {
        this.setState({directionsNeeded: r.r});

      })
      .catch(e => {
        console.log(e);
      });

    this.props.socket.emit(`checkDirections`, {});
  }

  componentWillUnmount() {
    this.props.socket.off(`checkDirections`);
  }

  handleWScheckDirections(connectedDirections) {
    this.setState({connectedDirections});
  }

  generateDirectionsForExercise() {
    const {directionsNeeded} = this.state;

    return (
      <Text>Voor deze oefening zijn {directionsNeeded.length} directions nodig</Text>
    );
  }

  generateConnectedDirections() {
    const {connectedDirections} = this.state;

    return (
      <Text>Je hebt {connectedDirections.length} directions verbonden</Text>
    );
  }

  render() {

    let {directionsNeeded, connectedDirections} = this.state;
    connectedDirections = 0;

    return (
      <View style={GeneralStyle.pageContainer}>

        <View style={[GeneralStyle.center, {backgroundColor: `green`}, GeneralStyle.contentContainer]}>
          <Button title='keer keer weer' onPress={() => Actions.pop()} />
          <Button title='uitproberen' onPress={() => Actions.deployment()} disabled={directionsNeeded.length > connectedDirections.length ? false : true} />
          {
            this.generateDirectionsForExercise()
          }
          {
            this.generateConnectedDirections()
          }
        </View>

      </View>
    );
  }
}

MyTrainings.propTypes = {
  socket: React.PropTypes.object,
  name: React.PropTypes.string,
  exerciseId: React.PropTypes.string
};

export default MyTrainings;
