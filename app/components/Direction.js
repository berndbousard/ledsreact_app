import React, {Component} from 'react';
import {Animated, PanResponder, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {EditorStyle, Colors} from '../styles';

class Direction extends Component {

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

        this.props.directionIsMovingHandler(this.props.directionIndex);
      },

      onPanResponderMove: Animated.event([ //gets invoked when we move the element. Perfect for calculating the next value.
        null, {dx: this.state.position.x, dy: this.state.position.y}
      ]),

      onPanResponderRelease: (e, gestureState) => { //Gets invoked when we release the view.
        const {position, scale} = this.state;
        const {moveX, moveY} = gestureState;

        position.flattenOffset();
        Animated.spring(scale, {toValue: 1, friction: 3}).start();

        // previousPosition = position;

        this.props.changeDirectionPositionHandler(moveX, moveY, this.props.directionIndex);
      }
    });
  }

  componentDidMount() {
    console.log(this.props);
  }

  toggleLeft() {
    const {settings} = this.state;

    settings.directions.left = !settings.directions.left;

    this.setState({settings});
  }

  toggleRight() {
    const {settings} = this.state;

    settings.directions.right = !settings.directions.right;

    this.setState({settings});
  }

  toggleForward() {
    const {settings} = this.state;

    settings.directions.forward = !settings.directions.forward;

    this.setState({settings});
  }

  toggleBackward() {
    const {settings} = this.state;

    settings.directions.backward = !settings.directions.backward;

    this.setState({settings});
  }

  toggleAllDirections() {
    const {settings} = this.state;

    settings.directions.forward = true;
    settings.directions.backward = true;
    settings.directions.left = true;
    settings.directions.right = true;

    this.setState({settings});
  }

  changeInterval(amount) {
    const {settings} = this.state;

    settings.timer += amount;

    if (settings.timer < 0) {
      return;
    }

    this.setState({settings});
  }

  toggleSettings() {
    this.props.setCurrentEditorDirectionIndex(this.props.directionIndex);
  }

  render() {

    const {position, scale} = this.state;
    const [translateX, translateY] = [position.x, position.y];

    return (
      <Animated.View {...this.dragHandler.panHandlers} style={[EditorStyle.directionWrapper, {transform: [{translateX}, {translateY}, {scale}], backgroundColor: this.props.isSelected ? Colors.opacityBlack : `transparent`}]}>
        <TouchableOpacity style={[EditorStyle.directionLink]} onPress={() => this.toggleSettings()}>
          <Animatable.Image ref='direction' animation='bounceIn' easing='ease-out' style={[EditorStyle.directionImage]} source={require(`../assets/png/direction.png`)} />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

Direction.propTypes = {
  setCurrentEditorDirectionIndex: React.PropTypes.func
};

export default Direction;

// resource:  http://mindthecode.com/getting-started-with-the-panresponder-in-react-native/
