import React, {Component} from 'react';
import {View, Text} from 'react-native';

import {GeneralStyle} from '../styles';

export default class Analyse extends Component {

  render() {

    return (
      <View style={[GeneralStyle.center, {backgroundColor: `crimson`}]}>
        <Text> Analyse </Text>
      </View>
    );
  }
}
