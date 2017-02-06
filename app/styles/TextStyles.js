import {StyleSheet} from 'react-native';

import Colors from './Colors';
import Fonts from './Fonts';

const TextStyles = StyleSheet.create({
  title: {
    fontFamily: Fonts.tradeGothic.bold,
    color: Colors.orange,
    textAlign: `center`,
    fontSize: Fonts.size.title,
    letterSpacing: - .5
  },

  mainTitle: {
    fontFamily: Fonts.tradeGothic.bold,
    color: Colors.white,
    textAlign: `center`,
    fontSize: Fonts.size.mainTitle,
    letterSpacing: - .5
  },

  subTitle: {
    fontFamily: Fonts.tradeGothic.bold,
    color: Colors.black,
    textAlign: `left`,
    fontSize: Fonts.size.subtitle,
    letterSpacing: - .3
  },

  copy: {
    fontFamily: Fonts.circular.book,
    color: Colors.black,
    textAlign: `left`,
    fontSize: Fonts.size.copy
  },

  primaryButton: {
    fontFamily: Fonts.tradeGothic.bold,
    color: Colors.white,
    textAlign: `center`,
    fontSize: Fonts.size.button,
    letterSpacing: - .5,
    backgroundColor: `transparent`
  },

  secundairyButton: {
    fontFamily: Fonts.tradeGothic.bold,
    color: Colors.orange,
    textAlign: `center`,
    fontSize: Fonts.size.button,
    letterSpacing: - .5,
    backgroundColor: `transparent`
  },

  batteryPercentage: {
    fontFamily: Fonts.circular.bold,
    color: Colors.black,
    textAlign: `center`,
    fontSize: Fonts.size.directionBatteryLevel
  },


  directionTitle: {
    fontFamily: Fonts.tradeGothic.bold,
    color: Colors.white,
    textAlign: `center`,
    fontSize: Fonts.size.directionTitle
  },

  directionFuncTitle: {
    fontFamily: Fonts.tradeGothic.bold,
    color: Colors.black,
    textAlign: `center`,
    fontSize: Fonts.size.directionFuncTitle
  },

  directionFuncSubTitle: {
    fontFamily: Fonts.tradeGothic.bold,
    color: Colors.black,
    textAlign: `center`,
    fontSize: Fonts.size.directionFuncSubTitle
  },

  directionParamsText: {
    marginTop: 15
  }
});

export default TextStyles;
