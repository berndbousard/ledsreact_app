import {StyleSheet} from 'react-native';

const ComponentStyle = StyleSheet.create({
  direction: {
    backgroundColor: `black`,
    borderRadius: 100,
    shadowColor: `black`,
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
    backgroundColor: `red`,
    marginLeft: 10,
    marginRight: 10
  }
});

export default ComponentStyle;
