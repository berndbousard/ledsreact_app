import React, {Component} from 'react';
import {View} from 'react-native';

class Direction extends Component {

  render() {
    return (
      <View></View>
    );
  }


}

Direction.propTypes = {
  selected: React.PropTypes.bool,
  title: React.PropTypes.string,
  width: React.PropTypes.number,
  height: React.PropTypes.number
};

export default Direction;
