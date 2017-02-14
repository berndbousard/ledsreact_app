import {StyleSheet} from 'react-native';

import Colors from './Colors';
import Dimensions from './Dimensions';

const MyExercisesStyle = StyleSheet.create({
  pageContainer: {

    flexDirection: `column`,
    alignItems: `center`,
    padding: 0
  },

  secondNav: {
    flexDirection: `row`,
    justifyContent: `space-around`,
    paddingTop: 30, paddingBottom: 30,
    paddingLeft: 35, paddingRight: 20,
    alignItems: `center`,
    width: Dimensions.width - 105,
    transform: [{translateX: - 14}]
  },

  secondNavText: {
    padding: 2
  },

  blackButton: {
    backgroundColor: Colors.black,
    borderRadius: 3
  },

  blackButtonIcon: {
    width: 14, height: 14,
    marginRight: 10
  },

  filterBar: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-around`,
    backgroundColor: Colors.lightGrey,
    width: Dimensions.width - 110,
    transform: [{translateX: - 14}],
    paddingTop: 20, paddingBottom: 20,
    paddingLeft: 20, paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderforGreyBackground
  },

  filterSearchWrapper: {
    flexDirection: `row`,
    alignItems: `center`,
    borderWidth: 2,
    borderColor: Colors.black,
    paddingTop: 18, paddingBottom: 18,
    paddingLeft: 25, paddingRight: 25,
    borderRadius: 100
  },

  filterSearchInput: {
    width: 300,
    padding: 2
  },

  filterSearchIcon: {
    width: 15, height: 15
  },

  sortWrapper: {
    flexDirection: `row`,
    alignItems: `center`
  },

  sortTitle: {
    marginRight: 10
  },

  sortIcon: {
    width: 8, height: 5,
    marginLeft: 4
  },

  //-------------------------------{Exercises}---------------------------------
  exercisesContainer: {
    flexDirection: `row`,
    flexWrap: `wrap`,
    justifyContent: `flex-start`,
    width: Dimensions.width - 175,
    transform: [{translateX: - 10}],
    padding: 20,
  }
});

export default MyExercisesStyle;
