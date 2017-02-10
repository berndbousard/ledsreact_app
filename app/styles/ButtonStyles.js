import {StyleSheet} from 'react-native';

import Colors from './Colors';

const ButtonStyles = StyleSheet.create({
  primaryButton: {
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    borderRadius: 2,
    shadowColor: Colors.orange,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: .3,
    shadowRadius: 5,
  },

  secundairyButton: {
    borderWidth: 2,
    borderColor: Colors.orange,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 13,
    paddingBottom: 13,
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    borderRadius: 2
  },

  squareButton: {
    flexDirection: `row`,
    justifyContent: `center`,
    alignItems: `center`,
    width: 44,
    height: 44,
    borderRadius: 2,
    shadowColor: Colors.orange,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
  }


});

export default ButtonStyles;
