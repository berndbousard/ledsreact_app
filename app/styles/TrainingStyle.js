import {StyleSheet} from 'react-native';

import Colors from './Colors';
import Dimensions from './Dimensions';

const TrainingStyle = StyleSheet.create({

  contentBlock: {
    marginTop: - 41,
    marginLeft: - 50,
    width: Dimensions.width,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    paddingBottom: 0,
  },

  secondeNav: {
    paddingLeft: 25,
    width: Dimensions.width - 107,
    justifyContent: `space-between`
  },


  navBorder: {
    marginLeft: - 28,
    top: 35,
  },


  secondeNavWrap: {
    width: 300,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    position: `relative`,
  },

  filter: {
    width: Dimensions.width - 100,
    marginLeft: 11,
  },

  createTraining: {
    marginRight: 23,
  },

  trainersContent: {
    width: Dimensions.width,
    marginLeft: 10,
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 50,
    paddingBottom: 30
  },

  weekIndicator: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    width: Dimensions.width - 225,
  },

  ruler: {
    width: 700,
    height: 2,
    backgroundColor: Colors.orange
  },

  weekIndicatorNotActive: {
    opacity: 0.3
  }

});

export default TrainingStyle;
