import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Router, Scene, ActionConst } from 'react-native-router-flux';

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

export default class Main extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="onboarding" component={Onboarding} title="Onboarding" />
          <Scene key="login" component={Login} title="Login" backTitle="onboarding" />

          <Scene key="editor" component={Editor} title='Editor' direction="vertical"/>

          <Scene key="tabbar" tabs={true} tabBarStyle={{backgroundColor: Colors.white}} initial hideBackImage={true} >
            <Scene key="tab1" title="Mijn Directions" icon={TabIcon} >
              <Scene key="myDirections" component={MyDirections} title='Mijn Directions' />
            </Scene>

            <Scene key="tab2" title="Ontdek" icon={TabIcon}>
              <Scene key="discover" component={Discover} title='Ontdek' />
            </Scene>

            <Scene key="tab3" title="Mijn Oefeningen" icon={TabIcon}>
              <Scene key="myExercises" component={MyExercises} title='Mijn Oefeningen' />
              <Scene key="exerciseDetail" component={ExerciseDetail} title='Oefening detail' />
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
