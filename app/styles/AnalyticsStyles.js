import {StyleSheet} from 'react-native';

import Colors from './Colors';
import Dimensions from './Dimensions';

const AnalyticsStyles = StyleSheet.create({

  //dimensions voor window.innerwidth = Dimensions.height
  //colors alle kleuren = Color.white


  //transform -> transform:[{translateX:50},{translateY:40}]

  secondNav: {
    flexDirection: `row`,
    justifyContent: `flex-start`,
    paddingTop: 30, paddingBottom: 30,
    paddingLeft: 20, paddingRight: 20,
    marginRight: - 20,
    alignItems: `center`,
    width: Dimensions.width - 135,
  },

  navItems: {
    marginLeft: 30,
  },

  navBorder: {
    height: 2,
    width: 100,
    position: `absolute`,
    top: 65,
    left: 330,
  },

  controlBar: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    // backgroundColor: `blue`,
    width: Dimensions.width - 135,
    height: 100,
    paddingTop: 20, paddingBottom: 20,
    paddingLeft: 20, paddingRight: 20,
    borderWidth: 2,
    borderColor: Colors.borderforGreyBackground
  },

  monthControls: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    width: 230,
    height: 50,
    marginLeft: 30,
  },

  backButton: {
    transform: [{rotate: `90deg`}, {scale: 0.4}, {translateX: - 3}],
  },

  nextButton: {
    transform: [{rotate: `-90deg`}, {scale: 0.4}, {translateX: + 3}],
  },

  dropDownBox: {
    width: 200,
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 2,
    borderColor: Colors.black,
    borderRadius: 50,
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
  },

  dropDownArrow: {
    transform: [{scale: 0.5}, {translateX: + 3}],
  },

  dropDown: {
    flexDirection: `row`,
    justifyContent: `center`,
    alignItems: `center`,
    marginRight: 10,
  },

  label: {
    marginRight: 10,
    color: `white`,
  },

  leftje: {
    marginLeft: 50
  },

  title: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.borderforGreyBackground,
    width: Dimensions.width - 225,
  },

  backgroundStats: {
    backgroundColor: Colors.lightGrey,
    borderBottomColor: Colors.borderforGreyBackground,
    borderBottomWidth: 2,
    paddingTop: 30,
    paddingBottom: 30
  },

  item: {
    flexDirection: `column`,
    justifyContent: `center`,
    alignItems: `center`,
    marginRight: 50,
  },

  itemContent: {
    width: 140,
    height: 140,
    backgroundColor: Colors.black,
    borderRadius: 140,
    flexDirection: `row`,
    justifyContent: `center`,
    alignItems: `center`,
  },

  itemImage: {
    transform: [{scale: 0.36}],
  },

  horizontalScroll: {
    width: Dimensions.width - 135,
    marginLeft: - 50,
    paddingTop: 30,
    paddingLeft: 45,
    paddingBottom: 10,

  },

  analyseTitel: {
    width: 150,
    textAlign: `center`,
  },

  graph: {

    // backgroundColor: `blue`,
  },

  graphTypeNav: {
    flexDirection: `row`,
    justifyContent: `flex-start`,
    marginLeft: 50,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 40,
    borderBottomColor: Colors.opacityBlack,
    borderBottomWidth: 2,
    width: Dimensions.width - 220,
    // backgroundColor: `blue`,
  },

  graphTitleIndicator: {
    borderBottomColor: Colors.orange,
    borderBottomWidth: 2,
    position: `absolute`,
    width: 75,
    bottom: - 2,
  },

  graphTitle: {
    marginLeft: 50,
    color: Colors.opacityBlack,
  },

  lineGraph: {
    marginTop: 20,
  },

  lineGraphImage: {
    marginLeft: - 50,
    width: 802,
    height: 332,
  },

  topGraph: {
    flexDirection: `row`,
  },

  yAS: {
    marginLeft: 20,
    marginTop: 40,
  },

  xASWrapper: {
    marginTop: 25,
    flexDirection: `row`,
    marginLeft: - 100,
  },

  xAS: {
    marginLeft: 150,
  },


  colorIndicator: {
    width: 32,
    height: 32,
    borderRadius: 32,
    borderColor: Colors.borderforGreyBackground,
    marginRight: 10,
  },


  legendeItem: {
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `center`,
    width: 200,

  },

  legende: {
    marginTop: 30,
    paddingTop: 20,
    width: Dimensions.width - 220,
    borderTopColor: Colors.borderforGreyBackground,
    borderTopWidth: 2,
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `flex-start`,

  },

  greyBackground: {
    marginTop: 50,
    backgroundColor: Colors.lightGrey,
    paddingBottom: 40,
    marginBottom: 20

  },

  graphTypeNavFix: {
    marginTop: 20,
  },

  goalListItem: {
    marginTop: 30,
    width: Dimensions.width - 220,
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: Colors.pureWhite,
    marginLeft: 50,
    borderRadius: 5,
    borderColor: Colors.borderforGreyBackground,
    borderWidth: 2,
    shadowColor: Colors.black,
    shadowOpacity: 0.06,
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
  },

  goalListItemTodo: {
    flexDirection: `column`,
    marginLeft: 40,
  },

  goalListItemIndex: {
    flexDirection: `row`,
    alignItems: `center`,
  },

  removeButtonIcon: {
    transform: [{scale: 0.4}, {translateX: - 54}]
  },

  removeButton: {
    width: 45,
    height: 45,
  },


  //---------

  addGoals: {
    width: 180,
    marginLeft: 50,
    marginTop: 30,
    shadowColor: Colors.orange,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 5,
  },

  exercisesContainer: {
    backgroundColor: `blue`
  }


});

export default AnalyticsStyles;
