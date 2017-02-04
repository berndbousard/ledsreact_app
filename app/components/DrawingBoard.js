import React, {Component} from 'react';
import {View, StyleSheet, Animated, PanResponder} from 'react-native';
import Svg, {Rect} from 'react-native-svg';

import {ComponentStyle, Dimensions} from '../styles';
import {Circle, Path} from '../components';

class DrawingBoard extends Component {

  state = {
    svgElements: [],
    brushColor: `black`,
    userDrawingFeedback: []
  }

  componentWillMount() {
    console.log(this.props);

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

  render() {
    return (
      <Svg style={[{zIndex: 0}]} {...this.drawHandler.panHandlers} width={Dimensions.width} height={Dimensions.height} ref='svg'>
        <Rect x='0' y='0' width='100%' height='100%' fill='pink' />
        {this.generateUserDrawingFeedback()}
        {this.generateSvgElements()}
      </Svg>
    );
  }
}

DrawingBoard.propTypes = {
  selected: React.PropTypes.bool,
  title: React.PropTypes.string,
  width: React.PropTypes.number,
  height: React.PropTypes.number
};

export default DrawingBoard;
