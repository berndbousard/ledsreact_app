import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

import {ComponentStyle} from '../styles';

const Navigation = ({currentPage}) => {

  return (
    <View style={ComponentStyle.navigation}>
      <TouchableOpacity style={ComponentStyle.navigationLink} activeOpacity={.75}>
        <Text style={[ComponentStyle.navigationItem, currentPage === `myDirections` ? ComponentStyle.activeNavigationLink : ``]}>Mijn Directions</Text>
      </TouchableOpacity>

      <TouchableOpacity style={ComponentStyle.navigationLink} activeOpacity={.75}>
        <Text style={ComponentStyle.navigationItem}>Ontdek</Text>
      </TouchableOpacity>
    </View>
  );
};

Navigation.propTypes = {
  selected: React.PropTypes.bool,
  title: React.PropTypes.string,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  currentPage: React.PropTypes.string
};

export default Navigation;
