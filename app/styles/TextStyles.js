import {StyleSheet} from 'react-native';

import Colors from './Colors';
import Fonts from './Fonts';

const TextStyles = StyleSheet.create({
  title: {
    fontFamily: Fonts.tradeGothic.bold,
    color: Colors.orange,
    textAlign: `center`,
    fontSize: Fonts.size.title
  },

  subTitle: {
    fontFamily: Fonts.tradeGothic.bold,
    color: Colors.black,
    textAlign: `center`,
    fontSize: Fonts.size.subtitle
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
