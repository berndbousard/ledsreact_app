import React, {Component} from 'react';
import {View, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {DatabaseUrl} from '../globals';
import {GeneralStyle, DeploymentStyle} from '../styles';

class Deployment extends Component {

  state = {
    directions: []
  }

  componentDidMount() {
    this.fetchDirections();
  }

  fetchDirections() {
    fetch(`${DatabaseUrl}/api/directions?exercise=${this.props.exerciseId}`)
      .then(r => {
        return r.json();
      })
      .then(({directions}) => {
        this.setState({directions});
        this.props.socket.emit(`setDirectionSettings`, directions);
      })
      .catch(e => {
        console.log(e);
      });
  }

  nextStepHandler() {
    console.log(this.props);

    this.props.socket.emit(`nextStep`);
  }

  render() {

    return (
      <View style={GeneralStyle.pageContainer}>

        <View style={[DeploymentStyle.pageContainer]}>
          {/* CONTENT */}
          <Button title='next step' onPress={() => this.nextStepHandler()} />
          <Button title='abort mission' onPress={() => Actions.pop()} />
        </View>

      </View>
    );
  }
}

Deployment.propTypes = {
  socket: React.PropTypes.object,
  name: React.PropTypes.string,
  exerciseId: React.PropTypes.string
};

export default Deployment;
