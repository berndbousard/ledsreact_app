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
    flex: 1,
    backgroundColor: Colors.white
  },

  contentContainer: {
    flex: 6,
    marginLeft: 20,
    padding: 40
  }
});

export default GeneralStyle;
