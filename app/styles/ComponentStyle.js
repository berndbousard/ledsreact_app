import {StyleSheet} from 'react-native';

import Colors from './Colors';

const ComponentStyle = StyleSheet.create({
  direction: {
    backgroundColor: Colors.black,
    borderRadius: 100,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowRadius: 5,
    shadowOpacity: .1,
    marginLeft: 5,
    marginRight: 5
  },

  button: {
    width: 45,
    height: 45,
    backgroundColor: Colors.orange,
    marginLeft: 10,
    marginRight: 10
  }
});

export default ComponentStyle;
