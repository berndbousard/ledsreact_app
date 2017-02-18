import React from 'react';
import {View} from 'react-native';

import {ComponentStyle} from '../styles';

const EditorAction = ({width, height}) => {
  return (
    <View style={[ComponentStyle.direction, {width, height}]}></View>
  );
};

EditorAction.propTypes = {
  selected: React.PropTypes.bool,
  title: React.PropTypes.string,
  width: React.PropTypes.number,
  height: React.PropTypes.number
};

export default EditorAction;
