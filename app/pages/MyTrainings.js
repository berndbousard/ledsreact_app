import React, {Component} from 'react';
import {View} from 'react-native';

import {GeneralStyle} from '../styles';
import {Navigation} from '../components';

class MyTrainings extends Component {

  constructor(props) {
    super(props);

    this.props = props;
  }

  render() {

    console.log(`render`);

    return (
      <View style={GeneralStyle.pageContainer}>

        <Navigation currentPage={this.props.name} />

        <View style={[GeneralStyle.center, {backgroundColor: `green`}, GeneralStyle.contentContainer]}>
          {/* CONTENT */}
        </View>

      </View>
    );
  }
}

MyTrainings.propTypes = {
  socket: React.PropTypes.object,
  name: React.PropTypes.string
};

export default MyTrainings;
