import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Analyse extends Component {

  render() {

    return (
      <View style={[styles.center, {backgroundColor: `crimson`}]}>
        <Text> Analyse </Text>
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
