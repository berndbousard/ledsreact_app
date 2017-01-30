import React, {Component} from 'react';
import {View, Text, Button, Alert, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {isEmpty} from 'lodash';

import {Colors, DatabaseUrl, AsyncStorage} from '../globals';
import {GeneralStyle} from '../styles';

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

    if (this.isValid()) {
      fetch(`${DatabaseUrl}/api/auth`, {
        method: `POST`,
        headers: {Accept: `application/json`, 'Content-Type': `application/json`},
        body: JSON.stringify({
          login: email,
          password: password,
          audience: `app`
        })
      })
        .then(r => {
          return r.json();
        })
        .then(r => {
          AsyncStorage.setItem(`token`, r.token);
          AsyncStorage.getItem(`token`);
        })
        .catch(e => {
          Alert.alert(
            `Inloggen mislukt`,
            e,
            {text: `Opnieuw proberen`, onPress: () => console.log(`Ask me later pressed`)}
          );
        });
    }
  }


  isValid() {
    const {email, password} = this.state;

    if (isEmpty(email)) {
      Alert.alert(
        `Inloggen mislukt`,
        `Je bent je email vergeten invullen`,
        {text: `Ok`}
      );
      return false;
    }

    if (isEmpty(password)) {
      Alert.alert(
        `Inloggen mislukt`,
        `Je bent je wachtwoord vergeten invullen`,
        {text: `Ok`}
      );
      return false;
    }

    return true;
  }

  render() {

    return (
      <View style={[GeneralStyle.center, {backgroundColor: `green`}]}>
        <View style={GeneralStyle.center}>
          <Text>Login</Text>
          <View>
            <TextInput style={{height: 40, width: 200, borderColor: `gray`, borderWidth: 1}} autoCapitalize='none' autoCorrect={false} keyboardType='email-address' onChangeText={email => {this.setState({email});}} placeholder='email' ref='email' />
            <TextInput style={{height: 40, width: 200, borderColor: `gray`, borderWidth: 1}} autoCapitalize='none' autoCorrect={false} onChangeText={password => {this.setState({password});}} secureTextEntry={true} placeholder='password' ref='password' />
          </View>
          <Button title='Inloggen' color={Colors.blue} accessibilityLabel='Inloggen als bestaande trainer' onPress={() => {this.login();}} />
        </View>

      </View>

    );
  }
}
