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
    zIndex: 0
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

  directionWrapper: {
    justifyContent: `center`,
    alignItems: `center`,
    zIndex: 1,
    position: `absolute`,
    left: (Dimensions.width / 2) - (100 / 2),
    top: (Dimensions.height / 2) - (107 / 2),
    width: 125
  },

  directionLink: {
    justifyContent: `center`,
    alignItems: `center`
  },

  directionImage: {
    width: 100,
    height: 107
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

  directionDrawerImage: {
    width: 100,
    height: 107
  },

  directionPopup: {
    flexDirection: `column`,
    alignItems: `center`,
    width: 125,
    backgroundColor: Colors.pureWhite,
    borderRadius: 4,
    paddingBottom: 10
  },

  directionPopupHeader: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    width: 125,
    padding: 10
  },

  directionPopupHeaderTitle: {
    flex: 1
  },

  directionPopupHeaderCloseIcon: {
    width: 20, height: 20
  },

  directionPopupFuncWrapper: {
    flexDirection: `column`,
    alignItems: `center`
  },

  directionPopupFuncTitle: {
    marginTop: 10
  },

  directionPopupFuncToggle: {
    borderWidth: 1,
    borderColor: Colors.black
  },

  timerIconsWrapper: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-around`,
    width: 125,
    marginTop: 10
  },

  timerIcon: {
    width: 30, height: 30,
    // transform: [{scale: .2}]
  },

  timerText: {
    flex: 3
  },

  directionsParamsWrapper: {
    marginTop: 10,
    flexDirection: `column`,
    justifyContent: `center`,
    alignItems: `center`,
    marginBottom: 10
  },

  directionsParamsMiddleWrapper: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-around`,
    width: 125
  },

  colorParamWrapper: {
    flexDirection: `row`,
    justifyContent: `space-around`,
    flexWrap: `wrap`
  },

  colorParamSwatch: {
    width: 30, height: 30,
    margin: 5,
    borderRadius: 20
  }
});

export default ComponentStyle;
