import React, {Component} from 'react';
import {View, Text, Animated, PanResponder, Button, TouchableWithoutFeedback} from 'react-native';
import {range} from 'lodash';
import {takeSnapshot} from "react-native-view-shot";
import {Actions} from "react-native-router-flux";
import Svg, {Rect} from 'react-native-svg';
import {createResponder} from 'react-native-gesture-responder'; //Beter dan PanResponder - https://github.com/ldn0x7dc/react-native-gesture-responder

import {Direction, Circle, Path} from '../components';
import {GeneralStyle} from '../styles';

class Editor extends Component {

  state = {
    directionAmount: this.props.directionAmount,
    svgElements: [],
    editorDirections: [
      {
        position: new Animated.ValueXY(),
        scale: new Animated.Value(1)
      }
    ],
    directionPosition: new Animated.ValueXY(),
    directionScale: new Animated.Value(1),
    brushColor: `black`,
    userDrawingFeedback: []
  };

  componentDidMount() {
    // const {editorDirections} = this.state;
    //
    // for (let i = 0;i < 4;i ++) {
    //   editorDirections.push({
    //     position: new Animated.ValueXY(),
    //     scale: new Animated.Value(1)
    //   });
    // }
    //
    // console.log(editorDirections.length);
  }

  componentWillMount() {
    console.log(this.props);
    // resource:  http://mindthecode.com/getting-started-with-the-panresponder-in-react-native/

    this.dragHandler = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true, //Allow movement to the view we'll attach this panresponder to
      onMoveShouldSetPanResponderCapture: () => true, //Same as above but for dragging

      onPanResponderGrant: (e, gestureState) => { //gets invoked when we got access to the movement of the element. Perfect for initial values.
        console.log(e.target, gestureState);
        const {editorDirections} = this.state;

        editorDirections[0].position.setOffset({x: editorDirections[0].position.x._value, y: editorDirections[0].position.y._value}); //To prevent resetting to initial value.
        editorDirections[0].position.setValue({x: 0, y: 0});
        Animated.spring(editorDirections[0].scale, {toValue: 1.25, friction: 3}).start();
      },

      onPanResponderMove: Animated.event([ //gets invoked when we move the element. Perfect for calculating the next value.
        null, {dx: this.state.editorDirections[0].position.x, dy: this.state.editorDirections[0].position.y}
      ]),

      onPanResponderRelease: () => { //Gets invoked when we release the view.
        const {editorDirections} = this.state;
        editorDirections[0].position.flattenOffset();
        Animated.spring(editorDirections[0].scale, {toValue: 1, friction: 3}).start();
      }
    });

    // this.gestureResponder = createResponder({
    //   onStartShouldSetResponder: (evt, gestureState) => true,
    //   onStartShouldSetResponderCapture: (evt, gestureState) => true,
    //   onMoveShouldSetResponder: (evt, gestureState) => true,
    //   onMoveShouldSetResponderCapture: (evt, gestureState) => true,
    //
    //   onResponderGrant: (evt, gestureState) => {
    //     const {directionPosition, directionScale} = this.state;
    //
    //     console.log(`blaaaa`);
    //
    //     directionPosition.setOffset({x: directionPosition.x._value, y: directionPosition.y._value}); //To prevent resetting to initial value.
    //     directionPosition.setValue({x: 0, y: 0});
    //     Animated.spring(directionScale, {toValue: 1.25, friction: 3}).start();
    //   },
    //
    //   onResponderMove: (evt, gestureState) => {
    //     console.log(`move`);
    //   },
    //
    //   onResponderTerminationRequest: (evt, gestureState) => true,
    //
    //   onResponderRelease: (evt, gestureState) => {
    //     const {directionPosition, directionScale} = this.state;
    //     directionPosition.flattenOffset();
    //     Animated.spring(directionScale, {toValue: 1, friction: 3}).start();
    //   },
    //
    //   onResponderTerminate: (evt, gestureState) => {
    //     console.log(`terminate`);
    //   },
    //
    //   onResponderSingleTapConfirmed: (evt, gestureState) => {
    //     console.log(`tap`);
    //   },
    //
    //   moveThreshold: 2,
    //   debug: false
    // });

    this.drawHandler = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true, //Allow movement to the view we'll attach this panresponder to
      onMoveShouldSetPanResponderCapture: () => true, //Same as above but for dragging

      onPanResponderGrant: () => { //gets invoked when we got access to the movement of the element. Perfect for initial values.
        this.points = []; //Werkt als reset
      },

      onPanResponderMove: e => {
        // this.addSvgElement(e);

        // Build array of X & Y data
        this.points.push({x: e.nativeEvent.locationX, y: e.nativeEvent.locationY});
        this.setState({userDrawingFeedback: this.points});
      },

      onPanResponderRelease: () => { //Gets invoked when we release the view.
        console.log(`stop met tekenen`);

        const d = this.generatePathFromObject(this.points);

        const {svgElements, brushColor} = this.state;
        console.log(brushColor);
        svgElements.push({
          d: d,
          stroke: brushColor
        });
        console.log(svgElements);
        this.setState({svgElements});
        this.setState({userDrawingFeedback: []});
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

  screenshotHandler() {

    const artboard = this.refs[`artboard`];

    takeSnapshot(artboard, {
      format: `png`,
      quality: 1,
      result: `file`,
    })
    .then(r => {
      console.log(r);
    })
    .catch(e => {
      console.log(e);
    });
  }

  addSvgCircle(e) {
    const {svgElements} = this.state;
    const {locationX: xPos, locationY: yPos} = e.nativeEvent;


    svgElements.push({
      cx: xPos,
      cy: yPos,
      r: Math.random() * 15
    });

    this.setState({svgElements});
  }

  generateSvgElements() {
    const {svgElements} = this.state;

    return (
      svgElements.map((e, index) => {
        if (e.cx) {
          return <Circle key={index} {...e} />;
        }

        if (e.d) {
          return <Path key={index} {...e}/>;
        }
      })
    );
  }

  generatePathFromObject(object) {
    let d = undefined;

    object.forEach(p => {
      if (d === undefined) {
        d = `M${Math.round(p.x)} ${Math.round(p.y)}`;
      }
      d = `${d} L${Math.round(p.x)} ${Math.round(p.y)}`;
    });

    return d;
  }

  deleteLastActionHandler() {
    const {svgElements} = this.state;

    svgElements.pop();

    this.setState({svgElements});
  }

  deleteActionsHandler() {
    this.setState({svgElements: []});
  }

  generateUserDrawingFeedback() {
    const {userDrawingFeedback, brushColor} = this.state;

    const d = this.generatePathFromObject(userDrawingFeedback);

    return (
      userDrawingFeedback.map((e, index) => {
        return <Path key={index} d={d} stroke={brushColor} />;
      })
    );
  }

  changeBrushColor() {
    let {brushColor} = this.state;

    if (brushColor === `black`) {
      brushColor = `red`;
      this.setState({brushColor});
      return;
    }

    if (brushColor === `red`) {
      brushColor = `black`;
      this.setState({brushColor});
      return;
    }
  }

  render() {

    const {directionPosition, directionScale, brushColor, editorDirections} = this.state;
    const [translateX, translateY] = [editorDirections[0].position.x, editorDirections[0].position.y];

    return (
      <View style={[GeneralStyle.center, {backgroundColor: `coral`}]} ref='artboard'>
        <Text> Editor </Text>
        <Svg {...this.drawHandler.panHandlers} width='500' height='500' ref='svg'>
          <Rect x='0' y='0' width='100%' height='100%' fill='white' />
          {this.generateUserDrawingFeedback()}
          {this.generateSvgElements()}
        </Svg>
          <Animated.View {...this.dragHandler.panHandlers} index='3' style={{backgroundColor: `black`, width: 50, height: 50, borderRadius: 50, transform: [{translateX}, {translateY}, {rotate: `0deg`}, {scale: editorDirections[0].scale}]}}>
            <Button title='test' onPress={() => {console.log(`acties`);}} />
          </Animated.View>

          <Animated.View {...this.dragHandler.panHandlers} index='3' style={{backgroundColor: `black`, width: 50, height: 50, borderRadius: 50, transform: [{translateX}, {translateY}, {rotate: `0deg`}, {scale: editorDirections[0].scale}]}}>
            <Button title='test' onPress={() => {console.log(`acties`);}} />
          </Animated.View>
          {this.generateDirections()}
          <Button title='take screenshot' onPress={() => this.screenshotHandler()} />
          <Button title='undo' onPress={() => this.deleteLastActionHandler()} />
          <Button title='erase' onPress={() => this.deleteActionsHandler()} />
          <Button title='changeColor' color={brushColor} onPress={() => this.changeBrushColor()} />
          <Button title='back' color={brushColor} onPress={() => Actions.pop()} />
      </View>
    );
  }
}

Editor.propTypes = {
  directionAmount: React.PropTypes.number
};

export default Editor;
