import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { isEmpty } from 'lodash';

import { Colors } from '../globals';

export default class ExerciseDetail extends Component {

  constructor(){
    super();

    this.state = {
      exercises: []
    }
  }

  sendData(){
    fetch('http://localhost:3000/api/tests', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'name': 'bernd',
        'description': 'bernd zijn beschrijving',
      })
    })
      .then(t => {
        return t.json();
      })
      .then(t => {
        console.log(t);
      })
      .catch(e => {
        console.log(e);
      });

  }

  componentDidMount(){
    fetch('http://localhost:3000/api/tests')
      .then(r => r.json())
      .then(r => {
        if(isEmpty(r)) return;
        this.setState({exercises: r.tests});
      })
      .catch((e) => {
        console.log(e);
      })
  }

  renderDetails(){
    let {exercises} = this.state;

    return (
      <View>
        {
          exercises.map((e, index) => {
            return <Text key={index}>{e.name}</Text>
          })
        }
      </View>
    )
  }

  render(){
    return(
      <View style={[styles.center, {backgroundColor: "blue"}]}>
        <Text> Detail pagina van oefening </Text>
        {this.renderDetails()}
        <Button title="add test data" onPress={() => this.sendData()} />
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
