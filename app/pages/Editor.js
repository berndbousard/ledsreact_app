import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated, PanResponder, Dimensions} from 'react-native';
import {range} from 'lodash';

import {Direction} from '../components';

const {width: deviceWidth, height: deviceHeight} = Dimensions.get(`window`);

class Editor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      directionAmount: props.directionAmount
    };
  }

  componentWillMount() {
    this.animatedValue = new Animated.ValueXY();
    this.value = {x: 0, y: 0};

    this.animatedValue.addListener(value => this.value = value);
    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true, //Tell iOS that we are allowing the movement
      onMoveShouldSetPanResponderCapture: () => true, // Same here, tell iOS that we allow dragging
      onPanResponderGrant: (e, gestureState) => {
        this.animatedValue.setOffset({x: this.value.x, y: this.value.y});
        this.animatedValue.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event([
        null, {dx: this.animatedValue.x, dy: this.animatedValue.y}
      ]), // Creates a function to handle the movement and set offsets
      onPanResponderRelease: () => {
        this.animatedValue.flattenOffset(); // Flatten the offset so it resets the default positioning
      }
    });
  }

  generateDirections() {
    const {directionAmount = 0} = this.state;

    return (
      <View style={{flexDirection: `row`}}>
        {
          range(directionAmount).map((d, index) => {
            return <Direction width={50} height={50} key={index} />;
          })
        }
      </View>
    );
  }

  render() {

    return (
      <View style={[styles.center, {backgroundColor: `coral`}]}>
        <Text> Editor </Text>
        <View style={{backgroundColor: `white`, width: 500, height: 500, flexDirection: `column`, alignItems: `flex-end`}}>
          {this.generateDirections()}
        </View>
        <Animated.View
          style={
          {
            backgroundColor: `green`,
            width: 50,
            height: 50,
            transform: [
                {translateX: this.animatedValue.x},
                {translateY: this.animatedValue.y}
            ]
          }
          }
            {...this.panResponder.panHandlers}
          />
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
