import React, {Component} from 'react';
import {View, Text, Animated, PanResponder, Button} from 'react-native';
import {range} from 'lodash';
import {takeSnapshot} from "react-native-view-shot";
import Svg, {Rect} from 'react-native-svg';

import {Direction, Circle, Path} from '../components';
import {GeneralStyle} from '../styles';

class Editor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      directionAmount: props.directionAmount,
      svgElements: [],
      directionPosition: new Animated.ValueXY(),
      directionScale: new Animated.Value(1),
      brushColor: `black`,
      userDrawingFeedback: []
    };
  }

  componentWillMount() {
    // resource:  http://mindthecode.com/getting-started-with-the-panresponder-in-react-native/

    this.dragHandler = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true, //Allow movement to the view we'll attach this panresponder to
      onMoveShouldSetPanResponderCapture: () => true, //Same as above but for dragging

      onPanResponderGrant: () => { //gets invoked when we got access to the movement of the element. Perfect for initial values.
        const {directionPosition, directionScale} = this.state;
        directionPosition.setOffset({x: directionPosition.x._value, y: directionPosition.y._value}); //To prevent resetting to initial value.
        directionPosition.setValue({x: 0, y: 0});
        Animated.spring(directionScale, {toValue: 1.25, friction: 3}).start();
      },

      onPanResponderMove: Animated.event([ //gets invoked when we move the element. Perfect for caculating the next value.
        null, {dx: this.state.directionPosition.x, dy: this.state.directionPosition.y}
      ]),

      onPanResponderRelease: () => { //Gets invoked when we release the view.
        const {directionPosition, directionScale} = this.state;
        directionPosition.flattenOffset();
        Animated.spring(directionScale, {toValue: 1, friction: 3}).start();
      }
    });

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

    const {directionPosition, directionScale, brushColor} = this.state;
    const [translateX, translateY] = [directionPosition.x, directionPosition.y];

    return (
      <View style={[GeneralStyle.center, {backgroundColor: `coral`}]} ref='artboard'>
        <Text> Editor </Text>
        <Svg {...this.drawHandler.panHandlers} width='500' height='500' ref='svg'>
          <Rect x='0' y='0' width='100%' height='100%' fill='white' />
          {this.generateUserDrawingFeedback()}
          {this.generateSvgElements()}
        </Svg>
        <Animated.View {...this.dragHandler.panHandlers} style={{backgroundColor: `black`, width: 50, height: 50, borderRadius: 50, transform: [{translateX}, {translateY}, {rotate: `0deg`}, {scale: directionScale}]}}/>
          {this.generateDirections()}
          <Button title='take screenshot' onPress={() => this.screenshotHandler()} />
          <Button title='undo' onPress={() => this.deleteLastActionHandler()} />
          <Button title='erase' onPress={() => this.deleteActionsHandler()} />
          <Button title='changeColor' color={brushColor} onPress={() => this.changeBrushColor()} />

      </View>

    );
  }
}

Editor.propTypes = {
  directionAmount: React.PropTypes.number
};

export default Editor;
