import React from 'react';
import {View} from 'react-native';

const Exercise = () => {
  return (<View></View>);
};

Exercise.propTypes = {
  imageWithDirections: React.PropTypes.string,
  index: React.PropTypes.number,
  groupSize: React.PropTypes.string,
  intensivity: React.PropTypes.string,
  name: React.PropTypes.string
};

export default Exercise;
