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
  },

  navigation: {
    backgroundColor: Colors.black,
    flexDirection: `column`,
    justifyContent: `space-between`,
    alignItems: `center`,
    flex: 1
  },

  navigationLink: {
    alignSelf: `stretch`,
  },

  mainNatigation: {
    alignSelf: `stretch`,
  },

  subNatigation: {
    alignSelf: `stretch`,
  },

  navigationItem: {
    color: `white`,
    textAlign: `center`,
    backgroundColor: `rgba(255, 255, 255, 0.15)`,
    paddingTop: 20,
    paddingBottom: 20
  },

  activeNavigationLink: {
    color: Colors.orange
  }
});

export default ComponentStyle;
