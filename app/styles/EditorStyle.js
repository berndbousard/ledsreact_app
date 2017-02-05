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

  overlay: {
    position: `absolute`,
    flexDirection: `row`,
    justifyContent: `space-between`
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
    height: 300,
    backgroundColor: Colors.pureWhite,
    zIndex: 2
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
    backgroundColor: Colors.pureWhite,
    zIndex: 2
  },

  directionWrapper: {
    position: `absolute`,
    justifyContent: `center`,
    alignItems: `center`
  },

  directionLink: {
    justifyContent: `center`,
    alignItems: `center`
  },

  directionImage: {
    width: 100,
    height: 107
  },

  fieldsDrawerTitle: {
    color: Colors.orange,
    fontSize: Fonts.size.title
  }
});

export default ComponentStyle;