import {StyleSheet} from 'react-native';

import Colors from './Colors';
import Dimensions from './Dimensions';

const OnboardingStyle = StyleSheet.create({
  pageContainer: {
    position: `relative`,
    backgroundColor: Colors.black,
    flexDirection: `column`,
    flex: 1
  },

  slideText: {
    flexDirection: `column`,
    alignItems: `center`,
    marginTop: 50,
    zIndex: 2
  },

  copy: {
    color: Colors.white,
    width: 400,
    lineHeight: 30,
    textAlign: `center`,
    marginTop: 10,
    fontSize: 16
  },

  buttonWrapper: {
    position: `absolute`,
    flexDirection: `row`,
    bottom: 50,
    left: Dimensions.width / 2 - 160
  },

  primaryButtonImage: {
    width: 23, height: 20,
    marginRight: 10
  },

  secundairyButton: {
    borderColor: Colors.white,
    marginRight: 50
  },

  secundairyButtonText: {
    color: Colors.white
  },

  secundairyButtonImage: {
    width: 20, height: 20,
    marginRight: 15
  },

  slide: {
    position: `relative`,
    width: Dimensions.width, height: Dimensions.height
  },

  slideImage: {
    position: `absolute`,
    width: 445, height: 768,
    opacity: .03,
    zIndex: 1
  },

  slideWoman: {
    bottom: 0, right: 0,
  },

  slideMan: {
    width: 327, height: 768
  },

  slideMan2: {
    width: 701, height: 768,
    right: 0, top: 0
  },

  dot: {
    marginBottom: 125
  },

  direction1: {
    marginTop: 25,
    width: 277, height: 354
  },

  direction2: {
    marginTop: 75,
    width: 405, height: 292
  },

  direction3: {
    marginTop: 75,
    transform: [{translateX: - 30}],
    width: 347, height: 329
  }
});

export default OnboardingStyle;
