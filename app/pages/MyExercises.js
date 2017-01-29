import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import * as firebase from 'firebase';

export default class MyExercises extends Component {

  constructor() {
    super();

    this.database = firebase.database().ref();

    this.state({

    });
  }

  writeToFirebase() {
    // firebase.database().ref('users/').set({
    //   name: name,
    //   description: email
    // });

    // SET

    //  - Overschrijven

    // this.database.child(`users`).set(`a value`);

    // - Bijvoegen met unieke key

    // this.database.child(`users`).push().set({
    //   name: `bernd`,
    //   description: `dit is een beschrijving`
    // });

    // GET
    // const users = this.database.child(`users`);
    // users.on(`value`, data => {
    //   // console.log(data.val());
    //   const result = Object.values(data.val()); //https://github.com/tc39/proposal-object-values-entries
    // });
  }

  render() {

    return (
      <View style={[styles.center, {backgroundColor: `aqua`}]}>
        <Text> Mijn Oefeningen </Text>
        <Button title='firebase push' onPress={() => this.writeToFirebase(`bernd`, `hallo ik ben nieuw hier`)} />
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
