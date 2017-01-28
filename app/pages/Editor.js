import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { isEmpty } from 'lodash';

import { Colors } from '../globals';

export default class Editor extends Component {

  render(){

    let {directionAmount = 0} = this.props;

    return(
      <View style={[styles.center, {backgroundColor: "coral"}]}>
        <Text> Editor </Text>
        <Text> {`Je kan ${directionAmount} Directions plaatsen`} </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
