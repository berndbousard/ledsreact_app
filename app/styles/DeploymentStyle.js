import {StyleSheet} from 'react-native';

import Colors from './Colors';
import Dimensions from './Dimensions';

const DeploymentStyle = StyleSheet.create({
  container: {
    flexDirection: `row`,
    alignItems: `center`
  },

  pageContainer: {
    backgroundColor: Colors.white,
    width: Dimensions.width,
    height: Dimensions.height,

    position: `relative`,

    flexDirection: `column`,
    justifyContent: `space-between`,
    alignItems: `center`
  },

  fieldImage: {
    position: `absolute`,
    top: 0,
    bottom: 0,
    width: Dimensions.width,
    height: Dimensions.height
  },

  directionImageWrapper: {
    position: `absolute`,
    opacity: 0,
    padding: 5,
    borderWidth: 2,
    width: 115, height: 115,
    flexDirection: `row`,
    justifyContent: `center`,
    alignItems: `center`,
    borderRadius: 100
  },

  directionImage: {
    width: 100, height: 107,
    marginTop: 6
  },

  directionsWrapper: {
    position: `absolute`
  },

  bottomBarWrapper: {
    backgroundColor: Colors.pink,
    flexDirection: `row`,
    justifyContent: `center`,
    alignItems: `center`,
    padding: 20
  },

  nextDirectionImageIcon: {
    width: 19, height: 15,
    marginLeft: 10
  },

  secundairyButtonImageIcon: {
    width: 19, height: 15,
    marginRight: 10
  },

  buttonBottom: {
    marginLeft: 25, marginRight: 25
  },

  topBarWrapper: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-between`,
    padding: 30,
    width: Dimensions.width,
    position: `relative`
  },

  minimiseButton: {
    width: 50, height: 50,
    justifyContent: `center`,
    alignItems: `center`,
    transform: [{rotate: `180deg`}],
    borderRadius: 50,
  },

  minimiseImageIcon: {
    width: 20, height: 13,
  },

  stopIcon: {
    width: 12, height: 12,
    marginRight: 10
  },

  instructions: {
    // position: `absolute`,
    backgroundColor: Colors.black,
    flexDirection: `column`,
    alignItems: `center`,
    padding: 20,
    borderRadius: 10,
    shadowColor: Colors.opacityBlackFull,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: .4,
    shadowRadius: 10,

  },

  instructionsTitle: {
    backgroundColor: `transparent`,
    color: Colors.white
  },

  instructionsTitleWrapper: {
    flexDirection: `row`,
    alignItems: `center`
  },

  instructionsTitleIcon: {
    width: 25, height: 25,
    marginRight: 10
  },

  instructionsCopy: {
    marginTop: 10,
    color: Colors.white,
    width: 300,
    textAlign: `center`,
    lineHeight: 20
  },

  pageIndicatorWrapper: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `center`,
    position: `absolute`,
    top: Dimensions.height - 110,
    left: Dimensions.width / 2
  },

  pageIndicator: {
    width: 8, height: 8,
    backgroundColor: Colors.black,
    borderRadius: 10,
    marginRight: 10
  },

  stopExercise: {
    position: `absolute`,
    right: 30,
    top: 30,
    transform: [{translateY: - 90}],
    opacity: 0
  },

  bottomBarWrapperExercise: {
    position: `absolute`,
    left: - 260,
    top: 0,
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    width: Dimensions.width,
    opacity: 0,
    transform: [{translateY: 70}]
  },

  takeNoteIcon: {
    width: 19, height: 19
  },

  overviewIcon: {
    width: 15, height: 11,
    marginRight: 10,
    marginTop: 2
  },

  secundairyButton: {
    backgroundColor: Colors.white
  },

  //-------------------------------{Pagetwo}---------------------------------

  overview: {
    width: Dimensions.width
  },

  overviewContent: {
    width: Dimensions.width,
    marginBottom: 150
  },

  infoBackgroundImage: {
    position: `absolute`,
    zIndex: - 1,
    top: - 320,
    left: 0,
    width: Dimensions.width, height: 505
  },

  overviewHeader: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-between`,
    width: Dimensions.width,
    backgroundColor: Colors.black,
    paddingLeft: 40, paddingRight: 30,
    paddingTop: 30, paddingBottom: 30
  },

  overviewBackText: {
    backgroundColor: `transparent`,
    color: Colors.orange
  },

  titleText: {
    color: Colors.white,
    textAlign: `center`
  },

  overviewContentSubTitle: {
    // borderLeftWidth: 2,
    // borderLeftColor: Colors.orange,
    backgroundColor: `transparent`,
    paddingBottom: 20,
    marginLeft: 40
  },

  overviewExerciseImage: {
    width: 20, height: 20,
    marginRight: 10
  },

  overviewExerciseImageStar: {
    width: 20, height: 20,
    marginLeft: 10
  },

  exerciseTitleWrapper: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-between`
  },

  exerciseRatingWrapper: {
    flexDirection: `row`,
    alignItems: `center`
  },

  exerciseHeader: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-between`
  },

  overviewExerciseCard: {
    backgroundColor: Colors.pureWhite,
    flexDirection: `row`,
    alignItems: `flex-start`,
    justifyContent: `space-between`,
    padding: 25,
    marginTop: 20
  },

  overviewExercisePreviewImage: {
    width: 300, height: 218
  },

  overviewExercisePreviewImageWrapper: {
    borderWidth: 2,
    borderColor: Colors.lightGrey
  },

  overviewExerciseSpecDirectionIcon: {
    width: 23, height: 23,
    marginRight: 10
  },

  overviewExerciseSpecImageWrapper: {
    flexDirection: `row`,
    alignItems: `center`,
    marginTop: 5
  },

  exerciseSpecs: {
    flexDirection: `column`,
    borderRightWidth: 2,
    borderRightColor: Colors.lightGrey,
    paddingRight: 30
  },

  overviewExerciseSpecPlayerIcon: {
    width: 22, height: 23,
    marginRight: 10
  },

  overviewExerciseSpecIntensivityIcon: {
    width: 24, height: 24,
    marginRight: 10
  },

  exerciseCopy: {
    width: 300,
    lineHeight: 20
  },

  exerciseSpec: {
    marginBottom: 20
  },

  exercise: {
    paddingTop: 20, paddingBottom: 40,
    paddingLeft: 40, paddingRight: 40
  },

});

export default DeploymentStyle;
