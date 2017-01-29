import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Router, Scene, ActionConst } from 'react-native-router-flux';
import * as firebase from 'firebase';

import {
  Onboarding,
  Login,
  MyDirections,
  Editor,
  Discover,
  MyExercises,
  ExerciseDetail,
  MyTrainings,
  Analyse } from './pages';

import { Colors } from './globals/';

const TabIcon = ({selected, title}) => {
  return (
    <Text style={{color: selected ? 'red' : 'black'}}>{title}</Text>
  )
};

// Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCfqQSKQLd2yYyw5iOy-_y86f2-tn4YS58",
  authDomain: "ledsreact-6f08c.firebaseapp.com",
  databaseURL: "https://ledsreact-6f08c.firebaseio.com",
  storageBucket: "ledsreact-6f08c.appspot.com"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class Main extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="onboarding" component={Onboarding} title="Onboarding"  />
          <Scene key="login" component={Login} title="Login" backTitle="onboarding"  />
          <Scene key="exerciseDetail" component={ExerciseDetail} title='Oefening detail' />

          <Scene key="editor" component={Editor} title='Editor' direction="vertical"/>

          <Scene key="tabbar" tabs={true} tabBarStyle={{backgroundColor: Colors.white}} type={ActionConst.RESET} initial >
            <Scene key="tab1" title="Mijn Directions" icon={TabIcon} >
              <Scene key="myDirections" component={MyDirections} title='Mijn Directions' />
            </Scene>

            <Scene key="tab2" title="Ontdek" icon={TabIcon}>
              <Scene key="discover" component={Discover} title='Ontdek' />
            </Scene>

            <Scene key="tab3" title="Mijn Oefeningen" icon={TabIcon}>
              <Scene key="myExercises" component={MyExercises} title='Mijn Oefeningen' />
            </Scene>

            <Scene key="tab4" title="Mijn Trainingen" icon={TabIcon}>
              <Scene key="myTrainings" component={MyTrainings} title='Mijn Trainingen' />
            </Scene>

            <Scene key="tab5" title="Analyse" icon={TabIcon}>
              <Scene key="analyse" component={Analyse} title='analyse' />
            </Scene>
          </Scene>
        </Scene>
      </Router>
    );
  }
}
