import React, {Component} from 'react';
import {TouchableOpacity, Image, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Colors, TextStyles, ButtonStyles} from '../styles';

const primaryButton = props => {

  const {copy, image} = props;

  return (
    <TouchableOpacity>
      <LinearGradient style={[ButtonStyles.primaryButton]} colors={[Colors.orange, Colors.gradientOrange]}>
        <Image source={require(`../assets/png/plusIconButtonWhite.png`)} />
        <Text style={[TextStyles.primaryButton]}>{`${copy}`.toUpperCase()}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default primaryButton;
