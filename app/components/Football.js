import React, {Component} from 'react';
import {Animated, PanResponder, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {EditorStyle} from '../styles';

class Football extends Component {

  state = {
    position: new Animated.ValueXY(),
    scale: new Animated.Value(1)
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

  componentDidMount() {
  }

  render() {

    const {position, scale} = this.state;
    const [translateX, translateY] = [position.x, position.y];

    return (
      <Animated.View {...this.dragHandler.panHandlers} style={[EditorStyle.directionWrapper, {transform: [{translateX}, {translateY}, {scale}]}]}>
        <TouchableOpacity style={[EditorStyle.directionLink]}>
          <Animatable.Image ref='direction' animation='bounceIn' easing='ease-out' style={[EditorStyle.directionImage]} source={require(`../assets/png/football.png`)} />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

Football.propTypes = {
  setCurrentEditorDirectionIndex: React.PropTypes.func
};

export default Football;

// resource:  http://mindthecode.com/getting-started-with-the-panresponder-in-react-native/
