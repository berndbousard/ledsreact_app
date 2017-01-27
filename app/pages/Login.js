import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Colors } from '../globals';

export default class Login extends Component {
  render(){
    return(
      <View style={[styles.center, {backgroundColor: 'green'}]}>
        <Text>Login</Text>
        <View>
          <Button title="Inloggen" color={Colors.blue} accessibilityLabel="Inloggen als bestaande trainer" onPress={() => {Actions.myDirections()}} />
        </View>
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
