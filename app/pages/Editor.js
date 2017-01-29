import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Editor extends Component {

  render() {

    const {directionAmount = 0} = this.props;

    return (
      <View style={[styles.center, {backgroundColor: `coral`}]}>
        <Text> Editor </Text>
        <Text> {`Je kan ${directionAmount} Directions plaatsen`} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`
  }
});

Editor.propTypes = {
  directionAmount: React.PropTypes.number
};

export default Editor;
