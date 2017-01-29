import React from 'react';
import {View, StyleSheet} from 'react-native';

import {ComponentStyle} from '../styles';

const Direction = ({width, height}) => {
  return (
    <View style={[ComponentStyle.direction, {width, height}]}></View>
  );
};

Direction.propTypes = {
  selected: React.PropTypes.bool,
  title: React.PropTypes.string,
  width: React.PropTypes.number,
  height: React.PropTypes.number
};

export default Direction;
