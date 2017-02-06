import {StyleSheet} from 'react-native';

import Colors from './Colors';
import Dimensions from './Dimensions';
import Fonts from './Fonts';

const ExerciseDetailStyle = StyleSheet.create({

  // pageContainer: {
  //   backgroundColor: Colors.lightBlack
  // },
  headerWrapper: {
    backgroundColor: Colors.black,
    width: Dimensions.width,
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    paddingLeft: 40, paddingRight: 40,
    paddingTop: 25, paddingBottom: 25
  },

  backButtonWrapper: {
    flexDirection: `row`,
    alignItems: `center`
  },

  backButtonText: {
    textAlign: `left`,
    marginLeft: 10
  },

  backButtonIcon: {
    width: 16, height: 13
  },

  primaryButtonWrapper: {
    shadowColor: Colors.orange,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: .3,
    shadowRadius: 20
  },

  buttonWrapper: {
    padding: 20
  },

  primaryButtonImage: {
    width: 12, height: 16
  },

  primaryButtonText: {
    marginLeft: 10,
  },

  headerButtonsWrapper: {
    flexDirection: `row`,
    alignItems: `center`
  },

  headerSmallButtonWrapper: {
    borderWidth: 2,
    borderColor: Colors.white,
    padding: 14,
    borderRadius: 3,
    marginRight: 20
  },

  headerAddIcon: {
    width: 17, height: 17
  },

  headerShareIcon: {
    width: 18, height: 22
  },

  headerShareWrapper: {
    paddingLeft: 14, paddingRight: 14,
    paddingTop: 11, paddingBottom: 11
  },

  headerEditIcon: {
    width: 25, height: 25
  },

  headerEditWrapper: {
    paddingLeft: 10, paddingRight: 10,
    paddingTop: 10, paddingBottom: 10
  },

  headerUploadIcon: {
    width: 26, height: 21
  },

  headerUploadWrapper: {
    paddingLeft: 12, paddingRight: 12,
    paddingTop: 12, paddingBottom: 12
  },

  scrollContent: {
    position: `relative`,
    flexDirection: `row`,
    justifyContent: `center`
  },

  background: {
    position: `absolute`,
    top: 0, left: 0,
    width: Dimensions.width, height: 505
  },

  card: {
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`,
    width: 935, //Moet weg,
    marginTop: 30
  },

  cardHeader: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    width: 935 //Moet weg
  },

  cardTitle: {
    flexDirection: `row`,
    alignItems: `center`
  },

  cardTitleIcon: {
    width: 34, height: 36,
    marginRight: 10
  },

  seperator: {
    width: 56, height: 3,
    backgroundColor: Colors.white
  },

  titleText: {
    backgroundColor: `transparent`
  },

  titleSubText: {
    backgroundColor: `transparent`,
    color: Colors.white
  },

  ratingWrapper: {
    flexDirection: `row`,
    justifyContent: `center`,
    alignItems: `center`
  },

  ratingTitle: {
    backgroundColor: `transparent`,
    color: Colors.white
  },

  starWrapper: {
    flexDirection: `row`,
    justifyContent: `center`,
    alignItems: `center`,
    marginLeft: 10
  },

  starIcon: {
    width: 19, height: 19
  }
});

export default ExerciseDetailStyle;
