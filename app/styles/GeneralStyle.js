import {StyleSheet} from 'react-native';

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
    flex: 1
  },

  contentContainer: {
    flex: 6
  }
});

export default GeneralStyle;
