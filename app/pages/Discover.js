import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { isEmpty } from 'lodash';

import { Colors } from '../globals';

export default class Discover extends Component {

  render(){

    return(
      <View style={[styles.center, {backgroundColor: "orange"}]}>
        <Text> Ontdekken </Text>
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
