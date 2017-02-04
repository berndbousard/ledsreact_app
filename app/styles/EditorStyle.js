import {StyleSheet} from 'react-native';
import Dimensions from './Dimensions';

import Colors from './Colors';

const ComponentStyle = StyleSheet.create({
  editorContainer: {
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
    justifyContent: `space-between`
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
    alignItems: `flex-end`
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
    backgroundColor: Colors.white
  },

  addEditorIcon: {
    width: 51,
    height: 51,
    position: `absolute`,
    left: (Dimensions.width / 2) - 25,
    bottom: 25
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
    backgroundColor: Colors.pureWhite
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
  }
});

export default ComponentStyle;
