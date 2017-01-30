import React, {Component} from 'react';
import {Router, Scene, ActionConst} from 'react-native-router-flux';

import {
  Onboarding,
  Login,
  MyDirections,
  Editor,
  Discover,
  MyExercises,
  ExerciseDetail,
  MyTrainings,
  Analyse
  } from './pages';

import {TabbarIcon} from './components/';

import {Colors} from './globals/';

class Main extends Component {
  render() {
    return (
      <Router>
        <Scene key='root'>
          <Scene key='onboarding' component={Onboarding} title='Onboarding'   />
          <Scene key='login' component={Login} title='Login' backTitle='onboarding' initial />
          <Scene key='exerciseDetail' component={ExerciseDetail} title='Oefening detail' />

          <Scene key='editor' component={Editor} title='Editor' direction='vertical' panHandlers={null}/>

          <Scene key='tabbar' tabs={true} tabBarStyle={{backgroundColor: Colors.white}} type={ActionConst.RESET}  >
            <Scene key='tab1' title='Mijn Directions' icon={TabbarIcon} >
              <Scene key='myDirections' component={MyDirections} title='Mijn Directions' />
            </Scene>

            <Scene key='tab2' title='Ontdek' icon={TabbarIcon}>
              <Scene key='discover' component={Discover} title='Ontdek' />
            </Scene>

            <Scene key='tab3' title='Mijn Oefeningen' icon={TabbarIcon}>
              <Scene key='myExercises' component={MyExercises} title='Mijn Oefeningen' />
            </Scene>

            <Scene key='tab4' title='Mijn Trainingen' icon={TabbarIcon}>
              <Scene key='myTrainings' component={MyTrainings} title='Mijn Trainingen' />
            </Scene>

            <Scene key='tab5' title='Analyse' icon={TabbarIcon}>
              <Scene key='analyse' component={Analyse} title='analyse' />
            </Scene>
          </Scene>
        </Scene>
      </Router>
    );
  }
}

export default Main;
