import {StyleSheet} from 'react-native';

import Colors from './Colors';
import Fonts from './Fonts';

const NavigationStyle = StyleSheet.create({
  navigationWrapper: {
    flex: 1,
    flexDirection: `row`,
    zIndex: 1
  },

  navigation: {
    backgroundColor: Colors.black,
    flexDirection: `column`,
    justifyContent: `space-between`,
    alignItems: `center`,
    paddingLeft: 11,
    paddingRight: 11
  },

  navigationLink: {
    alignSelf: `stretch`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`
  },

  mainNav: {
    paddingTop: 25,
    alignSelf: `stretch`,
    flexDirection: `column`,
    alignItems: `center`,
  },

  subNav: {
    paddingBottom: 25,
    alignSelf: `stretch`,
    flexDirection: `column`,
    alignItems: `center`,
  },

  navigationText: {
    color: `white`,
    textAlign: `center`,
    alignSelf: `stretch`,
    marginTop: 7,
    fontFamily: Fonts.circular.book,
    fontSize: Fonts.size.navCopy
  },

  navigationMyDirectionsIcon: {
    width: 35,
    height: 35
  },

  navigationDiscoverIcon: {
    width: 35,
    height: 40
  },

  navigationMyExercisesIcon: {
    width: 35,
    height: 22
  },

  navigationMyTrainingsIcon: {
    width: 36,
    height: 25
  },

  navigationAnalyticsIcon: {
    width: 35,
    height: 28
  },

  navigationMessagesIcon: {
    width: 19,
    height: 13
  },

  navigationNotificationsIcon: {
    width: 16,
    height: 21
  },

  navigationSettingsIcon: {
    width: 21,
    height: 22
  },

  divider: {
    width: 110,
    height: 2,
    opacity: .07,
    marginTop: 20,
    marginBottom: 20,
  },

  navigationSkew: {
    width: 22,
    height: 768
  },

  activeNavigationLink: {
    borderLeftWidth: 30,
    borderLeftColor: Colors.orange,
    color: Colors.orange,
    fontFamily: Fonts.circular.bold
  }
});

export default NavigationStyle;
