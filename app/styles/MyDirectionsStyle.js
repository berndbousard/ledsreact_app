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
    justifyContent: `space-between`,
    marginLeft: - 5
  },

  recentEmptyText: {
    flex: 1,
    textAlign: `center`,
    marginTop: 145
  },

  ExerciseCard: {
    padding: 10,
    marginTop: 10,
    height: 320
  },

  ExerciseCardHeader: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `flex-start`
  },

  ExerciseCardImage: {
    borderRadius: 3,
    // borderBottomWidth: 1,
    width: 236,
    height: 174,
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
    marginTop: 20,
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
    width: 236, height: 174,
    backgroundColor: `#FBFBFB`,
    borderWidth: 2,
    borderColor: `#F5F5F5`,
    borderRadius: 3,
    transform: [{scale: 0.95}, {translateY: 8}]
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
  },

  trainingsSpecs: {
    flexDirection: `row`,
    justifyContent: `center`,
    alignItems: `center`,
    marginBottom: 15
  },

  trainingwrapper: {
    marginTop: 30,
    width: Dimensions.width - 220,
    height: 280,
    padding: 20,
    borderWidth: 1,
    backgroundColor: Colors.pureWhite,
    borderColor: Colors.borderforGreyBackground,
    borderRadius: 4,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: .05,
    shadowRadius: 7,
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
  },

  timeIcon: {
    width: 30,
    height: 30,
    marginRight: 13
  },

  dateIcon: {
    width: 30,
    height: 30,
    marginRight: 13
  },

  trainingsData: {
    width: 220
  },

  topContent: {
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    height: 190,
  },

  primaryButton: {
    width: 180
  },

  buttonIconTrainer: {
    width: 25,
    height: 17
  },

  ExerciseTrainerCardImage: {
    borderWidth: 1,
    borderColor: Colors.borderforGreyBackground,
    borderRadius: 3,
    marginLeft: 20,
  },

  exercisesTrainingWrapper: {
    flexDirection: `row`,
  },

  exerciseCardSpecsWrapperForTraining: {
    marginTop: - 2,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 2
  },

  ExerciseCardImageForTraining: {
    transform: [{scale: 0.95}, {translateY: - 2}]
  }

});

export default MyDirectionsStyle;
