import {StyleSheet} from 'react-native';

import Colors from './Colors';
import Dimensions from './Dimensions';
import Fonts from './Fonts';

const ComponentStyle = StyleSheet.create({
  editorContainer: {
    backgroundColor: Colors.white,
    width: Dimensions.width,
    height: Dimensions.height
  },

  leftControls: {
    width: 100,
    height: Dimensions.height,
    position: `absolute`,
    flexDirection: `column`,
    justifyContent: `space-between`,
    zIndex: 2
  },

  leftUpperControls: {
    flexDirection: `column`,
    alignItems: `center`,
    marginTop: 25
  },

  leftLowerControls: {
    flexDirection: `column`,
    alignItems: `center`,
    marginBottom: 25
  },

  rightControls: {
    width: 150,
    height: Dimensions.height,
    position: `absolute`,
    right: 0,
    flexDirection: `column`,
    justifyContent: `space-between`,
    alignItems: `flex-end`,
    zIndex: 3
  },

  colorIcon: {
    width: 28,
    height: 28,
    borderRadius: 100,
  },

  brushIcon: {
    width: 28,
    height: 28
  },

  eraserIcon: {
    width: 18,
    height: 28
  },

  undoIcon: {
    width: 18,
    height: 23
  },

  redoIcon: {
    width: 18,
    height: 23
  },

  saveIcon: {
    width: 23,
    height: 28
  },

  deleteIcon: {
    width: 21,
    height: 28
  },

  closeIcon: {
    width: 46,
    height: 46,
    marginRight: 30
  },

  fieldIcon: {
    width: 52,
    height: 52,
    marginLeft: 15
  },

  icon: {
    marginTop: 20,
    marginBottom: 20
  },

  fieldIconWrapper: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    marginRight: 30
  },

  fieldIconText: {
    backgroundColor: Colors.white,
    fontFamily: Fonts.circular.book
  },

  addEditorIcon: {
    width: 51,
    height: 51,
    position: `absolute`,
    left: (Dimensions.width / 2) - 25,
    bottom: 25,
    zIndex: 2
  },

  drawer: {
    position: `absolute`,
    left: Dimensions.width / 2 - (Dimensions.width * (3 / 4)) / 2,
    bottom: 100,
    borderRadius: 5,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: .05,
    shadowRadius: 20,
    width: Dimensions.width * (3 / 4),
    backgroundColor: Colors.pureWhite,
    zIndex: 2,
    padding: 20
  },

  field: {
    position: `absolute`,
    left: 0,
    top: 0,
    width: Dimensions.width,
    height: Dimensions.height,
    opacity: 0.04,
    zIndex: 0,
    backgroundColor: Colors.white
  },

  fieldsDrawer: {
    position: `absolute`,
    left: Dimensions.width / 2 - (Dimensions.width * (9 / 10)) / 2,
    bottom: Dimensions.height / 2 - (Dimensions.height * (9 / 10)) / 2,
    borderRadius: 5,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: .05,
    shadowRadius: 20,
    width: Dimensions.width * (9 / 10),
    height: Dimensions.height * (9 / 10),
    backgroundColor: Colors.white,
    zIndex: 2,
    justifyContent: `center`,
    alignItems: `center`
  },

  fieldsDrawerWrapper: {
    flexDirection: `column`,
    justifyContent: `center`
  },

  fieldsDrawerTitle: {
    marginTop: 25
  },

  fieldsDrawerItem: {
    flexDirection: `column`,
    marginBottom: 50,
    marginLeft: 10,
    marginRight: 10
  },

  fieldsDrawerItemHeader: {
    flexDirection: `row`
  },

  fieldsDrawerItemHeaderImage: {
    width: 25,
    height: 25,
    marginRight: 10
  },

  fielsDrawerItemImageWrapper: {
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: Colors.pureWhite,
    borderWidth: 3,
    borderColor: `transparent`
  },

  fielsDrawerItemImage: {
    width: 236,
    height: 177
  },

  fieldsDrawerScrollviewContent: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    flexWrap: `wrap`,
    alignItems: `flex-start`,
    flex: 1,
    marginTop: 40
  },

  //-------------------------------{ Direction }---------------------------------

  directionDrawerImage: {
    width: 100,
    height: 107
  },

  directionWrapper: {
    justifyContent: `center`,
    alignItems: `center`,
    zIndex: 1,
    position: `absolute`,
    left: (Dimensions.width / 2) - (100 / 2),
    top: (Dimensions.height / 2) - (107 / 2),
    borderRadius: 100,
    width: 120, height: 120
  },

  // directionLink: {
  //   padding: 5
  // },

  directionImage: {
    width: 100,
    height: 107,
  },

  //-------------------------------{Direction Params}---------------------------------

  directionParamsWrapper: {
    marginTop: 10
  },

  directionsParamsDirectionWrapper: {
    flexDirection: `column`,
    justifyContent: `space-between`,
    alignItems: `center`,
    marginBottom: 10
  },

  directionsParamsDirectionMiddleWrapper: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-between`,
    width: 110,
  },

  directionPopupFuncToggle: {
    borderWidth: 1,
    borderColor: Colors.black
  },

  timerIconsWrapper: {
    flexDirection: `row-reverse`,
    alignItems: `center`,
    justifyContent: `space-around`,
    width: 125,
    marginTop: 10
  },

  timerIcon: {
    width: 35, height: 35
  },

  timerText: {
    flex: 3
  },

  colorParamWrapper: {
    flexDirection: `row`,
    justifyContent: `space-around`,
    flexWrap: `wrap`,
    padding: 10
  },

  colorParamSwatch: {
    width: 30, height: 30,
    borderRadius: 20,
    margin: 5
  },

  optionsMenu: {
    position: `absolute`,
    right: 0,
    top: 0,
    width: 275,
    height: Dimensions.height,
    backgroundColor: Colors.pureWhite,
    shadowColor: Colors.black,
    shadowOffset: {width: - 10, height: 0},
    shadowOpacity: .05,
    shadowRadius: 20,
    zIndex: 3,
    flexDirection: `column`,
    alignItems: `center`
  },

  optionsMenuTitle: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.black,
    marginTop: 25
  },

  optionsMenusubTitle: {
    textAlign: `center`,
    marginTop: 20
  },

  directionArrowsWrapper: {
    marginTop: 10,
    width: 200,
    justifyContent: `center`,
    alignItems: `center`,
  },

  directionArrow: {
    justifyContent: `center`,
    alignItems: `center`,
    width: 44, height: 44,
    borderRadius: 100
  },

  directionArrowIcon: {
    width: 15, height: 10
  },

  directionArrowIconUp: {
    marginBottom: 3,
    transform: [{rotate: `180deg`}]
  },

  directionArrowIconDown: {
    marginTop: 3,
  },

  directionArrowIconLeft: {
    marginRight: 3,
    transform: [{rotate: `90deg`}]
  },

  directionArrowIconRight: {
    marginLeft: 2,
    transform: [{rotate: `-90deg`}]
  },

  directionArrowMiddle: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-between`,
    width: 150,
    marginTop: 10, marginBottom: 10
  },

  optionsMenuRichting: {
    paddingBottom: 25,
    borderBottomWidth: 2,
    borderBottomColor: Colors.white,
    alignItems: `center`
  },

  optionsMenuDirectionLower: {
    backgroundColor: Colors.white,
    width: 275,
    flex: 1
  },

  directionColorsWrapper: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    marginTop: 15
  },

  directionColor: {
    width: 44, height: 44,
    borderRadius: 100,
    marginLeft: 5, marginRight: 5
  },

  delayButtons: {
    flexDirection: `row`,
    alignItems: `center`,
    marginTop: 15
    // justifyContent: `space-between`
  },

  delayButton: {
    borderWidth: 2,
    borderColor: Colors.black,
    width: 44, height: 44,
    justifyContent: `center`,
    alignItems: `center`,
    borderRadius: 100
  },

  delayMinusIcon: {
    width: 15, height: 3
  },

  delayPlusIcon: {
    width: 15, height: 15
  },

  delayCopy: {
    marginRight: 10, marginLeft: 10,
    textAlign: `center`,
    width: 50
  },

  oplichtenWrapper: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`
  },

  oplichtenButton: {
    padding: 15,
    borderColor: Colors.black,
    borderWidth: 2,
    borderRadius: 2,
    margin: 10
  },

  form: {
    position: `relative`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `center`,
    width: Dimensions.width,
    height: Dimensions.height
  },

  formHeader: {
    flexDirection: `column`,
    alignItems: `center`,
    width: Dimensions.width,
    marginTop: 20
  },

  formBackWrapper: {
    flexDirection: `row`,
    alignItems: `center`,
    backgroundColor: `transparent`,
    position: `absolute`,
    top: 45,
    left: 30
  },

  formBackIcon: {
    width: 16, height: 13,
    marginRight: 10
  },

  formBackText: {
    color: Colors.orange
  },

  formHeaderImage: {
    position: `absolute`,
    top: 0,
    left: 0,
    width: Dimensions.width, height: 224,
    zIndex: - 1
  },

  formTitle: {
    backgroundColor: `transparent`
  },

  formTitleCopy: {
    backgroundColor: `transparent`,
    color: Colors.white,
    textAlign: `center`,
    width: 300,
    lineHeight: 20,
    marginTop: 5
  },

  formCloseIconWrapper: {
    borderWidth: 2,
    borderColor: Colors.white,
    width: 44, height: 44,
    borderRadius: 3,
    justifyContent: `center`,
    alignItems: `center`,
    position: `absolute`,
    right: 30,
    top: 30
  },

  formCloseIcon: {
    width: 16, height: 16
  },

  pageIndicatorWrapper: {
    marginTop: 50,
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-between`,
    width: 40
  },

  pageIndicator: {
    width: 7, height: 7,
    backgroundColor: Colors.white,
    borderRadius: 10
  },

  formPageOneContent: {
    marginTop: 110,
    width: Dimensions.width
  },

  naamInputIcon: {
    width: 28, height: 16,
    marginRight: 10
  },

  naamLabelWrapper: {
    flexDirection: `row`,
    alignItems: `center`
  },

  naamWrapper: {
    flexDirection: `column`,
    alignItems: `center`
  },

  naamInputWrapper: {
    marginTop: 15,
    borderWidth: 2,
    borderColor: Colors.black,
    borderRadius: 50,
    paddingLeft: 15, paddingRight: 15
  },

  naamInput: {
    width: 350, height: 50
  },

  descWrapper: {
    marginTop: 50
  },

  descInputIcon: {
    width: 20, height: 19,
    marginRight: 10
  },

  descInput: {
    minHeight: 150, width: 350
  },

  descInputWrapper: {
    borderRadius: 10,
    padding: 10
  },

  primaryButtonFormImage: {
    width: 16, height: 13,
    marginLeft: 10
  },

  barBottomWrapper: {
    position: `absolute`,
    padding: 25,
    bottom: 0,
    backgroundColor: Colors.lightGrey,
    width: Dimensions.width,
    flexDirection: `column`,
    alignItems: `center`
  },

  buttonsWrapper: {
    position: `relative`,
    flexDirection: `row`,
    justifyContent: `center`,
    alignItems: `center`,
    marginBottom: 50,
    width: 180
  },

  secundairyButtonInForm: {
    width: 16, height: 13,
    marginRight: 10
  },

  formButtonPrimaryWrapper: {
    justifyContent: `center`
  },

  primaryButtonInForm: {
    position: `absolute`,
    top: 0,
    right: 0,
    zIndex: 5
  },

  secundairyButtonInFormWrapper: {
    position: `absolute`,
    top: 0,
    left: 0,
    opacity: 0
  },

  formContentWrapper: {
    flexDirection: `row`,
  }
});

export default ComponentStyle;
