import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {Colors} from '../globals';

export default class Onboarding extends Component {
  render() {
    return (
      <View style={[styles.center, {backgroundColor: `pink`}]}>
        <Text>Onboarding</Text>
        <View>
          <Button title='Inloggen' color={Colors.blue} accessibilityLabel='Inloggen als bestaande trainer' onPress={() => {Actions.login();}} />
          <Button title='Registreer' color={Colors.blue} accessibilityLabel='Registreer als nieuwe trainer' onPress={() => {console.log(`registreer`);}} />
        </View>
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
