import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Colors } from '../globals';

export default class MyDirections extends Component {

  componentDidMount(){
    this.makeConnection();
  }

  makeConnection(){

  }

  render(){
    return(
      <View style={[styles.center, {backgroundColor: 'pink'}]}>
        <Text>Mijn Directions</Text>
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
