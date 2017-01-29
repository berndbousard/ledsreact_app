import React, {Component} from 'react';
import {View, Text} from 'react-native';

import {GeneralStyle} from '../styles';

export default class Discover extends Component {

  render() {

    return (
      <View style={[GeneralStyle.center, {backgroundColor: `orange`}]}>
        <Text> Ontdekken </Text>
      </View>
    );
  }
}
