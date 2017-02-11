import {StyleSheet} from 'react-native';

import Dimensions from './Dimensions';
import Colors from './Colors';

const GeneralStyle = StyleSheet.create({
  center: {
    flex: 1,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`
  },

  pageContainer: {
    flexDirection: `row`,
    backgroundColor: Colors.white
  },

  contentContainer: {
    flex: 6,
    marginLeft: 20,
    padding: 40
  },

  loader: {
    position: `absolute`,
    left: Dimensions.width / 2 - 25,
    top: Dimensions.height / 2 - 25,
    zIndex: 1000,
    width: 50, height: 50
  }
});

export default GeneralStyle;
