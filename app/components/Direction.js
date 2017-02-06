import React, {Component} from 'react';
import {Animated, PanResponder, TouchableWithoutFeedback, Text, Image, View, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

import {EditorStyle, TextStyles, Colors} from '../styles';

class Direction extends Component {

  state = {
    position: new Animated.ValueXY(),
    scale: new Animated.Value(1),
    index: this.props.directionIndex,
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
      }
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

      onPanResponderRelease: () => { //Gets invoked when we release the view.
        const {position, scale} = this.state;
        // const {moveX, moveY} = gestureState;

        position.flattenOffset();
        Animated.spring(scale, {toValue: 1, friction: 3}).start();

        // previousPosition = position;
      }
    });
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

    if (this.props.function.currentIndex === 0) {
      // Richting
      return (
        <View style={[EditorStyle.directionParamsWrapper]}>
          <View style={[EditorStyle.directionsParamsDirectionWrapper]}>
            <TouchableWithoutFeedback onPress={() => this.toggleForward()}>
              <View style={[{transform: [{rotate: `0deg`}]}, {backgroundColor: settings.directions.forward ? Colors.orange : `transparent`}, {borderRadius: 100}]}>
                <Image style={EditorStyle.timerIcon} source={require(`../assets/png/arrowBlackIcon.png`)} />
              </View>
            </TouchableWithoutFeedback>

            <View style={[EditorStyle.directionsParamsDirectionMiddleWrapper]}>
              <TouchableWithoutFeedback onPress={() => this.toggleLeft()}>
                <View style={[EditorStyle.timerIcon, {transform: [{rotate: `-90deg`}]}, {backgroundColor: settings.directions.left ? Colors.orange : `transparent`}, {borderRadius: 100}]}>
                  <Image style={[EditorStyle.timerIcon]} source={require(`../assets/png/arrowBlackIcon.png`)} />
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => this.toggleRight()}>
                <View style={[EditorStyle.timerIcon, {transform: [{rotate: `90deg`}]}, {backgroundColor: settings.directions.right ? Colors.orange : `transparent`}, {borderRadius: 100}]}>
                  <Image style={[EditorStyle.timerIcon]} source={require(`../assets/png/arrowBlackIcon.png`)} />
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

    if (this.props.function.currentIndex === 1) {
      // Kleur
      return (
        <View style={[EditorStyle.directionsParamsWrapper]}>
          <Text style={[TextStyles.directionFuncTitle, EditorStyle.directionPopupFuncTitle]}>{`Kies een kleur`.toUpperCase()}</Text>
          <View style={[EditorStyle.colorParamWrapper]}>
            {
              this.props.colors.map((c, index) => {
                return (
                  <TouchableWithoutFeedback key={index} onPress={() => this.props.changeDirectionColorHandler(this.props.directionIndex, index)}>
                    <View style={[EditorStyle.colorParamSwatch, {backgroundColor: this.props.colors[index].name}, {opacity: this.props.colors[index].isActive ? 1 : .25}]}>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })
            }
          </View>
        </View>
      );
    }

    if (this.props.function.currentIndex === 2) {
      // Timer
      return (
        <View style={[EditorStyle.directionsParamsWrapper]}>
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
          <LinearGradient style={[EditorStyle.directionPopupHeaderWrapper]} colors={[Colors.orange, Colors.gradientOrange]}>
            <TouchableOpacity style={[EditorStyle.directionPopupHeaderLink]} onPress={() => this.props.changeDirectionFunctionHandler(this.props.directionIndex)}>
              <View style={[{flex: 1}]}>
                <Text style={[TextStyles.directionTitle, EditorStyle.directionPopupHeaderTitle, {backgroundColor: `transparent`}]}>{this.props.function.functionLabels[this.props.function.currentIndex].toUpperCase()}</Text>
                <View style={[EditorStyle.directionPopupPageIndicatorWrapper]}>
                  {
                    this.props.function.functionLabels.map((f, index) => {
                      return (
                        <View key={index} style={[EditorStyle.directionPopupPageIndicator, {opacity: this.props.function.currentIndex === index ? 1 : .25}]}>

                        </View>
                      );
                    })
                  }
                </View>

              </View>
            </TouchableOpacity>
          </LinearGradient>
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
      <Animated.View {...this.dragHandler.panHandlers} style={[EditorStyle.directionWrapper, {transform: [{translateX}, {translateY}, {scale}]}]}>
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
  bounds: React.PropTypes.object,
  directionIndex: React.PropTypes.number,
  function: React.PropTypes.object,
  colors: React.PropTypes.array,
  changeDirectionColorHandler: React.PropTypes.func,
  changeDirectionFunctionHandler: React.PropTypes.func
};

export default Direction;

// resource:  http://mindthecode.com/getting-started-with-the-panresponder-in-react-native/
