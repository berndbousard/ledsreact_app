import {StyleSheet} from 'react-native';

import Dimensions from './Dimensions';

const LoginStyle = StyleSheet.create({


  headerText: {
    marginTop: 20
  },

  input: {
    marginTop: 90,
    height: 500,
  },

  barBottomWrapper: {
    width: Dimensions.width,
    flexDirection: `row`,
    justifyContent: `center`,
    alignItems: `center`,
  },
  primaryButtonInForm: {
    position: `relative`
  },
  primaryButtonFormImage: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginLeft: 0
  }

});

export default LoginStyle;
