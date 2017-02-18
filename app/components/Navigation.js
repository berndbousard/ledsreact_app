import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import {Colors} from '../styles';
import {Fonts} from '../styles';

import {NavigationStyle, Dimensions} from '../styles';

const Navigation = ({currentPage}) => {

  return (
    <Animatable.View  duration={300} easing={`ease-out-quad`} style={NavigationStyle.navigationWrapper}>
      <View style={NavigationStyle.navigation}>
        <View style={NavigationStyle.mainNav}>
          <Animatable.View animation={currentPage === `directionOverview` ? `fadeIn` : ``} style={{opacity: currentPage === `directionOverview` ? 1 : 0.2}}>
            <TouchableOpacity style={[NavigationStyle.navigationLink, NavigationStyle.selectedBorder, {borderLeftColor: currentPage === `directionOverview` ? Colors.orange : `transparent`}]} onPress={() => goToPage(`directionOverview`)} >
              <Image style={NavigationStyle.navigationMyDirectionsIcon} source={require(`../assets/png/myDirectionsIcon.png`)}/>
              <Text style={[NavigationStyle.navigationText, {fontFamily: currentPage === `directionOverview` ? Fonts.circular.bold : Fonts.circular.book}]}>Mijn Directions</Text>
            </TouchableOpacity>
          </Animatable.View>

          <Image style={NavigationStyle.divider} source={require(`../assets/png/divider.png`)} />

          <Animatable.View animation={currentPage === `discover` ? `fadeIn` : ``} style={{opacity: currentPage === `discover` ? 1 : 0.2}}>
            <TouchableOpacity style={[NavigationStyle.navigationLink, NavigationStyle.selectedBorder, {borderLeftColor: currentPage === `discover` ? Colors.orange : `transparent`}]} activeOpacity={.75} onPress={() => goToPage(`discover`)}>
              <Image style={NavigationStyle.navigationDiscoverIcon} source={require(`../assets/png/discoverIcon.png`)}/>
              <Text style={[NavigationStyle.navigationText, {fontFamily: currentPage === `discover` ? Fonts.circular.bold : Fonts.circular.book}]}>Ontdek</Text>
            </TouchableOpacity>
          </Animatable.View>

          <Image style={NavigationStyle.divider} source={require(`../assets/png/divider.png`)} />

          <Animatable.View animation={currentPage === `myExercises` ? `fadeIn` : ``} style={{opacity: currentPage === `myExercises` ? 1 : 0.2}}>
            <TouchableOpacity style={[NavigationStyle.navigationLink, NavigationStyle.selectedBorder, {borderLeftColor: currentPage === `myExercises` ? Colors.orange : `transparent`}]} activeOpacity={.75} onPress={() => goToPage(`myExercises`)}>
              <Image style={NavigationStyle.navigationMyExercisesIcon} source={require(`../assets/png/myExercisesIcon.png`)}/>
              <Text style={[NavigationStyle.navigationText, {fontFamily: currentPage === `myExercises` ? Fonts.circular.bold : Fonts.circular.book}]}>Mijn Oefeningen</Text>
            </TouchableOpacity>
          </Animatable.View>

          <Image style={NavigationStyle.divider} source={require(`../assets/png/divider.png`)} />

          <Animatable.View animation={currentPage === `myTrainings` ? `fadeIn` : ``} style={{opacity: currentPage === `myTrainings` ? 1 : 0.2}}>
            <TouchableOpacity style={[NavigationStyle.navigationLink, NavigationStyle.selectedBorder, {borderLeftColor: currentPage === `myTrainings` ? Colors.orange : `transparent`}]} activeOpacity={.75} onPress={() => goToPage(`myTrainings`)}>
              <Image style={NavigationStyle.navigationMyTrainingsIcon} source={require(`../assets/png/myTrainingIcon.png`)}/>
              <Text style={[NavigationStyle.navigationText, {fontFamily: currentPage === `myTrainings` ? Fonts.circular.bold : Fonts.circular.book}]}>Mijn Trainingen</Text>
            </TouchableOpacity>
          </Animatable.View>

          <Image style={NavigationStyle.divider} source={require(`../assets/png/divider.png`)} />

          <Animatable.View animation={currentPage === `analytics` ? `fadeIn` : ``} style={{opacity: currentPage === `analytics` ? 1 : 0.2}}>
            <TouchableOpacity style={[NavigationStyle.navigationLink, NavigationStyle.selectedBorder, {borderLeftColor: currentPage === `analytics` ? Colors.orange : `transparent`}]} activeOpacity={.75} onPress={() => goToPage(`analytics`)}>
              <Image style={NavigationStyle.navigationAnalyticsIcon} source={require(`../assets/png/analyticsIcon.png`)}/>
              <Text style={[NavigationStyle.navigationText,  {fontFamily: currentPage === `analytics` ? Fonts.circular.bold : Fonts.circular.book}]}>Analyse</Text>
            </TouchableOpacity>
          </Animatable.View>

          <Image style={NavigationStyle.divider} source={require(`../assets/png/divider.png`)} />
        </View>


        <View style={NavigationStyle.subNav}>
          <Animatable.View style={{opacity: currentPage === `messages` ? 1 : 0.2}}>
            <TouchableOpacity style={[NavigationStyle.navigationLink, NavigationStyle.navigationLinkSmall, NavigationStyle.selectedBorder, {borderLeftColor: currentPage === `messages` ? Colors.orange : `transparent`}]} activeOpacity={.75} onPress={() => goToPage(`directionOverview`)}>
              <Image style={NavigationStyle.navigationMessagesIcon} source={require(`../assets/png/messagesIcon.png`)}/>
            </TouchableOpacity>
          </Animatable.View>

          <Image style={NavigationStyle.divider} source={require(`../assets/png/divider.png`)} />

          <Animatable.View style={{opacity: currentPage === `notifications` ? 1 : 0.2}}>
            <TouchableOpacity style={[NavigationStyle.navigationLink, NavigationStyle.navigationLinkSmall, NavigationStyle.selectedBorder, {borderLeftColor: currentPage === `notifications` ? Colors.orange : `transparent`}]} activeOpacity={.75} onPress={() => goToPage(`directionOverview`)}>
              <Image style={NavigationStyle.navigationNotificationsIcon} source={require(`../assets/png/notificationsIcon.png`)}/>
            </TouchableOpacity>
          </Animatable.View>

          <Image style={NavigationStyle.divider} source={require(`../assets/png/divider.png`)} />

          <Animatable.View style={{opacity: currentPage === `settings` ? 1 : 0.2}}>
            <TouchableOpacity style={[NavigationStyle.navigationLink, NavigationStyle.navigationLinkSmall, NavigationStyle.selectedBorder, {borderLeftColor: currentPage === `settings` ? Colors.orange : `transparent`}]} activeOpacity={.75} onPress={() => goToPage(`directionOverview`)}>
              <Image style={NavigationStyle.navigationSettingsIcon} source={require(`../assets/png/settingsIcon.png`)}/>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </View>
      <View style={{height: Dimensions.height, marginLeft: - 10, width: 30, backgroundColor: Colors.black, zIndex: - 1, transform: [{skewX: `-1deg`}]}}>
      </View>
    </Animatable.View>
  );
};

const goToPage = page => {
  Actions[`${page}`]({type: ActionConst.REPLACE});
};

Navigation.propTypes = {
  selected: React.PropTypes.bool,
  title: React.PropTypes.string,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  currentPage: React.PropTypes.string
};

export default Navigation;
