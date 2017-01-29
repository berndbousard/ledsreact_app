import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, Alert, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';

import {Colors} from '../globals';

// https://facebook.github.io/react-native/docs/textinput.html

export default class Login extends Component {

  constructor() {
    super();

    this.state = {
      email: ``,
      password: ``
    };
  }

  login() {

    const {email, password} = this.state;

    firebase.auth().signInWithEmailAndPassword(`${email}`, `${password}`)
      .then(() => {
        Actions.tabbar();
      })
      .catch(e => {
        console.log(e);
        Alert.alert(
          `Inloggen mislukt`,
          e.message,
          [
            {text: `Opnieuw proberen`, onPress: () => console.log(`opnieuw`)}
          ]
        );
      });
  }

  render() {

    const {email, password} = this.state;

    return (
      <View style={[styles.center, {backgroundColor: `green`}]}>
        <View style={styles.center}>
          <Text>Login</Text>
          <View>
            <TextInput style={{height: 40, width: 200, borderColor: `gray`, borderWidth: 1}} autoCapitalize='none' autoCorrect={false} keyboardType='email-address' value={email} onChangeText={email => this.setState({email})} placeholder='email' />
            <TextInput style={{height: 40, width: 200, borderColor: `gray`, borderWidth: 1}} autoCapitalize='none' autoCorrect={false} value={password} onChangeText={password => this.setState({password})} placeholder='password' />
          </View>
          <Button title='Inloggen' color={Colors.blue} accessibilityLabel='Inloggen als bestaande trainer' onPress={() => {this.login();}} />
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
