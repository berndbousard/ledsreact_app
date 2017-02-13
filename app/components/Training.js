import React from 'react';
import {Image, Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {TextStyles, MyDirectionsStyle} from '../styles';
import {DatabaseUrl} from '../globals';

const Exercise = ({index, name, groupSize, intensivity, imageWithDirections}) => {

  return (

  );
};

Exercise.propTypes = {
  imageWithDirections: React.PropTypes.string,
  index: React.PropTypes.number,
  groupSize: React.PropTypes.string,
  intensivity: React.PropTypes.string,
  name: React.PropTypes.string
};

export default Exercise;
