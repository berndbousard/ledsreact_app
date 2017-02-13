import {StyleSheet} from 'react-native';

import Colors from './Colors';
import Fonts from './Fonts';

const NavigationStyle = StyleSheet.create({
  navigationWrapper: {
    flex: 0.8,
    flexDirection: `row`,
    zIndex: 1
  },

  navigation: {
    backgroundColor: Colors.black,
    flexDirection: `column`,
    justifyContent: `space-between`,
    alignItems: `center`,
    paddingLeft: 11,
    paddingRight: 11,
    width: 110,
  },


  mainNav: {
    marginLeft: - 10,
    paddingTop: 25,
    alignSelf: `stretch`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`,
    backgroundColor: `rgba(0,0,0,0)`
  },

  subNav: {
    marginLeft: - 10,
    paddingBottom: 10,
    alignSelf: `stretch`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`
  },

  navigationText: {
    color: `white`,
    textAlign: `center`,
    alignSelf: `stretch`,
    marginTop: 7,
    fontFamily: Fonts.circular.book,
    fontSize: Fonts.size.navCopy,
    backgroundColor: `transparent`,
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
    height: 25,
    transform: [{translateX: 3}]
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
    height: 21,
    transform: [{translateX: - 2}]
  },

  navigationSettingsIcon: {
    width: 21,
    height: 22,
    transform: [{translateX: - 2}]
  },

  divider: {
    width: 30,
    height: 2,
    opacity: .07,
    marginLeft: 20,
  },

  navigationSkew: {
    width: 22,
    height: 768,
    backgroundColor: `rgba(0,0,0,0)`
  },


  navigationLink: {
    alignSelf: `stretch`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`,
    width: 120,
    height: 90,
    paddingTop: 13,
    paddingBottom: 8,
    marginBottom: 8,
  },


  navigationLinkSmall: {
    height: 10,
    paddingBottom: 15,
    marginTop: 15,
  },

  activeNavigationLink: {
    color: Colors.orange,
    fontFamily: Fonts.circular.bold
  },

  selectedBorder: {
    borderLeftWidth: 3,
  },

  selectedNav: {
    position: `absolute`,
    height: 100,
    width: 3,
    backgroundColor: Colors.orange,
    left: 0,
    top: 0
  }
});

export default NavigationStyle;
