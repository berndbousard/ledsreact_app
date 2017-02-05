import React, {Component} from 'react';
import {Animated, PanResponder, TouchableWithoutFeedback, Text, Picker} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {EditorStyle} from '../styles';

class Direction extends Component {

  state = {
    position: new Animated.ValueXY(),
    scale: new Animated.Value(1),
    index: this.props.index,
    bounds: this.props.bounds,
    settings: {
      isActive: false,
      currentIndex: 0,
      functions: [`richting`, `kleur`, `timer`]
    },
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

      onPanResponderRelease: (e, gestureState) => { //Gets invoked when we release the view.
        const {position, scale} = this.state;
        // const {moveX, moveY} = gestureState;

        position.flattenOffset();
        Animated.spring(scale, {toValue: 1, friction: 3}).start();

        // previousPosition = position;
      }
    });
  }

  renderSettings() {
    const {settings} = this.state;

    if (settings.isActive) {
      return (
        <Animatable.View ref='settingsRef' animation='fadeInUp' easing='ease-out-quad' duration={300} style={[{backgroundColor: `pink`, flexDirection: `column`, width: 100, height: 100}]}>
          {/* <Picker
            selectedValue={settings.functions[settings.currentIndex]}
            onValueChange={value => console.log(value)}>
            <Picker.Item label={settings.functions[0]} value={settings.functions[0]} />
            <Picker.Item label={settings.functions[1]} value={settings.functions[1]} />
          </Picker> */}
        </Animatable.View>
      );
    }
  }

  toggleSettings() {
    const {settings} = this.state;
    const {direction, settingsRef} = this.refs;

    settings.isActive = !settings.isActive;

    if (settings.isActive) {
      // direction.transitionTo({marginTop: - 100}, 300, `ease-out-quad`);
    } else {
      // direction.transitionTo({marginTop: 0}, 300, `ease-out-quad`);
      settingsRef.transitionTo({transform: [{translateY: 25}], opacity: 0}, 200, `ease-in-quad`);
      setTimeout(() => {
        this.setState({settings});
      }, 200);
      return;
    }

    this.setState({settings});

  }

  render() {

    const {position, scale} = this.state;
    const [translateX, translateY] = [position.x, position.y];

    return (
      <Animated.View {...this.dragHandler.panHandlers} style={[EditorStyle.directionWrapper, {transform: [{translateX}, {translateY}, {rotate: `0deg`}, {scale: scale}]}]}>
        <TouchableWithoutFeedback style={[EditorStyle.directionLink]} onPress={() => this.toggleSettings()}>
          <Animatable.Image ref='direction' animation='bounceIn' easing='ease-out' style={[EditorStyle.directionImage]} source={require(`../assets/png/direction.png`)} />
        </TouchableWithoutFeedback>
        {
          this.renderSettings()
        }
      </Animated.View>
    );
  }
}

Direction.propTypes = {
  selected: React.PropTypes.bool,
  title: React.PropTypes.string,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  index: React.PropTypes.number,
  bounds: React.PropTypes.object
};

export default Direction;

// resource:  http://mindthecode.com/getting-started-with-the-panresponder-in-react-native/
