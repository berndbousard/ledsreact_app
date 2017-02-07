import React, {Component} from 'react';
import {View} from 'react-native';

import {GeneralStyle, Colors, OnboardingStyle} from '../styles';
import {Navigation} from '../components';

class Onboarding extends Component {

  render() {

    return (
      <View style={GeneralStyle.pageContainer}>

        <View style={[OnboardingStyle.pageContainer]}>
          {/* CONTENT */}
        </View>

      </View>
    );
  }
}

Onboarding.propTypes = {
  socket: React.PropTypes.object,
  name: React.PropTypes.string
};

export default Onboarding;
