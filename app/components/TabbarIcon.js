import React from 'react';
import {Text} from 'react-native';

const TabbarIcon = ({selected, title}) => {
  return (
    <Text style={{color: selected ? `red` : `black`}}>{title}</Text>
  );
};

TabbarIcon.propTypes = {
  selected: React.PropTypes.bool,
  title: React.PropTypes.string
};

export default TabbarIcon;
