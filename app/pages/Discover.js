import React, {Component} from 'react';
import {View} from 'react-native';

import {GeneralStyle} from '../styles';
import {Navigation} from '../components';

class Discover extends Component {

  render() {

    return (
      <View style={GeneralStyle.pageContainer}>

        <Navigation currentPage={this.props.name} />

        <View style={[GeneralStyle.center, {backgroundColor: `blue`}, GeneralStyle.contentContainer]}>
          {/* CONTENT */}
        </View>

      </View>
    );
  }
}

Discover.propTypes = {
  socket: React.PropTypes.object,
  name: React.PropTypes.string
};

export default Discover;
