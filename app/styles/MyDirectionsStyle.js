import {StyleSheet} from 'react-native';

import Colors from './Colors';
import Dimensions from './Dimensions';

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
    overflow: `visible`,
    height: 270
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
    borderBottomColor: Colors.lightGrey
  },

  recentTabbarTitle: {
    textAlign: `left`,
    paddingBottom: 10,
    marginTop: - 10
  },

  recentTabbarTitleWrapper: {
    borderBottomWidth: 2,
    marginRight: 40,
    marginBottom: - 2
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
    marginTop: 20,
    height: 320
  },

  ExerciseCardHeader: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `flex-start`
  },

  ExerciseCardImage: {
    borderRadius: 3,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
    width: 236,
    height: 174
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
    marginTop: 15,
    marginLeft: - 5
  },

  ExerciseCardImageWrapper: {
    flexDirection: `column`,
    justifyContent: `center`,
    alignItems: `center`,
    borderRadius: 3,
    backgroundColor: Colors.pureWhite,
    paddingTop: 0, paddingBottom: 15,
    paddingLeft: 5, paddingRight: 5,
    marginTop: 10,

    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: .05,
    shadowRadius: 7
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
    borderLeftWidth: 1,
    borderLeftColor: Colors.lightGrey,
    borderRightWidth: 1,
    borderRightColor: Colors.lightGrey
  },


  ExerciseCardImageElement: {
    width: 236, height: 174
  },

  noConnectedContent: {
    width: 792,
    textAlign: `center`
  },

  notfoundContainer: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `flex-start`
  },

  notfoundImage: {
    width: 138, height: 145
  },

  notFoundNumberWrapper: {
    borderWidth: 2,
    borderColor: Colors.black,
    padding: 2,
    justifyContent: `center`,
    alignItems: `center`,
    width: 44,
    height: 44,
    borderRadius: 44,
    marginRight: 10
  },

  stepWrapper: {
    flexDirection: `row`,
    alignItems: `center`,
    marginTop: 15
  },

  stepTwoWrapper: {
    flexDirection: `row`,
    alignItems: `center`
  },

  bluetoothIcon: {
    width: 10, height: 19,
    marginRight: 7,
    marginLeft: 7
  },

  notFoundContentWrapper: {
    paddingLeft: 25
  }
});

export default MyDirectionsStyle;
