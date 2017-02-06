import {StyleSheet} from 'react-native';

import Colors from './Colors';
import Dimensions from './Dimensions';
import Fonts from './Fonts';

const MyDirectionsStyle = StyleSheet.create({
  directionsHeaderWrapper: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`
  },

  directionsHeaderTitle: {
    textAlign: `left`
  },

  directionsHeaderCopy: {
    marginTop: 2
  },

  directionsHeaderButtonWrapper: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-between`
  },

  directionsHeaderSecundairyButtonWrapper: {
    marginRight: 20
  },

  buttonIcon: {
    width: 17, height: 19,
    marginRight: 10
  },

  directionsListWrapper: {
    flexDirection: `row`,
    alignItems: `center`,
    marginTop: 50
  },

  directionListItemWrapper: {
    flexDirection: `column`,
    justifyContent: `center`,
    marginRight: 50
  },

  directionListItemImage: {
    width: 140, height: 149
  },

  directionListItemInfo: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10
  },

  directionListItemBatteryWrapper: {
    flexDirection: `row`,
    alignItems: `center`
  },

  directionListItemBattery: {
    width: 10, height: 20,
    marginLeft: 5
  },

  directionListItemPower: {
    width: 18, height: 19
  }
});

export default MyDirectionsStyle;
