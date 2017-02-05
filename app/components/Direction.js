import React, {Component} from 'react';
import {Animated, PanResponder, TouchableWithoutFeedback, Image} from 'react-native';

import {EditorStyle} from '../styles';

class Direction extends Component {

  state = {
    position: new Animated.ValueXY(),
    scale: new Animated.Value(1),
    index: this.props.index
  }

  componentWillMount() {
    this.dragHandler = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true, //Allow movement to the view we'll attach this panresponder to
      onMoveShouldSetPanResponderCapture: () => true, //Same as above but for dragging

      onPanResponderGrant: () => { //gets invoked when we got access to the movement of the element. Perfect for initial values.
        const {position, scale} = this.state;

        position.setOffset({x: position.x._value, y: position.y._value}); //To prevent resetting to initial value.
        position.setValue({x: 0, y: 0});
        Animated.spring(scale, {toValue: 1.25, friction: 3}).start();
      },

      onPanResponderMove: Animated.event([ //gets invoked when we move the element. Perfect for calculating the next value.
        null, {dx: this.state.position.x, dy: this.state.position.y}
      ]),

      onPanResponderRelease: () => { //Gets invoked when we release the view.
        const {position, scale} = this.state;
        position.flattenOffset();
        Animated.spring(scale, {toValue: 1, friction: 3}).start();
      }
    });
  }

  render() {

    const {position, scale} = this.state;
    const [translateX, translateY] = [position.x, position.y];

    return (
      <Animated.View {...this.dragHandler.panHandlers} style={[EditorStyle.directionWrapper, {transform: [{translateX}, {translateY}, {rotate: `0deg`}, {scale: scale}]}]}>
        <TouchableWithoutFeedback style={[EditorStyle.directionLink]} onPress={() => console.log(`test`)}>
          <Image style={[EditorStyle.directionImage]} source={require(`../assets/png/direction.png`)} />
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }


}

Direction.propTypes = {
  selected: React.PropTypes.bool,
  title: React.PropTypes.string,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  index: React.PropTypes.number
};

export default Direction;

// resource:  http://mindthecode.com/getting-started-with-the-panresponder-in-react-native/
