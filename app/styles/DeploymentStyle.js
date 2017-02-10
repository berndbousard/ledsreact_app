import {StyleSheet} from 'react-native';

import Colors from './Colors';
import Dimensions from './Dimensions';

const DeploymentStyle = StyleSheet.create({
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
    width: Dimensions.width
  },

  minimiseButton: {
    width: 44, height: 44,
    justifyContent: `center`,
    alignItems: `center`,
    transform: [{rotate: `180deg`}]
  },

  minimiseImageIcon: {
    width: 15, height: 9,
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
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: .1,
    shadowRadius: 20
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
  }
});

export default DeploymentStyle;
