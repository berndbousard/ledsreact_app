import React from 'react';
import {View, StyleSheet} from 'react-native';

const Direction = ({width, height}) => {
  return (
    <View style={[styles.direction, {width, height}]}></View>
  );
};

const styles = StyleSheet.create({
  direction: {
    backgroundColor: `black`,
    borderRadius: 100,
    shadowColor: `#000000`,
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowRadius: 5,
    shadowOpacity: .1,
    marginLeft: 5,
    marginRight: 5
  }
});

Direction.propTypes = {
  selected: React.PropTypes.bool,
  title: React.PropTypes.string,
  width: React.PropTypes.number,
  height: React.PropTypes.number
};

export default Direction;
