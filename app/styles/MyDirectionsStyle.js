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

  directionsListScroller: {
    overflow: `visible`
  },

  directionsListWrapper: {
    flexDirection: `row`,
    alignItems: `center`,
    marginTop: 60,
    overflow: `visible`,
    paddingBottom: 30
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
  },

  recentTabbar: {
    marginTop: 40,
    flexDirection: `row`,
    alignItems: `center`,
    borderBottomWidth: 2,
    borderBottomColor: Colors.lightGrey,
    paddingBottom: 10
  },

  recentTabbarTitle: {
    textAlign: `left`,
    paddingBottom: 10
  },

  recentTabbarTitleWrapper: {
    borderBottomWidth: 2,
    marginRight: 40,
    marginBottom: - 12
  },

  recentWrapper: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-between`
  },

  recentEmptyText: {
    flex: 1,
    textAlign: `center`,
    marginTop: 145
  },

  ExerciseCard: {
    padding: 10,
    marginTop: 20
  },

  ExerciseCardHeader: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `flex-start`
  },

  ExerciseCardImage: {
    width: 236, height: 174,
    borderWidth: 2,
    borderColor: Colors.orange,
    borderRadius: 2,
    marginTop: 10
  },

  ExerciseCardTitle: {
    flex: 1,
    marginLeft: 8,

  },

  ExerciseCardSportIcon: {
    width: 21, height: 21
  },

  ExerciseCardSpecsWrapper: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    marginTop: 10,
    marginLeft: - 5
  },

  ExerciseCardImageWrapper: {
    flexDirection: `column`,
    justifyContent: `center`,
    alignItems: `center`,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 3,
    paddingTop: 5, paddingBottom: 10,
    marginTop: 10
  },

  ExerciseCardSpec: {
    flexDirection: `column`,
    justifyContent: `center`,
    alignItems: `center`,
    flex: 1
  },

  ExerciseCardSpecIcon: {
    width: 24, height: 25
  },

  ExerciseCardSpecIconMiddle: {
    borderLeftWidth: 2,
    borderLeftColor: Colors.lightGrey,
    borderRightWidth: 2,
    borderRightColor: Colors.lightGrey
  }
});

export default MyDirectionsStyle;
