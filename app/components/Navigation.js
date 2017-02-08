import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';

import {NavigationStyle} from '../styles';

const Navigation = ({currentPage}) => {

  return (
    <Animatable.View animation='fadeIn' duration={300} easing={`ease-out-quad`} style={NavigationStyle.navigationWrapper}>
      <View style={NavigationStyle.navigation}>
        <View style={NavigationStyle.mainNav}>
          <TouchableOpacity style={NavigationStyle.navigationLink} activeOpacity={.75} onPress={() => goToPage(`directionOverview`)} >
            <Image style={NavigationStyle.navigationMyDirectionsIcon} source={require(`../assets/png/myDirectionsIcon.png`)}/>
            <Text style={[NavigationStyle.navigationText, currentPage === `directionOverview` ? NavigationStyle.activeNavigationLink : ``]}>Mijn Directions</Text>
          </TouchableOpacity>

          <Image style={NavigationStyle.divider} source={require(`../assets/png/divider.png`)} />

          <TouchableOpacity style={NavigationStyle.navigationLink} activeOpacity={.75} onPress={() => goToPage(`discover`)}>
            <Image style={NavigationStyle.navigationDiscoverIcon} source={require(`../assets/png/discoverIcon.png`)}/>
            <Text style={[NavigationStyle.navigationText, currentPage === `discover` ? NavigationStyle.activeNavigationLink : ``]}>Ontdek</Text>
          </TouchableOpacity>

          <Image style={NavigationStyle.divider} source={require(`../assets/png/divider.png`)} />

          <TouchableOpacity style={NavigationStyle.navigationLink} activeOpacity={.75} onPress={() => goToPage(`exercises`)}>
            <Image style={NavigationStyle.navigationMyExercisesIcon} source={require(`../assets/png/myExercisesIcon.png`)}/>
            <Text style={[NavigationStyle.navigationText, currentPage === `myExercises` ? NavigationStyle.activeNavigationLink : ``]}>Mijn Oefeningen</Text>
          </TouchableOpacity>

          <Image style={NavigationStyle.divider} source={require(`../assets/png/divider.png`)} />

          <TouchableOpacity style={NavigationStyle.navigationLink} activeOpacity={.75} onPress={() => goToPage(`myTrainings`)}>
            <Image style={NavigationStyle.navigationMyTrainingsIcon} source={require(`../assets/png/myTrainingIcon.png`)}/>
            <Text style={[NavigationStyle.navigationText, currentPage === `myTrainings` ? NavigationStyle.activeNavigationLink : ``]}>Mijn Trainingen</Text>
          </TouchableOpacity>

          <Image style={NavigationStyle.divider} source={require(`../assets/png/divider.png`)} />

          <TouchableOpacity style={NavigationStyle.navigationLink} activeOpacity={.75} onPress={() => goToPage(`analytics`)}>
            <Image style={NavigationStyle.navigationAnalyticsIcon} source={require(`../assets/png/analyticsIcon.png`)}/>
            <Text style={[NavigationStyle.navigationText, currentPage === `analytics` ? NavigationStyle.activeNavigationLink : ``]}>Analyse</Text>
          </TouchableOpacity>

          <Image style={NavigationStyle.divider} source={require(`../assets/png/divider.png`)} />
        </View>

        <View style={NavigationStyle.subNav}>
          <TouchableOpacity style={NavigationStyle.navigationLink} activeOpacity={.75} onPress={() => goToPage(`myDirections`)}>
            <Image style={NavigationStyle.navigationMessagesIcon} source={require(`../assets/png/messagesIcon.png`)}/>
          </TouchableOpacity>

          <Image style={NavigationStyle.divider} source={require(`../assets/png/divider.png`)} />

          <TouchableOpacity style={NavigationStyle.navigationLink} activeOpacity={.75} onPress={() => goToPage(`myDirections`)}>
            <Image style={NavigationStyle.navigationNotificationsIcon} source={require(`../assets/png/notificationsIcon.png`)}/>
          </TouchableOpacity>

          <Image style={NavigationStyle.divider} source={require(`../assets/png/divider.png`)} />

          <TouchableOpacity style={NavigationStyle.navigationLink} activeOpacity={.75} onPress={() => goToPage(`myDirections`)}>
            <Image style={NavigationStyle.navigationSettingsIcon} source={require(`../assets/png/settingsIcon.png`)}/>
          </TouchableOpacity>
        </View>
      </View>
      <Image style={NavigationStyle.navigationSkew} source={require(`../assets/png/navigationSkew.png`)} />
    </Animatable.View>
  );
};

const goToPage = page => {

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
