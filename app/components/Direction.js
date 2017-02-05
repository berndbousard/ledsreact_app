import React, {Component} from 'react';
import {Animated, PanResponder, TouchableWithoutFeedback, Text, PickerIOS, Image, View, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

import {EditorStyle, TextStyles, Colors} from '../styles';
import {indexOf} from 'lodash';

class Direction extends Component {

  state = {
    position: new Animated.ValueXY(),
    scale: new Animated.Value(1),
    index: this.props.index,
    bounds: this.props.bounds,
    settings: {
      isActive: false,
      currentIndex: 0,
      functions: [`richting`, `kleur`, `timer`],
      timer: 1,
      directions: {
        left: false,
        right: false,
        forward: false,
        backward: false
      },
      colors: [`green`, `red`, `blue`, `yellow`, `orange`]
    }
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

  changeFuncHandler(func) {
    const {settings} = this.state;

    const index = indexOf(settings.functions, func);
    settings.currentIndex = index;

    this.setState({settings});
  }

  toggleFunction() {
    const {settings} = this.state;

    settings.currentIndex++;

    if (settings.currentIndex > settings.functions.length - 1) {
      settings.currentIndex = 0;
    }

    this.setState({settings});
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

  renderFunctionParams() {
    const {settings} = this.state;

    console.log(settings.directions);

    if (settings.currentIndex === 0) {
      // Richting
      return (
        <View>
          <View style={[EditorStyle.directionsParamsWrapper]}>
            <TouchableWithoutFeedback onPress={() => this.toggleForward()}>
              <View style={[{transform: [{rotate: `0deg`}]}, {backgroundColor: settings.directions.forward ? Colors.orange : `transparent`}, {borderRadius: 100}]}>
                <Image style={EditorStyle.timerIcon} source={require(`../assets/png/arrowBlackIcon.png`)} />
              </View>
            </TouchableWithoutFeedback>

            <View style={[EditorStyle.directionsParamsMiddleWrapper]}>
              <TouchableWithoutFeedback onPress={() => this.toggleLeft()}>
                <View style={[{transform: [{rotate: `-90deg`}]}, {backgroundColor: settings.directions.left ? Colors.orange : `transparent`}, {borderRadius: 100}]}>
                  <Image style={[EditorStyle.timerIcon, EditorStyle.directionParamsIcon]} source={require(`../assets/png/arrowBlackIcon.png`)} />
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => this.toggleRight()}>
                <View style={[{transform: [{rotate: `90deg`}]}, {backgroundColor: settings.directions.right ? Colors.orange : `transparent`}, {borderRadius: 100}]}>
                  <Image style={[EditorStyle.timerIcon, EditorStyle.directionParamsIcon]} source={require(`../assets/png/arrowBlackIcon.png`)} />
                </View>
              </TouchableWithoutFeedback>
            </View>

            <TouchableWithoutFeedback onPress={() => this.toggleBackward()}>
              <View style={[{transform: [{rotate: `-180deg`}]}, {backgroundColor: settings.directions.backward ? Colors.orange : `transparent`}, {borderRadius: 100}]}>
                <Image style={EditorStyle.timerIcon} source={require(`../assets/png/arrowBlackIcon.png`)} />
              </View>
            </TouchableWithoutFeedback>
          </View>

          <TouchableWithoutFeedback style={EditorStyle.directionParamsText} onPress={() => this.toggleAllDirections()}>
            <View>
              <Text style={TextStyles.directionFuncSubTitle}>{`Willekeurig`.toUpperCase()}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    }

    if (settings.currentIndex === 1) {
      // Kleur
      return (
        <View>
          <Text style={[TextStyles.directionFuncTitle, EditorStyle.directionPopupFuncTitle]}>{`Kies een kleur`.toUpperCase()}</Text>
          <View style={[EditorStyle.colorParamWrapper]}>
            <TouchableWithoutFeedback>
              <View style={[EditorStyle.colorParamSwatch, {backgroundColor: settings.colors[0]}]}>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
              <View style={[EditorStyle.colorParamSwatch, {backgroundColor: settings.colors[1]}]}>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
              <View style={[EditorStyle.colorParamSwatch, {backgroundColor: settings.colors[2]}]}>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
              <View style={[EditorStyle.colorParamSwatch, {backgroundColor: settings.colors[3]}]}>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
              <View style={[EditorStyle.colorParamSwatch, {backgroundColor: settings.colors[4]}]}>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      );
    }

    if (settings.currentIndex === 2) {
      // Timer
      return (
        <View>
          <Text style={[TextStyles.directionFuncTitle, EditorStyle.directionPopupFuncTitle]}>{`interval`.toUpperCase()}</Text>
          <View style={[EditorStyle.timerIconsWrapper]}>
            <TouchableWithoutFeedback onPress={() => this.changeInterval(1)}>
              <Image style={[EditorStyle.timerIcon]} source={require(`../assets/png/plusIconSmallBlack.png`)} />
            </TouchableWithoutFeedback>

            <Text style={[TextStyles.directionFuncSubTitle]}>{`${settings.timer}s`.toUpperCase()}</Text>

            <TouchableWithoutFeedback  onPress={() => this.changeInterval(- 1)}>
              <Image style={[EditorStyle.timerIcon]} source={require(`../assets/png/minusIconSmallBlack.png`)} />
            </TouchableWithoutFeedback>
          </View>

        </View>
      );
    }
  }

  changeInterval(amount) {
    const {settings} = this.state;

    settings.timer += amount;

    if (settings.timer < 0) {
      return;
    }

    this.setState({settings});
  }

  renderSettings() {
    const {settings} = this.state;

    if (settings.isActive) {
      return (
        <Animatable.View style={[EditorStyle.directionPopup]} ref='settingsRef' animation='fadeInUp' easing='ease-out-quad' duration={300}>
          {/* <Picker
            onValueChange={value => console.log(value)}>
            <Picker.Item label={settings.functions[0]} value={settings.functions[0]} />
            <Picker.Item label={settings.functions[1]} value={settings.functions[1]} />
            <Picker.Item label={settings.functions[1]} value={settings.functions[1]} />
            <Picker.Item label={settings.functions[1]} value={settings.functions[1]} />
          </Picker> */}
          {/* <PickerIOS selectedValue={settings.functions[settings.currentIndex]} onValueChange={func => this.changeFuncHandler(func)}>
            <PickerIOS.Item value='richting' label='richting'/>
            <PickerIOS.Item value='kleur' label='kleur'/>
            <PickerIOS.Item value='timer' label='timer'/>
          </PickerIOS> */}
          <LinearGradient style={[EditorStyle.directionPopupHeader]} colors={[Colors.orange, Colors.gradientOrange]}>
            <TouchableOpacity style={[{flex: 1}]} onPress={() => this.toggleFunction()}>
              <View style={[{flex: 1}]}>
                <Text style={[TextStyles.directionTitle, EditorStyle.directionPopupHeaderTitle, {backgroundColor: `transparent`}]}>{settings.functions[settings.currentIndex].toUpperCase()}</Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableWithoutFeedback>
              <Image style={[EditorStyle.directionPopupHeaderCloseIcon]} source={require(`../assets/png/closeIconSmallWhite.png`)} />
            </TouchableWithoutFeedback> */}
          </LinearGradient>
          {/* <View style={[EditorStyle.directionPopupFuncWrapper]}>
            <Text style={[EditorStyle.directionPopupFuncTitle, TextStyles.directionFuncTitle]}>{`functie`.toUpperCase()}</Text>
            <TouchableWithoutFeedback style={[EditorStyle.directionPopupFuncToggle]}>
              <View>
                <Text>Toggle</Text>
              </View>
            </TouchableWithoutFeedback>
          </View> */}
          {
            this.renderFunctionParams()
          }
        </Animatable.View>
      );
    }
  }

  toggleSettings() {
    const {settings} = this.state;
    const {settingsRef} = this.refs;

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
