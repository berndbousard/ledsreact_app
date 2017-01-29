import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class MyTrainings extends Component {

  render() {

    return (
      <View style={[styles.center, {backgroundColor: `goldenrod`}]}>
        <Text> Mijn Trainingen </Text>
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
