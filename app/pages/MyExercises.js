import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class MyExercises extends Component {

  constructor() {
    super();
  }

  writeToFirebase() {

  }

  render() {

    return (
      <View style={[styles.center, {backgroundColor: `aqua`}]}>
        <Text> Mijn Oefeningen </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`
  }
});
