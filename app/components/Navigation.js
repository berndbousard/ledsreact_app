import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';

import {ComponentStyle} from '../styles';

const Navigation = ({currentPage}) => {

  return (
    <View style={ComponentStyle.navigation}>
      <View style={ComponentStyle.mainNatigation}>
        <TouchableOpacity style={ComponentStyle.navigationLink} activeOpacity={.75} onPress={() => goTopPage(`myDirections`)} >
          <Text style={[ComponentStyle.navigationItem, currentPage === `directionOverview` ? ComponentStyle.activeNavigationLink : ``]}>Mijn Directions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={ComponentStyle.navigationLink} activeOpacity={.75} onPress={() => goTopPage(`discover`)}>
          <Text style={[ComponentStyle.navigationItem, currentPage === `discover` ? ComponentStyle.activeNavigationLink : ``]}>Ontdek</Text>
        </TouchableOpacity>

        <TouchableOpacity style={ComponentStyle.navigationLink} activeOpacity={.75} onPress={() => goTopPage(`myExercises`)}>
          <Text style={[ComponentStyle.navigationItem, currentPage === `myExercises` ? ComponentStyle.activeNavigationLink : ``]}>Mijn Oefeningen</Text>
        </TouchableOpacity>

        <TouchableOpacity style={ComponentStyle.navigationLink} activeOpacity={.75} onPress={() => goTopPage(`myTrainings`)}>
          <Text style={[ComponentStyle.navigationItem, currentPage === `myTrainings` ? ComponentStyle.activeNavigationLink : ``]}>Mijn Trainingen</Text>
        </TouchableOpacity>

        <TouchableOpacity style={ComponentStyle.navigationLink} activeOpacity={.75} onPress={() => goTopPage(`analytics`)}>
          <Text style={[ComponentStyle.navigationItem, currentPage === `analytics` ? ComponentStyle.activeNavigationLink : ``]}>Analyse</Text>
        </TouchableOpacity>
      </View>

      <View style={ComponentStyle.subNatigation}>
        <TouchableOpacity style={ComponentStyle.navigationLink} activeOpacity={.75} onPress={() => goTopPage(`myDirections`)}>
          <Text style={[ComponentStyle.navigationItem, currentPage === `messages` ? ComponentStyle.activeNavigationLink : ``]}>Messages</Text>
        </TouchableOpacity>

        <TouchableOpacity style={ComponentStyle.navigationLink} activeOpacity={.75} onPress={() => goTopPage(`myDirections`)}>
          <Text style={[ComponentStyle.navigationItem, currentPage === `notifications` ? ComponentStyle.activeNavigationLink : ``]}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={ComponentStyle.navigationLink} activeOpacity={.75} onPress={() => goTopPage(`myDirections`)}>
          <Text style={[ComponentStyle.navigationItem, currentPage === `me` ? ComponentStyle.activeNavigationLink : ``]}>Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const goTopPage = page => {

  Actions[`${page}`]({type: ActionConst.REPLACE});

  // if (page === `myDirections`) {
  //   Actions.myDirections({type: ActionConst.REPLACE});
  // }
  //
  // if (page === `discover`) {
  //   Actions.discover({type: ActionConst.REPLACE});
  // }
  //
  // if (page === `myExercises`) {
  //   Actions.myExercises({type: ActionConst.REPLACE});
  // }
  //
  // if (page === `myExercises`) {
  //   Actions.myExercises({type: ActionConst.REPLACE});
  // }
};

Navigation.propTypes = {
  selected: React.PropTypes.bool,
  title: React.PropTypes.string,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  currentPage: React.PropTypes.string
};

export default Navigation;


/*

1. CurrentPage is de key in App.js

2. Met onPress kan ernaar gesurft worden.

*/
