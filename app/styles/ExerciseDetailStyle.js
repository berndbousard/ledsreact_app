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
    paddingTop: 25, paddingBottom: 25,
    borderBottomWidth: 2,
    borderBottomColor: Colors.opacityWhite
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
    width: 19, height: 19,
    marginLeft: 5
  },

  cardContent: {
    backgroundColor: Colors.pureWhite,
    marginTop: 35,
    padding: 40,
    width: 935, //Moet weg
    borderRadius: 3
  },

  schemaWrapper: {
    position: `relative`
  },

  schemaIconWrapper: {
    position: `absolute`,
    top: 10, right: 10,
    padding: 14,
    borderWidth: 2,
    borderColor: Colors.orange,
    borderRadius: 100
  },

  schemaIcon: {
    width: 28, height: 28
  },

  schemaWrapperSchema: {
    width: 510, height: 372,
    borderWidth: 2,
    borderColor: Colors.lightGrey,
    borderRadius: 4
  },

  authorWrapper: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `flex-start`,
    borderBottomWidth: 2,
    borderBottomColor: Colors.lightGrey,
    paddingBottom: 20,
    width: 300 //Moet weg
  },

  authorText: {
    fontSize: 20,
    color: Colors.orange
  },

  cardContentUpper: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`
  },

  authorImage: {
    width: 48, height: 48,
    marginRight: 20
  },

  cardMainSpecsWrapper: {
    flexDirection: `column`,
    alignItems: `flex-start`,
    width: 300 //Moet weg
  },

  sportIcon: {
    width: 20, height: 20,
    marginRight: 10
  },

  reactionIcon: {
    width: 24, height: 17,
    marginRight: 10
  },

  directionIcon: {
    width: 20, height: 21,
    marginRight: 10
  },

  miniSpecWrapper: {
    flexDirection: `row`,
    alignItems: `center`
  },

  miniSpecTitle: {
    marginTop: 5,
    marginBottom: 5
  },

  miniSpecItem: {
    marginTop: 20
  },

  //-------------------------------{LowerCard}---------------------------------
  cardContentLower: {
    marginTop: 50,
    flexDirection: `row`,
    alignItems: `flex-start`
  },

  extraCircle: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: Colors.black
  },

  extraPotIcon: {
    width: 24, height: 25,
    marginLeft: 10,
    marginRight: 10
  },

  extraConeIcon: {
    width: 19, height: 25,
    marginLeft: 10,
    marginRight: 10
  },

  extraPoleIcon: {
    width: 18, height: 25,
    marginLeft: 10,
    marginRight: 10
  },

  extraItem: {
    flexDirection: `row`,
    alignItems: `center`,
    marginTop: 15
  },

  textCopy: {
    lineHeight: 25,
    width: 500,
    marginTop: 7
  },

  descWrapper: {
    marginLeft: 50,
    borderLeftWidth: 2,
    borderLeftColor: Colors.lightGrey,
    paddingLeft: 50
  },

  textCopyAnalyse: {
    width: 350,
    lineHeight: 25,
    marginTop: 7
  },

  primaryButtonImage2: {
    width: 21, height: 12
  },

  AnalyticsWrapper: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-between`,
    width: 930,
    padding: 40
  },

  analyseButtonWrapper: {
    width: 200,
    marginTop: 25
  },

  analyticsIconsWrapper: {
    flexDirection: `row`,
    alignItems: `center`,
    marginTop: 25
  },

  analyticsItem: {
    flexDirection: `column`,
    // justifyContent: `center`,
    alignItems: `center`,
    marginLeft: 40
  },

  shoe: {
    width: 68, height: 59
  },

  eye: {
    width: 66, height: 48
  },

  heart: {
    width: 65, height: 58
  },

  analyticsItemBack: {
    backgroundColor: Colors.black,
    borderRadius: 125,
    width: 125, height: 125,
    justifyContent: `center`,
    alignItems: `center`,
    marginBottom: 20
  },

  improvement: {
    color: Colors.green
  },

  commentsWrapper: {
    padding: 40,
    width: 930
  },

  comment: {
    marginTop: 25,
    backgroundColor: Colors.pureWhite,
    padding: 25,
    borderRadius: 4
  },

  commentTitle: {
    textAlign: `left`,
    marginTop: 20
  },

  commentTextWrapper: {
    flexDirection: `row`
  },

  commentImage: {
    width: 48, height: 48,
    marginRight: 25
  },

  commentText: {
    width: 600,
    marginTop: 5,
    lineHeight: 20
  },

  commentInputWrapper: {
    padding: 40
  },

  textInput: {
    marginTop: 10,
    width: 860, height: 50,
    backgroundColor: Colors.pureWhite,
    paddingLeft: 20,
    borderRadius: 4
  },

  primaryButtonImage3: {
    width: 15, height: 15
  },

  analyseButtonWrapperEnd: {
    marginTop: - 10,
    marginLeft: 670,
    marginBottom: 50
  }
});

export default ExerciseDetailStyle;
