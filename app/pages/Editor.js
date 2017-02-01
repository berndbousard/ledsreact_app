import React, {Component} from 'react';
import {View, Text, Animated, PanResponder, Dimensions, Button} from 'react-native';
import {range} from 'lodash';
import {takeSnapshot} from "react-native-view-shot";
import Svg, {Rect} from 'react-native-svg';

import {Direction, Circle} from '../components';
import {GeneralStyle} from '../styles';

const {width: deviceWidth, height: deviceHeight} = Dimensions.get(`window`);

class Editor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      directionAmount: props.directionAmount,
      svgElements: [
        {
          cx: 50,
          cy: 50,
          r: 10
        }
      ]
    };
  }

  componentWillMount() {

    //resource: http://browniefed.com/blog/react-native-animated-api-with-panresponder/

    this.animatedValue = new Animated.ValueXY(); //Achter de schermen interpolatie toepassen.
    this.value = {x: 0, y: 0};

    this.animatedValue.addListener(value => this.value = value);
    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true, //Tell iOS that we are allowing the movement
      onMoveShouldSetPanResponderCapture: () => true, // Same here, tell iOS that we allow dragging
      onPanResponderGrant: () => {
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

  takeScreenshot() {

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

  addSvgElement(e) {
    const {svgElements} = this.state;
    console.log(e.nativeEvent.locationX);
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
        return <Circle key={index} cx={e.cx} cy={e.cy} r={e.r} />;
      })
    );
  }

  render() {

    return (
      <View style={[GeneralStyle.center, {backgroundColor: `coral`}]} ref='artboard'>
        <Text> Editor </Text>
        <Svg width='500' height='500' ref='svg'>
          <Rect x='0' y='0' width='100%' height='100%' fill='white' onPress={e => {this.addSvgElement(e);}} />
            {this.generateSvgElements()}
        </Svg>
        <Animated.View
          style={
          {
            backgroundColor: `black`,
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
          {this.generateDirections()}
          <Button title='take screenshot' onPress={() => this.takeScreenshot()} />
      </View>

    );
  }
}

Editor.propTypes = {
  directionAmount: React.PropTypes.number
};

export default Editor;
