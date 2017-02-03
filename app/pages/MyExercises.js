import React, {Component} from 'react';
import {View, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {GeneralStyle} from '../styles';
import {Navigation} from '../components';

class MyExercises extends Component {

  render() {

    return (
      <View style={GeneralStyle.pageContainer}>

        <Navigation currentPage={this.props.name} />

        <View style={[GeneralStyle.center, {backgroundColor: `red`}, GeneralStyle.contentContainer]}>
          {/* CONTENT */}
          <Button title='go to exercise detail' onPress={() => Actions.exerciseDetail({exerciseId: `5893750a21e64a09c9d4a506`})} />
        </View>

      </View>
    );
  }
}

MyExercises.propTypes = {
  socket: React.PropTypes.object,
  name: React.PropTypes.string
};

export default MyExercises;
